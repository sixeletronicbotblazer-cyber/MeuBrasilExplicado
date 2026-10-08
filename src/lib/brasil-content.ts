// Fonte única da copy. "Cartilha Brasil Explicado" é o produto principal.
// Sem prometer imunidade a fake news, impossibilidade de mudanças, garantia
// de benefícios ou atualização automática do conteúdo.

export type FlipbookPage = {
  src: string;
  alt: string;
  pdf_page: number;
};

export type Destaque = {
  src: string;
  alt: string;
  title: string;
  pdf_page: number;
  hypothetical: boolean;
};

export type KitItem = {
  title: string;
  text: string;
  image: string;
  selo?: string;
  caption?: string;
};

export const content = {
  name: "Brasil Explicado",
  subtitle:
    "Cartilha + 2 bônus + aplicativo de consulta para entender quem decide e conferir antes de compartilhar.",
  cta: "Quero meu kit Brasil Explicado",
  hero: {
    before: "Não caia em ",
    emphasis: "fake news",
    after: " sobre o governo e as mudanças no Brasil.",
    subtitle:
      "Entenda quem decide, confira o que realmente mudou e ajude quem está ao seu redor. Aprenda com 24 flashcards visuais e consulte por assunto no aplicativo.",
    support: "Cartilha + 2 bônus + aplicativo de consulta.",
    bullets: [
      "Identifique quem tem poder para fazer a mudança.",
      "Diferencie uma promessa de uma regra em vigor.",
      "Encontre o caminho até a fonte original.",
    ],
  },
  pain: {
    title: "Receber uma mensagem não deveria virar uma confusão.",
    lead: "Um vídeo, um print, uma afirmação no grupo. Antes de repassar, falta entender o que está por trás.",
    messages: [
      "Vão acabar com esse benefício.",
      "Esse imposto aumenta amanhã.",
      "O STF proibiu isso.",
    ],
    bridge:
      "A cartilha parte dessas dúvidas para mostrar o que conferir: quem decide, qual documento existe e em que etapa a mudança está.",
  },
  flipbook: {
    title: "Veja como é por dentro.",
    lead: "Pergunta direta, explicação visual e orientação sobre onde conferir.",
    hint: "Clique ou deslize para ver algumas páginas reais da cartilha.",
    sample: "Amostra de 9 páginas da cartilha de 29 páginas.",
    pages: [
      { src: "/assets/internas/pagina-01.webp", alt: "Capa do Brasil Explicado", pdf_page: 1 },
      { src: "/assets/internas/pagina-03.webp", alt: "Introdução: entenda antes de acreditar", pdf_page: 3 },
      { src: "/assets/internas/pagina-04.webp", alt: "Como consultar: cinco passos de verificação", pdf_page: 4 },
      { src: "/assets/internas/pagina-07.webp", alt: "Decreto e medida provisória: poderes e limites", pdf_page: 7 },
      { src: "/assets/internas/pagina-09.webp", alt: "Câmara, Senado e como um projeto vira lei", pdf_page: 9 },
      { src: "/assets/internas/pagina-13.webp", alt: "Decisão individual e separação de poderes", pdf_page: 13 },
      { src: "/assets/internas/pagina-15.webp", alt: "Programas e regras de benefícios", pdf_page: 15 },
      { src: "/assets/internas/pagina-21.webp", alt: "Fala em vídeo e projeto apresentado", pdf_page: 21 },
      { src: "/assets/internas/pagina-23.webp", alt: "Checklist antes de compartilhar", pdf_page: 23 },
    ] as FlipbookPage[],
  },
  destaques: {
    title: "Veja o método em situações do dia a dia",
    items: [
      {
        src: "/assets/internas/pagina-18.webp",
        alt: "Quem pode criar um imposto?",
        title: "Quem pode criar um imposto?",
        pdf_page: 18,
        hypothetical: false,
      },
      {
        src: "/assets/internas/pagina-24.webp",
        alt: "Disseram que o benefício vai acabar",
        title: "Disseram que o benefício vai acabar",
        pdf_page: 24,
        hypothetical: true,
      },
      {
        src: "/assets/internas/pagina-26.webp",
        alt: "Disseram que o STF proibiu isso",
        title: "Disseram que o STF proibiu isso",
        pdf_page: 26,
        hypothetical: true,
      },
    ] as Destaque[],
  },
  mechanism: {
    title: "Uma dúvida. Um flashcard. Um caminho para conferir.",
    lead: "Quatro passos curtos para sair do susto e chegar à fonte.",
    steps: [
      { icon: "Search", title: "Reconheça a dúvida", text: "Encontre a pergunta que apareceu na mensagem." },
      { icon: "BookOpen", title: "Leia a resposta", text: "Entenda o ponto principal e suas condições." },
      { icon: "Landmark", title: "Identifique quem decide", text: "Veja quais instituições participam." },
      { icon: "FileCheck2", title: "Confira a fonte", text: "Verifique documento, contexto, data e situação atual." },
    ],
    close: "O objetivo é compreender a informação antes de passar adiante.",
  },
  audience: {
    title: "Para quem quer entender antes de acreditar.",
    phrase: "Mais clareza para as conversas em família, na escola e entre amigos.",
    items: [
      ["Recebe mensagens sobre o governo", "Aprenda a observar vídeos, prints e alegações que circulam nas redes."],
      ["Quer ajudar familiares e amigos", "Use perguntas objetivas para orientar uma checagem sem depender de opiniões."],
      ["Tem dúvidas sobre as instituições", "Conheça as funções da Presidência, do Congresso e do STF em situações reconhecíveis."],
    ],
  },
  receive: {
    title: "Do poder de cada instituição à mudança que afeta o seu dia.",
    lead: "Seis temas para consultar por assunto. Cada um reúne quatro flashcards.",
  },
  topics: [
    { icon: "Landmark", title: "Presidência", text: "O que decide diretamente e o que depende de outras instituições." },
    { icon: "Users", title: "Congresso", text: "Como propostas são analisadas e podem virar leis." },
    { icon: "Scale", title: "STF", text: "O alcance de decisões individuais e de julgamentos colegiados." },
    { icon: "ShieldCheck", title: "Benefícios e serviços", text: "Como conferir regras, mudanças e responsabilidades." },
    { icon: "Wallet", title: "Impostos e orçamento", text: "Quem pode mudar cobranças e como acompanhar gastos." },
    { icon: "FileCheck2", title: "Da fala à mudança real", text: "Diferencie declaração, proposta, norma e regra em vigor." },
  ],
  kit: {
    title: "Aprenda na cartilha. Confira com os bônus. Consulte no app.",
    lead: "Um kit para entender uma mensagem antes de acreditar ou compartilhar.",
    items: [
      {
        title: "Cartilha Brasil Explicado",
        text: "24 flashcards em 6 temas, checklist de consulta, exemplos práticos e referências para conferir as informações.",
        image: "mockup-acessos.webp",
      },
      {
        title: "Bônus 1 — Quem Decide? Mapa Rápido dos Poderes",
        text: "Um mapa visual de 2–3 páginas com as atribuições do presidente, Congresso, STF, governadores e prefeitos. Consulte quando surgir a dúvida: “Quem pode fazer isso?”.",
        image: "bonus-1-quem-decide.webp",
        selo: "Bônus incluído",
      },
      {
        title: "Bônus 2 — Confira Antes de Compartilhar",
        text: "Checklist de verificação, atalhos para fontes oficiais e perguntas para pedir a origem de uma informação. Exemplo: “Você tem o documento completo e a data dessa mudança?”.",
        image: "bonus-2-confira.webp",
        selo: "Bônus incluído",
      },
      {
        title: "App — Brasil Explicado",
        text: "Os 24 cards organizados por assunto, com busca, favoritos e acesso às fontes. Aprenda pela cartilha e consulte pelo aplicativo.",
        image: "app-brasil-explicado.webp",
        selo: "Incluído no kit",
        caption: "Representação ilustrativa do aplicativo",
      },
    ] as KitItem[],
  },
  offer: {
    title: "O kit completo. Uma única oferta.",
    lead: "Tudo abaixo está incluído no mesmo preço único.",
    stack: [
      ["Para aprender", "Cartilha Brasil Explicado."],
      ["Para identificar quem decide", "Mapa Rápido dos Poderes."],
      ["Para verificar antes de compartilhar", "kit de checagem."],
      ["Para consultar por assunto", "aplicativo Brasil Explicado."],
    ] as [string, string][],
    // Sem lista de itens repetida: o kit já mostra os entregáveis.
    priceLead: "Tudo incluído por",
  },
  faqTitle: "Antes de escolher, tire suas dúvidas.",
  faq: [
    ["Preciso entender de política ou Direito?", "Não. A cartilha usa perguntas reconhecíveis, respostas curtas e exemplos para orientar sua consulta."],
    ["O que está incluído nos R$ 22,90?", "A Cartilha Brasil Explicado, o Mapa Rápido dos Poderes, o kit Confira Antes de Compartilhar e o aplicativo com 24 cards por assunto. É uma única oferta, sem assinatura."],
    ["O material defende um governo ou partido?", "O foco é explicar competências, limites e procedimentos e indicar onde conferir uma informação."],
    ["Isso significa que uma mudança ou o fim de um benefício é impossível?", "Não. Depender do Congresso não torna uma mudança impossível. É preciso conferir a regra do programa, quem pode alterá-la, o instrumento usado e quando a mudança produz efeitos."],
    ["Preciso continuar conferindo as fontes?", "Sim. Leis, programas e decisões podem mudar. Use as referências para verificar a data, o alcance e a situação atual."],
  ] as [string, string][],
  closing: {
    title: "Não caia em fake news sobre o governo e as mudanças no Brasil.",
    text: "Entenda quem decide, confira o documento e ajude a informação correta a chegar a quem está ao seu redor.",
  },
  footer:
    "Material educativo de consulta. Não substitui a conferência das fontes oficiais atualizadas.",
};

export const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
