// Fonte única da copy. Quantidades correspondem ao conteúdo fornecido no briefing.
// As páginas reais da prévia vêm de public/assets/internas/ (pacote Brasil-Explicado-Flipbook).

export type FlipbookPage = {
  src: string; // caminho relativo a /public
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

export const content = {
  name: "Brasil Explicado",
  subtitle:
    "Quem decide, o que pode mudar e como conferir uma informação antes de acreditar.",
  cta: "Quero meu Brasil Explicado",
  hero: {
    before: "Não caia em ",
    emphasis: "fake news",
    after: " sobre o governo e as mudanças no Brasil.",
    subtitle:
      "Com 24 flashcards visuais e respostas curtas, entenda quem decide, confira o que realmente mudou e ajude quem está ao seu redor a checar mensagens antes de compartilhar.",
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
      "O Brasil Explicado parte dessas dúvidas para mostrar o que conferir: quem decide, qual documento existe e em que etapa a mudança está.",
  },
  flipbook: {
    title: "Veja como é por dentro.",
    lead: "Pergunta direta, explicação visual e orientação sobre onde conferir.",
    hint: "Clique ou deslize para ver algumas páginas reais da cartilha.",
    sample: "Amostra de 9 páginas da cartilha de 29 páginas.",
    // Páginas reais, na ordem exigida pelo comando (manifest.json, lista "flipbook").
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
    // manifest.json, lista "destaques".
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
    lead: "Cada flashcard reúne pergunta, resposta, exemplo e o detalhe que pode mudar a interpretação.",
    steps: [
      { icon: "BookOpen", title: "Encontre a sua dúvida", text: "Consulte o assunto que apareceu na mensagem ou na notícia." },
      { icon: "Landmark", title: "Veja quem decide", text: "Entenda quais instituições têm competência para agir naquele caso." },
      { icon: "ShieldCheck", title: "Observe os limites", text: "Leia as condições e exceções antes de tirar uma conclusão." },
      { icon: "Search", title: "Confira na origem", text: "Use a referência indicada para procurar o documento e sua situação atual." },
    ],
    close: "O objetivo é compreender a informação e saber o que verificar antes de passar adiante.",
  },
  pitch: {
    title: "Você também pode ajudar a conversa no grupo a sair do boato.",
    text: "Quando uma mensagem assusta alguém da família, você pode ajudar a procurar a fonte e entender o que ela realmente diz.",
    question: "Quem tem poder para fazer essa mudança e qual caminho precisa seguir?",
    note: "Depender do Congresso não torna uma mudança impossível. O guia explica os poderes, os limites e os procedimentos.",
  },
  audience: {
    title: "Para quem quer entender antes de acreditar.",
    items: [
      ["Recebe mensagens sobre o governo", "Aprenda o que observar em vídeos, prints e alegações que circulam nas redes."],
      ["Quer ajudar familiares e amigos", "Use perguntas objetivas para orientar uma checagem sem depender apenas de opiniões."],
      ["Tem dúvidas sobre as instituições", "Conheça as funções da Presidência, do Congresso e do STF a partir de situações reconhecíveis."],
    ],
  },
  receive: {
    title: "Do poder de cada instituição à mudança que afeta o seu dia.",
    lead: "Seis seções para consultar por assunto. Cada uma reúne quatro flashcards.",
  },
  topics: [
    { icon: "Landmark", title: "Presidência: poder e limites", text: "O que pode decidir, o que depende do Congresso, decretos e medidas provisórias." },
    { icon: "Users", title: "Congresso: onde as propostas viram leis", text: "Câmara e Senado, projetos, votação, veto e mudanças na Constituição." },
    { icon: "Scale", title: "STF: o que a Justiça pode decidir", text: "Controle de leis, decisões individuais, liminares e julgamentos do colegiado." },
    { icon: "ShieldCheck", title: "Benefícios e serviços públicos", text: "Mudanças de regras e responsabilidades na saúde, na educação e na segurança." },
    { icon: "Wallet", title: "Impostos e orçamento", text: "Quem pode cobrar, quando uma mudança vale e como acompanhar o uso do dinheiro." },
    { icon: "FileCheck2", title: "Da declaração à mudança real", text: "Fala, promessa, proposta, norma publicada e regra em vigor. Data, contexto e origem." },
  ],
  // Bônus futuros só entram quando tiverem nome e conteúdo definidos.
  bonuses: [] as { title: string; description: string; image?: string }[],
  offer: {
    title: "Um ebook. A consulta inteira. Uma única oferta.",
    lead: "Os recursos abaixo fazem parte do Brasil Explicado e estão incluídos no mesmo preço.",
    stack: [
      ["Entenda quem decide", "Seis seções sobre poderes, benefícios, impostos e mudanças nas regras."],
      ["Consulte a dúvida que apareceu", "24 flashcards com resposta, exemplo, atenção ao detalhe e onde conferir."],
      ["Investigue antes de compartilhar", "Checklist para organizar as perguntas que uma alegação exige."],
      ["Veja como aplicar a consulta", "Três exemplos práticos e referências para buscar as fontes oficiais."],
    ] as [string, string][],
    items: [
      "As seis seções do Brasil Explicado",
      "24 flashcards para consultar por dúvida",
      "Checklist para investigar uma alegação",
      "Três exemplos práticos de checagem",
      "Fontes e orientação para conferir a situação atual",
    ],
  },
  faqTitle: "Antes de escolher, tire suas dúvidas.",
  faq: [
    ["Preciso entender de política ou de Direito?", "O material começa pelas dúvidas do dia a dia. As respostas são curtas, acompanhadas de exemplos e dos detalhes necessários para interpretar cada caso."],
    ["É um ebook ou um curso?", "É um ebook de consulta, organizado em seis seções e 24 flashcards. Também inclui checklist, três exemplos práticos e referências de consulta."],
    ["O guia defende algum governo ou partido?", "A proposta é explicar competências, limites e procedimentos. A checagem parte da fonte e da situação do documento, independentemente de quem fez a declaração."],
    ["Ele diz que um benefício nunca pode acabar?", "Não. É necessário conferir a lei do programa, o instrumento usado e as competências envolvidas. Depender do Congresso não significa que uma mudança seja impossível."],
    ["O ebook substitui a consulta à fonte atual?", "Não. Leis, programas e decisões podem mudar. O material ensina o caminho da consulta; confira a fonte original e sua situação atual antes de concluir."],
    ["São vários planos ou uma assinatura?", "A oferta é única: Brasil Explicado por R$22,90, em pagamento único. Não há outros planos nesta página."],
    ["O aplicativo e a comunidade estão incluídos?", "A oferta apresentada aqui é o ebook. Aplicativo e comunidade são possibilidades futuras e não são apresentados como recursos disponíveis nesta compra."],
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
