"use client";

import { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";

const STORAGE_KEY = "be_offer_deadline_v1";
const DURATION_MS = 15 * 60 * 1000; // 15 minutos
const STALE_MS = 6 * 60 * 60 * 1000; // recomeça se passou de 6h da data original

function getDeadline(): number {
  if (typeof window === "undefined") return Date.now() + DURATION_MS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const base = parseInt(raw, 10);
      if (!Number.isNaN(base)) {
        // Recomeça se a data original é muito antiga (visitante regressou horas depois).
        if (base < Date.now() - STALE_MS) {
          const fresh = Date.now() + DURATION_MS;
          localStorage.setItem(STORAGE_KEY, String(fresh));
          return fresh;
        }
        return base;
      }
    }
  } catch {
    /* localStorage indisponível — usa estado em memória. */
  }
  const fresh = Date.now() + DURATION_MS;
  try {
    localStorage.setItem(STORAGE_KEY, String(fresh));
  } catch {
    /* noop */
  }
  return fresh;
}

function format(ms: number) {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ScarcityTimer() {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setDeadline(getDeadline());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (deadline === null) {
    // placeholder estável para evitar hydration mismatch
    return (
      <section className="scarcity" aria-hidden="true">
        <div className="container scarcity__inner">
          <span className="scarcity__timer">--:--</span>
        </div>
      </section>
    );
  }

  const remaining = deadline - now;
  const expired = remaining <= 0;

  return (
    <section className="scarcity" id="oferta-timer">
      <div className="container scarcity__inner">
        <span className="scarcity__icon" aria-hidden="true">
          {expired ? <Flame size={20} /> : <Clock size={20} />}
        </span>
        <span className="scarcity__label">
          {expired
            ? "Últimos instantes — garanta enquanto a oferta está no ar"
            : "Oferta por tempo limitado — o preço de R$ 22,90 sobe quando o cronômetro zerar"}
        </span>
        <span
          className="scarcity__timer"
          role="timer"
          aria-live="off"
          aria-label={
            expired ? "Tempo encerrado" : `Tempo restante: ${format(remaining)}`
          }
        >
          {format(remaining)}
        </span>
      </div>
    </section>
  );
}
