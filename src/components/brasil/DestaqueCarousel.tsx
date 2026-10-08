"use client";

import * as React from "react";
import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { content, type Destaque } from "@/lib/brasil-content";
import { Mascot } from "./primitives";

const ITEMS: Destaque[] = content.destaques.items;
const N = ITEMS.length;
/** Velocidade inicial do carrossel, em px por segundo (configurável). */
const SPEED_PX_PER_S = 18;
const DRAG_THRESHOLD = 6;

export function DestaqueCarousel() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLCollectionOf<Element> | null>(null);

  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const strideRef = useRef(0);

  const playingRef = useRef(true);
  const [playing, setPlaying] = React.useState(true);

  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const draggingRef = useRef(false);
  const modalOpenRef = useRef(false);
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);
  const dragMovedRef = useRef(false);

  const tweenRef = useRef({ active: false, target: 0 });
  const dragStartRef = useRef({ x: 0, offset: 0 });
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef(0);

  const [modalIndex, setModalIndex] = React.useState<number | null>(null);
  const selected = modalIndex !== null ? ITEMS[modalIndex] : null;

  // Mede stride (largura do card + gap) e setWidth (um conjunto de N cards).
  const measure = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    cardsRef.current = null;
    if (cards.length < 2) return;
    const r0 = cards[0].getBoundingClientRect();
    const r1 = cards[1].getBoundingClientRect();
    const stride = r1.left - r0.left;
    if (stride > 0) {
      strideRef.current = stride;
      setWidthRef.current = stride * N;
    }
  }, []);

  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (trackRef.current) ro.observe(trackRef.current);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = reducedMq.matches;
    if (reducedMq.matches) {
      playingRef.current = false;
      setPlaying(false);
    }
    const onReduced = () => {
      reducedRef.current = reducedMq.matches;
      if (reducedMq.matches && playingRef.current) {
        playingRef.current = false;
        setPlaying(false);
      }
    };
    reducedMq.addEventListener("change", onReduced);

    // Só anima enquanto a seção estiver visível.
    const visObserver = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.2 }
    );
    const section = trackRef.current?.closest("section");
    if (section) visObserver.observe(section);

    const wrap = () => {
      const sw = setWidthRef.current;
      if (sw <= 0) return;
      while (offsetRef.current >= sw) {
        offsetRef.current -= sw;
        if (tweenRef.current.active) tweenRef.current.target -= sw;
      }
      while (offsetRef.current < 0) {
        offsetRef.current += sw;
        if (tweenRef.current.active) tweenRef.current.target += sw;
      }
    };

    const apply = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
    };

    const loop = (t: number) => {
      if (!lastTRef.current) lastTRef.current = t;
      let dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;
      if (dt > 0.1) dt = 0.1; // evita saltos após aba inativa

      const paused =
        !playingRef.current ||
        hoveredRef.current ||
        focusedRef.current ||
        draggingRef.current ||
        modalOpenRef.current ||
        !visibleRef.current ||
        reducedRef.current;

      if (tweenRef.current.active) {
        const target = tweenRef.current.target;
        offsetRef.current += (target - offsetRef.current) * 0.18;
        if (Math.abs(target - offsetRef.current) < 0.6) {
          offsetRef.current = target;
          tweenRef.current.active = false;
        }
      } else if (!paused) {
        offsetRef.current += SPEED_PX_PER_S * dt;
      }
      wrap();
      apply();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      visObserver.disconnect();
      reducedMq.removeEventListener("change", onReduced);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const stride = strideRef.current || 300;
    tweenRef.current.target = offsetRef.current + dir * stride;
    tweenRef.current.active = true;
  };

  const togglePlay = () => {
    const next = !playingRef.current;
    playingRef.current = next;
    setPlaying(next);
  };

  // Ponteiro/arraste (mouse e toque horizontal, sem bloquear rolagem vertical).
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, offset: offsetRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    if (Math.abs(dx) > DRAG_THRESHOLD) dragMovedRef.current = true;
    offsetRef.current = dragStartRef.current.offset + dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    // Encaixa no card mais próximo para alinhamento limpo.
    const stride = strideRef.current || 1;
    tweenRef.current.target =
      Math.round(offsetRef.current / stride) * stride;
    tweenRef.current.active = true;
  };

  const openCard = (i: number) => {
    if (dragMovedRef.current) return; // era arraste, não clique
    modalOpenRef.current = true;
    setModalIndex(i);
  };
  const closeCard = () => {
    setModalIndex(null);
    modalOpenRef.current = false;
  };

  const setHover = (v: boolean) => () => {
    hoveredRef.current = v;
  };
  const setFocus = (v: boolean) => () => {
    focusedRef.current = v;
  };

  return (
    <>
      <div className="destaque-head">
        <Mascot pose="atencao" />
        <h3>{content.destaques.title}</h3>
      </div>

      <div className="dcarousel" role="region" aria-label="Carrossel de páginas da cartilha em situações do dia a dia">
        <button
          type="button"
          className="dcarousel__arrow dcarousel__arrow--prev"
          onClick={() => step(-1)}
          aria-label="Página anterior do carrossel"
        >
          <ChevronLeft />
        </button>

        <div
          className="dcarousel__viewport"
          onMouseEnter={setHover(true)}
          onMouseLeave={setHover(false)}
          onFocus={setFocus(true)}
          onBlur={setFocus(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="dcarousel__track" ref={trackRef}>
            {/* Conjunto A — interativo. */}
            {ITEMS.map((d, i) => (
              <DestaqueCard
                key={`a-${i}`}
                d={d}
                onOpen={() => openCard(i)}
              />
            ))}
            {/* Conjunto B — duplicata para loop contínuo, sem foco. */}
            {ITEMS.map((d, i) => (
              <div
                key={`b-${i}`}
                className="dcarousel__dup"
                aria-hidden="true"
                inert
              >
                <DestaqueCard d={d} inert />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="dcarousel__arrow dcarousel__arrow--next"
          onClick={() => step(1)}
          aria-label="Próxima página do carrossel"
        >
          <ChevronRight />
        </button>

        <button
          type="button"
          className="dcarousel__pause"
          onClick={togglePlay}
          aria-pressed={!playing}
          aria-label={playing ? "Pausar carrossel" : "Retomar carrossel"}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? "Pausar" : "Retomar"}
        </button>
      </div>

      {/* Modal de ampliação (portal + foco contido + Escape + retorno de foco). */}
      <DialogPrimitive.Root
        open={modalIndex !== null}
        onOpenChange={(open) => {
          if (!open) closeCard();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="page-modal" />
          <DialogPrimitive.Content
            className="page-modal__dialog"
            aria-label={selected ? `Página ampliada: ${selected.title}` : undefined}
          >
            <VisuallyHidden asChild>
              <DialogPrimitive.Title>
                {selected ? `Página ampliada: ${selected.title}` : "Página ampliada"}
              </DialogPrimitive.Title>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogPrimitive.Description>
                Visualização ampliada da página da cartilha Brasil Explicado.
                Feche com Esc ou no botão fechar.
              </DialogPrimitive.Description>
            </VisuallyHidden>
            <div className="page-modal__bar">
              <span>
                {selected
                  ? `Página ${selected.pdf_page} — ${selected.title}`
                  : "Página ampliada"}
              </span>
              {selected?.hypothetical && (
                <span className="hyp">Exemplo hipotético</span>
              )}
              <DialogPrimitive.Close
                className="page-modal__close"
                aria-label="Fechar visualização ampliada"
              >
                <X size={20} />
              </DialogPrimitive.Close>
            </div>
            <div className="page-modal__img-wrap">
              {selected && <img src={selected.src} alt={selected.alt} />}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

function DestaqueCard({
  d,
  onOpen,
  inert,
}: {
  d: Destaque;
  onOpen?: () => void;
  inert?: boolean;
}) {
  const badge = String(d.pdf_page).padStart(2, "0");
  if (inert) {
    // Duplicata: div não focável, só visual.
    return (
      <div className="destaque-card destaque-card--inert" data-card>
        <div className="destaque-card__img">
          <img src={d.src} alt="" loading="lazy" />
          <span className="destaque-card__page">p. {badge}</span>
        </div>
        <div className="destaque-card__caption">
          <h4>{d.title}</h4>
          <p>
            {d.hypothetical
              ? "Exemplo hipotético para aplicar o método de checagem."
              : "Um flashcard do guia aplicado a uma dúvida real."}
          </p>
          {d.hypothetical && (
            <span className="destaque-card__hypothetical">Exemplo hipotético</span>
          )}
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="destaque-card"
      data-card
      onClick={onOpen}
      aria-label={`Ampliar página ${d.pdf_page}: ${d.title}${
        d.hypothetical ? " (exemplo hipotético)" : ""
      }`}
    >
      <div className="destaque-card__img">
        <img src={d.src} alt={d.alt} loading="lazy" />
        <span className="destaque-card__page">p. {badge}</span>
      </div>
      <div className="destaque-card__caption">
        <h4>{d.title}</h4>
        <p>
          {d.hypothetical
            ? "Exemplo hipotético para aplicar o método de checagem."
            : "Um flashcard do guia aplicado a uma dúvida real."}
        </p>
        {d.hypothetical && (
          <span className="destaque-card__hypothetical">Exemplo hipotético</span>
        )}
      </div>
    </button>
  );
}
