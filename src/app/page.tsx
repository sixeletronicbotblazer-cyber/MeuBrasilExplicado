"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  FileCheck2,
  ListChecks,
  Search,
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
import { Destaques } from "@/components/brasil/Destaques";

const poseByIndex = ["duvida", "ideia", "atencao", "joia"] as const;
const topicPoses = ["explica", "conversa", "atencao", "acolhe", "duvida", "ideia"] as const;
const audiencePoses = ["atencao", "conversa", "consulta"] as const;

export default function Home() {
  const [purchaseUnavailable, setPurchaseUnavailable] = useState(false);
  const offerItems = [
    ...content.offer.items,
    ...content.bonuses.map((b) => b.title),
  ];
  const valueItems = [
    ...content.offer.stack,
    ...content.bonuses.map((b) => [b.title, b.description] as [string, string]),
  ];

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
                <strong>6</strong> seções temáticas
              </span>
              <span>
                <strong>24</strong> flashcards visuais
              </span>
              <span>
                <strong>3</strong> exemplos práticos
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

        {/* PRÉVIAS — flipbook + páginas soltas em destaque */}
        <section className="section preview" id="previas">
          <div className="container">
            <header className="section-title">
              <Heading pose="consulta">{content.flipbook.title}</Heading>
              <p>{content.flipbook.lead}</p>
            </header>
            <Flipbook />
            <Destaques />
          </div>
        </section>

        {/* MECHANISM */}
        <section className="section mechanism">
          <div className="container">
            <header className="section-title">
              <Heading pose="ideia">{content.mechanism.title}</Heading>
              <p>{content.mechanism.lead}</p>
            </header>
            <div className="mechanism-grid">
              {content.mechanism.steps.map((s, i) => {
                const Icon = icons[s.icon];
                return (
                  <article key={s.title}>
                    <span className="step-number">0{i + 1}</span>
                    <Icon size={26} aria-hidden="true" />
                    <SubHeading pose={poseByIndex[i]}>{s.title}</SubHeading>
                    <p>{s.text}</p>
                  </article>
                );
              })}
            </div>
            <p className="mechanism-close">{content.mechanism.close}</p>
            <CTA />
          </div>
        </section>

        {/* MID PITCH */}
        <section className="section mid-pitch">
          <div className="container pitch-grid">
            <div className="pitch-art">
              <ProductComposition variant="pitch" />
            </div>
            <div className="pitch-copy">
              <Heading pose="conversa">{content.pitch.title}</Heading>
              <p>{content.pitch.text}</p>
              <blockquote>{content.pitch.question}</blockquote>
              <p className="small-copy">{content.pitch.note}</p>
              <CTA />
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
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
            </figure>
            <div className="audience-list">
              {content.audience.items.map(([title, text], i) => (
                <article key={title}>
                  <Check size={22} aria-hidden="true" />
                  <div>
                    <SubHeading pose={audiencePoses[i]}>{title}</SubHeading>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RECEIVE */}
        <section className="section receive">
          <div className="container">
            <header className="section-title">
              <Heading pose="explica">{content.receive.title}</Heading>
              <p>{content.receive.lead}</p>
            </header>
            <div className="topic-list">
              {content.topics.map((t, i) => {
                const Icon = icons[t.icon];
                return (
                  <article key={t.title}>
                    <div className="topic-icon">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <SubHeading pose={topicPoses[i]}>{t.title}</SubHeading>
                      <p>{t.text}</p>
                    </div>
                    <span className="topic-count">4 flashcards</span>
                  </article>
                );
              })}
            </div>
            <div className="extras">
              <div>
                <ListChecks size={25} aria-hidden="true" />
                <SubHeading pose="joia">Checklist de consulta</SubHeading>
                <p>
                  Perguntas para investigar uma alegação antes de acreditar ou
                  compartilhar.
                </p>
              </div>
              <div>
                <FileCheck2 size={25} aria-hidden="true" />
                <SubHeading pose="consulta">Três exemplos práticos</SubHeading>
                <p>
                  Aplique a consulta a mensagens sobre benefício, imposto e
                  decisão do STF.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BONUSES (vazio por padrão) */}
        {content.bonuses.length > 0 && (
          <section className="section bonuses">
            <div className="container">
              <Heading pose="acolhe">Mais recursos para sua consulta.</Heading>
              <div className="bonus-grid">
                {content.bonuses.map((b) => (
                  <article key={b.title}>
                    {b.image && (
                      <img src={b.image} alt={`Capa de ${b.title}`} loading="lazy" />
                    )}
                    <SubHeading pose="ideia">{b.title}</SubHeading>
                    <p>{b.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OFFER */}
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
                <ul>
                  {offerItems.map((t) => (
                    <li key={t}>
                      <Check size={18} aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="price">
                  <span>O ebook por</span>
                  <strong>{money(comercial.price)}</strong>
                  <p>Pagamento único</p>
                </div>
                {comercial.checkoutUrl ? (
                  <CTA href={comercial.checkoutUrl}>{content.cta}</CTA>
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

        {/* FAQ */}
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
