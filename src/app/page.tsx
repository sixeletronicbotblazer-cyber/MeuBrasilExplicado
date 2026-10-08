"use client";

import { useState } from "react";
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
import { content, money } from "@/lib/brasil-content";
import { comercial } from "@/lib/brasil-comercial";
import {
  CTA,
  Heading,
  SubHeading,
  ProductComposition,
  icons,
  asset,
} from "@/components/brasil/primitives";
import { Flipbook } from "@/components/brasil/Flipbook";
import { DestaqueCarousel } from "@/components/brasil/DestaqueCarousel";
import { KitSection } from "@/components/brasil/KitSection";

const topicPoses = ["explica", "conversa", "atencao", "acolhe", "duvida", "ideia"] as const;

export default function Home() {
  const [purchaseUnavailable, setPurchaseUnavailable] = useState(false);
  const valueItems = content.offer.stack;

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <main id="conteudo">
        {/* HERO */}
        <section className="hero">
          <div className="container hero-flow">
            <div className="hero-copy">
              <p className="hero-pill">
                <BookOpen size={16} aria-hidden="true" />
                {content.name}
              </p>
              <p className="hero-support">{content.hero.support}</p>
              <h1>
                {content.hero.before}
                <em>{content.hero.emphasis}</em>
                {content.hero.after}
              </h1>
              <p className="hero-sub">{content.hero.subtitle}</p>
              <CTA href="#previas">Quero conhecer o guia</CTA>
              <ul className="hero-bullets">
                {content.hero.bullets.map((t) => (
                  <li key={t}>
                    <Check size={18} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-media">
              <div className="hero-orbit" aria-hidden="true" />
              <img
                className="hero-character"
                src={asset("personagem-apresenta.webp")}
                width={700}
                height={700}
                alt="Personagem do Brasil Explicado apresentando o guia"
                loading="eager"
              />
              <ProductComposition />
            </div>
            <div className="scope">
              <span>
                <strong>6</strong> temas
              </span>
              <span>
                <strong>24</strong> flashcards
              </span>
              <span>
                <strong>3</strong> exemplos
              </span>
            </div>
          </div>
        </section>

        {/* PAIN */}
        <section className="section pain">
          <div className="container narrow">
            <Heading pose="atencao">{content.pain.title}</Heading>
            <p className="section-lead">{content.pain.lead}</p>
            <div className="message-list">
              {content.pain.messages.map((t, i) => (
                <div className="message" key={t}>
                  <span className="message-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <p>“{t}”</p>
                  <Search size={21} aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className="bridge">{content.pain.bridge}</p>
          </div>
        </section>

        {/* PRÉVIAS — flipbook + carrossel de páginas */}
        <section className="section preview" id="previas">
          <div className="container">
            <header className="section-title">
              <Heading pose="consulta">{content.flipbook.title}</Heading>
              <p>{content.flipbook.lead}</p>
            </header>
            <Flipbook />
            <DestaqueCarousel />
          </div>
        </section>

        {/* MÉTODO — quatro linhas horizontais empilhadas */}
        <section className="section mechanism">
          <div className="container">
            <header className="section-title">
              <Heading pose="ideia">{content.mechanism.title}</Heading>
              <p>{content.mechanism.lead}</p>
            </header>
            <ol className="mechanism-rows">
              {content.mechanism.steps.map((s, i) => {
                const Icon = icons[s.icon];
                return (
                  <li className="mechanism-row" key={s.title}>
                    <span className="mechanism-row__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="mechanism-row__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div className="mechanism-row__body">
                      <SubHeading pose={["duvida", "ideia", "atencao", "joia"][i] as string}>
                        {s.title}
                      </SubHeading>
                      <p>{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mechanism-close">{content.mechanism.close}</p>
            <CTA />
          </div>
        </section>

        {/* AUDIÊNCIA / GRUPO — imagem da família + frase curta */}
        <section className="section audience">
          <div className="container narrow">
            <header className="section-title">
              <Heading pose="acolhe">{content.audience.title}</Heading>
            </header>
            <figure className="community-art">
              <figcaption className="community-theme">
                Deus e família<span aria-hidden="true"> ✦</span>
              </figcaption>
              <img
                src={asset("grupo-familia.webp")}
                width={1536}
                height={1024}
                loading="lazy"
                alt="Grupo ilustrado de familiares e amigos brasileiros unidos: avô com criança nos ombros, professor, dois adolescentes, casal com bebê, avó e cachorrinho."
              />
              <figcaption className="community-phrase">
                {content.audience.phrase}
              </figcaption>
            </figure>
            <div className="audience-list">
              {content.audience.items.map(([title, text], i) => (
                <article key={title}>
                  <Check size={22} aria-hidden="true" />
                  <div>
                    <SubHeading pose={["atencao", "conversa", "consulta"][i] as string}>
                      {title}
                    </SubHeading>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TEMAS — seis linhas compactas (2 colunas desktop / 1 mobile) */}
        <section className="section receive">
          <div className="container">
            <header className="section-title">
              <Heading pose="explica">{content.receive.title}</Heading>
              <p>{content.receive.lead}</p>
            </header>
            <div className="topic-rows">
              {content.topics.map((t, i) => {
                const Icon = icons[t.icon] as LucideIcon;
                return (
                  <article className="topic-row" key={t.title}>
                    <span className="topic-row__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div className="topic-row__body">
                      <SubHeading pose={topicPoses[i]}>{t.title}</SubHeading>
                      <p>{t.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* KIT — um bloco com tudo o que a pessoa recebe */}
        <KitSection />

        {/* OFERTA */}
        <section className="section offer" id="oferta">
          <div className="container">
            <header className="section-title">
              <Heading pose="joia">{content.offer.title}</Heading>
              <p>{content.offer.lead}</p>
            </header>
            <div className="offer-grid">
              <div className="value-stack">
                {valueItems.map(([title, text]) => (
                  <div key={title}>
                    <Check size={19} aria-hidden="true" />
                    <div>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </div>
                    <span className="included">Incluído</span>
                  </div>
                ))}
              </div>
              <article className="price-card">
                <p className="plan-badge">Oferta única</p>
                <ProductComposition variant="offer" />
                <SubHeading pose="consulta">{content.name}</SubHeading>
                <p className="plan-description">{content.subtitle}</p>
                <div className="price">
                  <span>{content.offer.priceLead}</span>
                  <strong>{money(comercial.price)}</strong>
                  <p>Pagamento único</p>
                </div>
                {comercial.checkoutUrl ? (
                  <CTA
                    href={comercial.checkoutUrl}
                    fbEvent="InitiateCheckout"
                  >
                    {content.cta}
                  </CTA>
                ) : (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setPurchaseUnavailable(true)}
                  >
                    {content.cta}
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                )}
                {purchaseUnavailable && (
                  <p role="status" className="purchase-status">
                    As vendas ainda não estão disponíveis. Volte em breve.
                  </p>
                )}
                {comercial.accessText && (
                  <p className="access-text">{comercial.accessText}</p>
                )}
                {comercial.guaranteeText && (
                  <p className="access-text">{comercial.guaranteeText}</p>
                )}
                <p className="price-foot">
                  Um material de consulta para entender antes de compartilhar.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ — cinco perguntas */}
        <section className="section faq">
          <div className="container faq-grid">
            <header className="section-title">
              <Heading pose="duvida">{content.faqTitle}</Heading>
            </header>
            <div className="faq-list">
              {content.faq.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="section closing">
          <div className="container narrow">
            <Heading pose="apresenta">{content.closing.title}</Heading>
            <p>{content.closing.text}</p>
            <CTA />
          </div>
        </section>
      </main>

      {/* FOOTER (sticky no fim da coluna flex do body) */}
      <footer>
        <div className="container footer-inner">
          <strong>{content.name}</strong>
          <p>{content.footer}</p>
          {comercial.contactEmail && (
            <a href={`mailto:${comercial.contactEmail}`}>Contato</a>
          )}
          {comercial.termsUrl && <a href={comercial.termsUrl}>Termos</a>}
          {comercial.privacyUrl && (
            <a href={comercial.privacyUrl}>Privacidade</a>
          )}
        </div>
      </footer>
    </>
  );
}
