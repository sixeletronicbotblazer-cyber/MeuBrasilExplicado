"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { content, type Destaque } from "@/lib/brasil-content";
import { Mascot } from "./primitives";

const destaques = content.destaques;

export function Destaques() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const selected = openIndex !== null ? destaques.items[openIndex] : null;

  return (
    <>
      <div className="destaque-head">
        <Mascot pose="atencao" />
        <h3>{content.destaques.title}</h3>
      </div>

      <div className="destaque-grid">
        {destaques.items.map((d, i) => (
          <button
            key={d.title}
            type="button"
            className="destaque-card"
            aria-label={`Ampliar página ${d.pdf_page}: ${d.title}${
              d.hypothetical ? " (exemplo hipotético)" : ""
            }`}
            onClick={() => setOpenIndex(i)}
          >
            <div className="destaque-card__img">
              <img src={d.src} alt={d.alt} loading="lazy" />
              <span className="destaque-card__page">
                p. {String(d.pdf_page).padStart(2, "0")}
              </span>
            </div>
            <div className="destaque-card__caption">
              <h4>{d.title}</h4>
              <p>
                {d.hypothetical
                  ? "Exemplo hipotético para aplicar o método de checagem."
                  : "Um flashcard do ebook aplicado a uma dúvida real."}
              </p>
              {d.hypothetical && (
                <span className="destaque-card__hypothetical">
                  Exemplo hipotético
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="destaque-cta">
        <a className="btn" href="#oferta">
          Quero o guia completo
        </a>
      </div>

      {/* Modal de ampliação (portal + foco contido + Escape + retorno de foco). */}
      <DialogPrimitive.Root
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="page-modal" />
          <DialogPrimitive.Content
            className="page-modal__dialog"
            aria-label={selected ? `Página ampliada: ${selected.title}` : undefined}
          >
            {/* Título e descrição acessíveis (Radix exige no conteúdo do diálogo). */}
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
              {selected && (
                <img src={selected.src} alt={selected.alt} />
              )}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
