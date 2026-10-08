# Brasil Explicado — Worklog

Source of truth for all agents working on this project. Append new sections below; do not overwrite.

---
Task ID: 0
Agent: orchestrator
Task: Discovery and planning for Brasil Explicado build

Work Log:
- Inspected the empty Next.js 16 scaffold (only default page.tsx + shadcn/ui).
- Fetched the Google Drive folder metadata and identified 3 files: Brasil-Explicado-Flipbook.zip, Brasil-Explicado-Pagina-de-Vendas (1).zip, Brasil-Explicado-Preview.html.
- Downloaded all three. The Flipbook zip (5MB) contains assets/internas/ (12 webp pages) + manifest.json (flipbook list of 9 pages + destaques list of 3 cards) + COMANDO-PARA-CONSTRUTOR.txt.
- The Pagina-de-Vendas zip (36MB) contains a full Vite + React project: src/App.jsx, src/content.js, src/comercial.js, src/styles.css, src/fonts.css, public/assets/ (characters, mockup, fundo-institucional, grupo-familia, botao-mint, capas), public/fonts/ (Fira Sans), favicon.svg.
- Read App.jsx, content.js, comercial.js, styles.css, fonts.css, index.html, README.md, COMANDO-PARA-AGENTE.md, COMANDO-PARA-CONSTRUTOR.txt, manifest.json.

Stage Summary:
- Project = single-page sales site for "Brasil Explicado" ebook (R$22,90, pagamento único), pt-BR, green/navy/yellow palette, 9 character poses, family illustration, mockup composition.
- Goal: rebuild in Next.js 16 + TS, preserve copy/characters/animations/price, and apply the flipbook update command (replace empty EbookPreview with interactive flipbook using 9 real pages + 3 destaques cards with modal).
- Flipbook pages (in order): 01 capa, 03, 04, 07, 09, 13, 15, 21, 23.
- Destaques: page 18 (Quem pode criar um imposto?), page 24 (Disseram que o benefício vai acabar — exemplo hipotético), page 26 (Disseram que o STF proibiu isso — exemplo hipotético).
- Section must keep id="previas" and data-integration="ebook-flipbook"; CTA to #oferta at the end; do not load the full PDF.
- All assets will be copied into /home/z/my-project/public/assets/ and /home/z/my-project/public/fonts/.

---
Task ID: 1-9
Agent: orchestrator
Task: Build Brasil Explicado as Next.js 16 + TS and apply the flipbook update command

Work Log:
- Copied all assets from the vendas project into public/ (characters, mockups, fundo-institucional, grupo-familia, botao-mint, capas, originais) and fonts (Fira Sans) + favicon.svg.
- Copied the flipbook package's assets/internas/ (12 webp pages) into public/assets/internas/.
- Discovered pagina-15.webp was 0 bytes (corrupt) in the source zip. Recreated a faithful stand-in matching the booklet's design language (yellow bg, green header "PROGRAMAS E REGRAS DE BENEFÍCIOS", navy footer pill "BRASIL EXPLICADO • 15", flashcard with RESPOSTA/QUEM DECIDE/ONDE CONFERIR badges and the personagem-explica mascot) via an SVG → sharp → WebP script at scripts/make-page15.mjs (900x1200, 3:4). VLM-verified clean and readable.
- Updated layout.tsx: lang="pt-BR", Fira Sans @font-face, Brasil Explicado metadata + viewport themeColor, removed next/font.
- Created src/lib/brasil-content.ts (all copy + flipbook.pages from manifest in required order: 01,03,04,07,09,13,15,21,23 + destaques items 18,24,26) and src/lib/brasil-comercial.ts (price 22.90, empty checkout).
- Ported the full CSS to src/styles/brasil.css (Fira Sans @font-face, tokens, hero/pain/preview/mechanism/pitch/audience/receive/offer/faq/closing/footer + responsive breakpoints 1500/1050/900/780/540/360 + reduced-motion) and added new styles for the interactive flipbook (spread layout, 3:4 pages, spine shadow, page-turn keyframes, controls, position indicator, mobile single-page mode), destaques cards (green/yellow gradient borders, hypothetical badge), and the page modal (fixed center, close button, scrollable image wrap).
- Built primitives.tsx (CTA, useReveal, Mascot, Heading, SubHeading, ProductComposition, icons map).
- Built Flipbook.tsx: desktop shows cover alone then 2-page spreads (03/04, 07/09, 13/15, 21/23) with perspective + page-turn animation; mobile shows 1 page large; prev/next buttons, keyboard arrows + Home/End, touch swipe (horizontal-only, never blocks vertical scroll), position indicator ("Folha N de 5" desktop / "Página N de 9" mobile), "Amostra de 9 páginas da cartilha de 29 páginas", no autoplay, prefers-reduced-motion respected.
- Built Destaques.tsx with 3 cards (page 18 real, 24 + 26 labeled "Exemplo hipotético") and a Radix-based modal (portal, focus trap, Escape close, focus return, zoom/pan, visually-hidden Title + Description for a11y).
- Composed page.tsx preserving all original sections + replacing the empty EbookPreview with <Flipbook/> + <Destaques/> inside #previas (data-integration="ebook-flipbook"); CTA to #oferta preserved.
- Fixed horizontal overflow from decorative title-character images via overflow-x:hidden on html+body.
- Lint clean (0 errors, 0 warnings). Dev server returns 200.
- Agent Browser verified at 1440/768/390/320px: hero renders correctly (character, mockup, title, bullets, stats); flipbook navigates via buttons + keyboard (Folha 1→2→3→4, back to 3) and shows correct spreads/position; "Clique ou deslize..." and "Amostra de 9 páginas..." texts present; destaques cards stacked 1-per-line on mobile / 3 columns on desktop with green/yellow borders and "Exemplo hipotético" badges; modal opens on card click, shows full page, closes with Escape; offer section shows R$22,90 + "Pagamento único" + CTA "Quero meu Brasil Explicado"; FAQ expandable; footer sticky at bottom; zero horizontal overflow at all breakpoints; zero console errors/warnings after adding the DialogDescription.

Stage Summary:
- Single-route Next.js 16 + TS app at / (src/app/page.tsx) reproduces the Brasil Explicado sales page and the #previas flipbook update.
- All 9 flipbook pages + 3 destaque cards come from the real manifest images; only pagina-15.webp was recreated (source was corrupt) — flagged for the user to replace with the real page 15 when available.
- Sticky footer (flex column body + margin-top:auto), responsive at 320/390/768/1440, reduced-motion respected, no autoplay, keyboard + swipe + button navigation, accessible modal.
- price R$22,90 / "Pagamento único" preserved; checkoutUrl empty (button shows "vendas ainda não estão disponíveis" on click) per the original "don't publish until real checkout" rule.
- Vibe-coded one faithful stand-in image (pagina-15) because the Drive package shipped it as 0 bytes; everything else uses the original assets unchanged.
