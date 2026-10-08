"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, X, ShoppingBag } from "lucide-react";

type Buyer = { name: string; age: number; city: string; uf: string };

/**
 * 20+ variações de compradores. Capitais e cidades próximas,
 * com peso para São Paulo, Nordeste e Centro-Oeste (conforme solicitado).
 * Primeiro nome, idade e cidade — nada além disso.
 */
const BUYERS: Buyer[] = [
  { name: "Ana", age: 34, city: "São Paulo", uf: "SP" },
  { name: "Bruno", age: 41, city: "Campinas", uf: "SP" },
  { name: "Carla", age: 29, city: "Guarulhos", uf: "SP" },
  { name: "Daniel", age: 37, city: "Salvador", uf: "BA" },
  { name: "Fernanda", age: 31, city: "Fortaleza", uf: "CE" },
  { name: "Gabriel", age: 44, city: "Recife", uf: "PE" },
  { name: "Helena", age: 26, city: "Brasília", uf: "DF" },
  { name: "Igor", age: 52, city: "Goiânia", uf: "GO" },
  { name: "Juliana", age: 33, city: "São Paulo", uf: "SP" },
  { name: "Lucas", age: 28, city: "Belo Horizonte", uf: "MG" },
  { name: "Mariana", age: 39, city: "Curitiba", uf: "PR" },
  { name: "Otávio", age: 47, city: "Campo Grande", uf: "MS" },
  { name: "Patrícia", age: 35, city: "Cuiabá", uf: "MT" },
  { name: "Rafael", age: 42, city: "São Paulo", uf: "SP" },
  { name: "Sandra", age: 58, city: "Santos", uf: "SP" },
  { name: "Thiago", age: 24, city: "João Pessoa", uf: "PB" },
  { name: "Vanessa", age: 36, city: "Maceió", uf: "AL" },
  { name: "Wellington", age: 49, city: "Teresina", uf: "PI" },
  { name: "Camila", age: 27, city: "Osasco", uf: "SP" },
  { name: "Rodrigo", age: 45, city: "Taguatinga", uf: "DF" },
  { name: "Beatriz", age: 32, city: "Natal", uf: "RN" },
  { name: "Marcos", age: 38, city: "Sorocaba", uf: "SP" },
  { name: "Larissa", age: 30, city: "Aracaju", uf: "SE" },
];

const FIRST_DELAY_MS = 9000; // deixa o leitor respirar no hero
const VISIBLE_MS = 6000; // cada notificação fica visível 6s
const MIN_GAP_MS = 22000; // intervalo mínimo entre duas notificações
const MAX_EXTRA_GAP_MS = 26000; // aleatório até +26s (gap total 22–48s)
const MAX_SHOWS = BUYERS.length; // mostra cada comprador uma vez

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randMin = () => Math.floor(Math.random() * 6) + 1; // "há 1–6 min"

export function BuyerNotifications() {
  const [queue] = useState<Buyer[]>(() => shuffle(BUYERS));
  const [active, setActive] = useState<Buyer | null>(null);
  const [minsAgo, setMinsAgo] = useState(1);

  const shownRef = useRef(0);
  const cooldownRef = useRef(0);
  const readyRef = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    const showNext = () => {
      if (stoppedRef.current) return;
      const now = Date.now();
      if (now < cooldownRef.current) {
        // ainda no resfriamento — reagenda pra depois do fim do cooldown.
        const wait = cooldownRef.current - now + 250;
        nextTimer.current = setTimeout(showNext, wait);
        return;
      }
      if (shownRef.current >= MAX_SHOWS) {
        stoppedRef.current = true;
        return;
      }
      const buyer = queue[shownRef.current % queue.length];
      shownRef.current += 1;
      setActive(buyer);
      setMinsAgo(randMin());
      cooldownRef.current = now + MIN_GAP_MS;

      // esconde depois de VISIBLE_MS
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setActive(null), VISIBLE_MS);

      // reagenda a próxima tentativa (intervalo intercalado)
      const gap = MIN_GAP_MS + Math.floor(Math.random() * MAX_EXTRA_GAP_MS);
      nextTimer.current = setTimeout(showNext, gap);
    };

    // Gatilho por seção: ao entrar numa seção principal, tenta mostrar
    // (respeita o resfriamento e só depois do primeiro respiro).
    const observer = new IntersectionObserver(
      (entries) => {
        if (stoppedRef.current || !readyRef.current) return;
        const entered = entries.some((e) => e.isIntersecting);
        if (!entered) return;
        const now = Date.now();
        if (now < cooldownRef.current) return;
        // adianta a próxima seção que o leitor atingir
        if (nextTimer.current) {
          clearTimeout(nextTimer.current);
          nextTimer.current = null;
        }
        showNext();
      },
      { threshold: 0.25, rootMargin: "0px 0px -30% 0px" }
    );

    const sections = document.querySelectorAll("main > section");
    sections.forEach((s) => observer.observe(s));

    // Primeira notificação depois de um respiro no hero.
    const first = setTimeout(() => {
      readyRef.current = true;
      showNext();
    }, FIRST_DELAY_MS);

    return () => {
      clearTimeout(first);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (nextTimer.current) clearTimeout(nextTimer.current);
      observer.disconnect();
    };
  }, [queue]);

  const dismiss = () => {
    setActive(null);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  return (
    <div
      className={`buyer-toast ${active ? "is-visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {active && (
        <div className="buyer-toast__card">
          <span className="buyer-toast__icon" aria-hidden="true">
            <ShoppingBag size={18} />
          </span>
          <div className="buyer-toast__body">
            <p className="buyer-toast__title">
              <strong>{active.name}</strong>, {active.age}
            </p>
            <p className="buyer-toast__meta">
              {active.city}/{active.uf} · há {minsAgo} min
            </p>
            <p className="buyer-toast__action">
              <CheckCircle2 size={13} aria-hidden="true" />
              comprou o Brasil Explicado
            </p>
          </div>
          <button
            type="button"
            className="buyer-toast__close"
            onClick={dismiss}
            aria-label="Fechar notificação"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
