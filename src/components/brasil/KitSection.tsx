"use client";

import { Check } from "lucide-react";
import { content, type KitItem } from "@/lib/brasil-content";
import { asset } from "./primitives";

const items = content.kit.items;

export function KitSection() {
  return (
    <section className="section kit" id="kit">
      <div className="container">
        <header className="section-title">
          <h2>{content.kit.title}</h2>
          <p>{content.kit.lead}</p>
        </header>
        <div className="kit-grid">
          {items.map((item) => (
            <KitCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function KitCard({ item }: { item: KitItem }) {
  return (
    <article className="kit-card">
      <div className="kit-card__media">
        <img
          src={asset(item.image)}
          alt={item.title}
          loading="lazy"
          draggable={false}
        />
        {item.selo && (
          <span className="kit-card__selo">
            <Check size={12} aria-hidden="true" />
            {item.selo}
          </span>
        )}
      </div>
      <div className="kit-card__body">
        <h3 className="kit-card__title">{item.title}</h3>
        <p className="kit-card__text">{item.text}</p>
        {item.caption && (
          <p className="kit-card__caption">{item.caption}</p>
        )}
      </div>
    </article>
  );
}
