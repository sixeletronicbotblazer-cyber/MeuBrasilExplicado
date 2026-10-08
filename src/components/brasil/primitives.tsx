"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  FileCheck2,
  Landmark,
  ListChecks,
  Scale,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/lib/brasil-content";

const icons: Record<string, LucideIcon> = {
  Landmark,
  Scale,
  Users,
  Wallet,
  FileCheck2,
  Search,
  BookOpen,
  ListChecks,
  ShieldCheck,
};

export { icons };

export const asset = (name: string) => `/assets/${name}`;

type CTAProps = {
  href?: string;
  children?: React.ReactNode;
  /** Evento do Meta Pixel a disparar no clique (ex.: "InitiateCheckout"). */
  fbEvent?: string;
};

export function CTA({ href = "#oferta", children = content.cta, fbEvent }: CTAProps) {
  return (
    <a
      className="btn"
      href={href}
      onClick={() => {
        if (fbEvent && typeof window !== "undefined") {
          const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void })
            .fbq;
          if (typeof fbq === "function") fbq("track", fbEvent);
        }
      }}
    >
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </a>
  );
}

/** Revela o personagem do título quando a seção entra na viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    node.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -25px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function Mascot({
  className = "",
  pose = "apresenta",
}: {
  className?: string;
  pose?: string;
}) {
  return (
    <img
      className={`title-character ${className}`}
      src={asset(`personagem-${pose}.webp`)}
      width={700}
      height={700}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}

export function Heading({
  children,
  pose,
}: {
  children: React.ReactNode;
  pose?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="title-cluster" ref={ref}>
      <h2>{children}</h2>
      <Mascot pose={pose} />
    </div>
  );
}

export function SubHeading({
  children,
  pose,
}: {
  children: React.ReactNode;
  pose?: string;
}) {
  return (
    <h3 className="subheading">
      <span>{children}</span>
      <Mascot className="character-mini" pose={pose} />
    </h3>
  );
}

/** Mockup gerado a partir da capa: tablet, celular e livro apresentam o mesmo ebook. */
export function ProductComposition({
  variant = "hero",
}: {
  variant?: "hero" | "pitch" | "offer";
}) {
  return (
    <div className={`product-composition product-composition--${variant}`}>
      <img
        width={1536}
        height={1024}
        src={asset("mockup-acessos.webp")}
        alt="Brasil Explicado apresentado em celular, tablet e livro. Produto digital em ebook."
        loading={variant === "hero" ? "eager" : "lazy"}
        {...(variant === "hero" ? { fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}
