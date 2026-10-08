"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content } from "@/lib/brasil-content";

const pages = content.flipbook.pages;

/** Spreads de desktop: capa sozinha + pares internos (03/04, 07/09, 13/15, 21/23). */
const desktopSpreads: (typeof pages)[] = [
  [pages[0]],
  [pages[1], pages[2]],
  [pages[3], pages[4]],
  [pages[5], pages[6]],
  [pages[7], pages[8]],
];

function useIsMobile(breakpoint = 780) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

export function Flipbook() {
  const isMobile = useIsMobile(780);

  // Estado de navegação por dispositivo.
  const [spread, setSpread] = useState(0); // desktop: 0..desktopSpreads.length-1
  const [page, setPage] = useState(0); // mobile: 0..pages.length-1
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const totalSpreads = desktopSpreads.length;
  const totalPages = pages.length;

  const goDesktop = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? "next" : "prev");
      setSpread((s) => Math.max(0, Math.min(totalSpreads - 1, s + delta)));
    },
    [totalSpreads]
  );

  const goMobile = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? "next" : "prev");
      setPage((p) => Math.max(0, Math.min(totalPages - 1, p + delta)));
    },
    [totalPages]
  );

  const next = useCallback(
    () => (isMobile ? goMobile(1) : goDesktop(1)),
    [isMobile, goMobile, goDesktop]
  );
  const prev = useCallback(
    () => (isMobile ? goMobile(-1) : goDesktop(-1)),
    [isMobile, goMobile, goDesktop]
  );

  // Navegação por teclado (setas) quando o palco está focado.
  const stageRef = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      e.preventDefault();
      setDirection("prev");
      if (isMobile) setPage(0);
      else setSpread(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setDirection("next");
      if (isMobile) setPage(totalPages - 1);
      else setSpread(totalSpreads - 1);
    }
  };

  // Gesto de deslizar no celular (horizontal), sem bloquear a rolagem vertical.
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    // Só considera deslize horizontal: eixo X dominante e distância suficiente.
    if (adx > 48 && adx > ady * 1.4) {
      if (dx < 0) next();
      else prev();
    }
    touch.current = null;
  };

  const atStart = isMobile ? page === 0 : spread === 0;
  const atEnd = isMobile
    ? page === totalPages - 1
    : spread === totalSpreads - 1;

  const positionLabel = isMobile
    ? `Página ${page + 1} de ${totalPages}`
    : `Folha ${spread + 1} de ${totalSpreads}`;

  return (
    <div
      className={`flipbook ${isMobile ? "flipbook--mobile" : ""}`}
      data-integration="ebook-flipbook"
    >
      <p className="flipbook-hint">
        <b>{content.flipbook.hint}</b>
      </p>

      <div
        className="flipbook-stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Prévia interativa da cartilha. Use as setas do teclado ou os botões para virar as páginas."
        onKeyDown={onKeyDown}
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
      >
        {isMobile ? (
          <div
            key={page}
            className={`flipbook-spread flipbook-spread--cover ${
              direction === "next" ? "is-animating-next" : "is-animating-prev"
            }`}
          >
            <FlipPage page={pages[page]} eager={page === 0} />
          </div>
        ) : (
          <div
            key={spread}
            className={`flipbook-spread ${
              spread === 0 ? "flipbook-spread--cover" : ""
            } ${direction === "next" ? "is-animating-next" : "is-animating-prev"}`}
          >
            {desktopSpreads[spread].map((p, i) => (
              <FlipPage key={i} page={p} eager={spread === 0 && i === 0} />
            ))}
          </div>
        )}
      </div>

      <div className="flipbook-controls">
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="Página anterior"
        >
          <ChevronLeft />
        </button>
        <span className="flipbook-position" aria-live="polite">
          {positionLabel}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          aria-label="Próxima página"
        >
          <ChevronRight />
        </button>
      </div>

      <p className="flipbook-sample">{content.flipbook.sample}</p>
    </div>
  );
}

function FlipPage({
  page,
  eager = false,
}: {
  page: { src: string; alt: string; pdf_page: number };
  eager?: boolean;
}) {
  return (
    <div className="flipbook-page">
      <img
        src={page.src}
        alt={page.alt}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
      />
      <span className="flipbook-page__badge" aria-hidden="true">
        p. {String(page.pdf_page).padStart(2, "0")}
      </span>
    </div>
  );
}
