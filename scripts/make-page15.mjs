// Recria pagina-15.webp (que veio corrompido/0 bytes no pacote do Drive).
// Segue a linguagem visual da cartilha Brasil Explicado: fundo amarelo,
// faixa verde com título, pílula azul-marinho no rodapé com numeração,
// flashcard com rótulos RESPOSTA / QUEM DECIDE / ONDE CONFERIR e o mascote.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const MASCOT = readFileSync(new URL('../public/assets/personagem-explica.webp', import.meta.url)).toString('base64');
const W = 900, H = 1200;

// Pontos de halftone amarelo para dar textura de quadrinho
let dots = '';
for (let y = 0; y < H; y += 22) {
  for (let x = (y / 22) % 2 ? 11 : 0; x < W; x += 22) {
    dots += `<circle cx="${x}" cy="${y}" r="1.4" fill="#e6b800" opacity="0.18"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="hdr" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#009C3B"/>
      <stop offset="1" stop-color="#007a2e"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFDF5"/>
      <stop offset="1" stop-color="#FBF6E2"/>
    </linearGradient>
    <linearGradient id="badgeResp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dff1ff"/><stop offset="1" stop-color="#bfe2ff"/>
    </linearGradient>
    <linearGradient id="badgeQuem" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d6f5dd"/><stop offset="1" stop-color="#a8e6b6"/>
    </linearGradient>
    <linearGradient id="badgeOnde" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff4b8"/><stop offset="1" stop-color="#ffe16b"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#FFD700"/>
  ${dots}

  <g>
    <rect x="0" y="0" width="${W}" height="150" fill="url(#hdr)"/>
    <polygon points="0,150 60,150 30,185 0,200" fill="#007a2e"/>
    <polygon points="120,150 180,150 150,180 120,200" fill="#006b27"/>
    <polygon points="240,150 300,150 270,178 240,192" fill="#006b27"/>
    <polygon points="360,150 420,150 390,182 360,196" fill="#007a2e"/>
    <polygon points="480,150 540,150 510,176 480,190" fill="#006b27"/>
    <polygon points="600,150 660,150 630,180 600,194" fill="#007a2e"/>
    <polygon points="720,150 780,150 750,178 720,192" fill="#006b27"/>
    <polygon points="840,150 900,150 900,200 840,178" fill="#007a2e"/>
    <text x="${W/2}" y="92" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="62" font-weight="800" fill="#ffffff" letter-spacing="2">PROGRAMAS</text>
    <text x="${W/2}" y="138" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="26" font-weight="700" fill="#FFE600" letter-spacing="4">E REGRAS DE BENEFÍCIOS</text>
  </g>

  <g>
    <rect x="50" y="230" width="800" height="850" rx="28" fill="url(#card)" stroke="#009C3B" stroke-width="6"/>
    <rect x="50" y="230" width="800" height="92" rx="28" fill="#009C3B"/>
    <rect x="50" y="288" width="800" height="34" fill="#009C3B"/>
    <circle cx="108" cy="276" r="42" fill="#FFD700" stroke="#002776" stroke-width="5"/>
    <text x="108" y="291" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="38" font-weight="800" fill="#002776">15</text>
    <text x="172" y="262" font-family="'Fira Sans',Arial,sans-serif" font-size="22" font-weight="700" fill="#ffffff">Programa de benefício pode</text>
    <text x="172" y="296" font-family="'Fira Sans',Arial,sans-serif" font-size="22" font-weight="700" fill="#ffffff">mudar de regra? Como conferir?</text>
  </g>

  <g>
    <rect x="80" y="355" width="200" height="42" rx="21" fill="url(#badgeResp)" stroke="#1f7fc4" stroke-width="2"/>
    <text x="180" y="383" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="20" font-weight="800" fill="#002776">RESPOSTA</text>
    <foreignObject x="80" y="410" width="500" height="190">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Fira Sans',Arial,sans-serif;font-size:21px;line-height:1.5;color:#15243c;text-align:left;">
        Um programa público pode mudar regras de elegibilidade e valores, mas a alteração precisa seguir a lei que criou o benefício — em geral por meio de <strong>lei ordinária</strong> ou <strong>medida provisória</strong>, conforme a competência de cada caso.
      </div>
    </foreignObject>
  </g>

  <g>
    <rect x="80" y="615" width="220" height="42" rx="21" fill="url(#badgeQuem)" stroke="#1f8a4d" stroke-width="2"/>
    <text x="190" y="643" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="20" font-weight="800" fill="#0a4a26">QUEM DECIDE</text>
    <foreignObject x="80" y="670" width="500" height="180">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Fira Sans',Arial,sans-serif;font-size:21px;line-height:1.5;color:#15243c;text-align:left;">
        A mudança costuma nascer no <strong>Poder Executivo</strong> (ministério responsável) e é votada pelo <strong>Congresso</strong>. O <strong>STF</strong> pode suspender regras que firam a Constituição.
      </div>
    </foreignObject>
  </g>

  <g>
    <rect x="80" y="860" width="210" height="42" rx="21" fill="url(#badgeOnde)" stroke="#b8860b" stroke-width="2"/>
    <text x="185" y="888" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="20" font-weight="800" fill="#5a3d00">ONDE CONFERIR</text>
    <foreignObject x="80" y="915" width="500" height="155">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Fira Sans',Arial,sans-serif;font-size:21px;line-height:1.5;color:#15243c;text-align:left;">
        Diário Oficial da União, portal do ministério e a própria lei do programa. Confira a <strong>publicação</strong> e a <strong>vigência</strong> antes de repassar.
      </div>
    </foreignObject>
  </g>

  <image href="data:image/webp;base64,${MASCOT}" x="610" y="430" width="220" height="220" preserveAspectRatio="xMidYMid meet"/>

  <g>
    <rect x="540" y="1118" width="320" height="56" rx="28" fill="#002776"/>
    <text x="700" y="1153" text-anchor="middle" font-family="'Fira Sans',Arial,sans-serif" font-size="20" font-weight="700" fill="#ffffff" letter-spacing="2">BRASIL EXPLICADO • 15</text>
  </g>
</svg>`;

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'assets', 'internas', 'pagina-15.webp');

await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .webp({ quality: 82 })
  .toFile(outPath);

console.log('pagina-15.webp gerada ->', outPath);
