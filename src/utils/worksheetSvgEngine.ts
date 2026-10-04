export interface GeneratedAssetPage {
  pageNumber: number;
  heading: string;
  activityInstruction: string;
  childContent: string;
  illustrationTheme: string;
  visualType?:
    | 'COVER_PAGE'
    | 'TRACING_PATHS'
    | 'SCISSORS_CUTOUT'
    | 'MATH_SUMS'
    | 'EMOTION_WHEEL'
    | 'MAZE_FOREST'
    | 'SHADOW_MATCH'
    | 'LOGIC_SERIES'
    | 'SYMMETRY_DRAW'
    | 'COLOR_BY_NUMBER'
    | 'COUNTING_1_10'
    | 'FLASHCARDS_GRID'
    | 'STORY_ILLUSTRATION'
    | 'LETTER_TRACING_AEIOU'
    | 'CLOCK_ROUTINES'
    | 'DIPLOMA_FINAL'
    | 'DINOSAUR_TRACE'
    | 'BUSYBOOK_VELCRO'
    | 'MATH_SHOP';
  flashcardsData?: {
    cardNumber: number;
    es: string;
    en: string;
    phonetic: string;
    category: string;
    colorHex: string;
    iconType: string;
  }[];
}

// Helper to draw clean child-friendly vector icons inside SVGs
function renderMiniVectorIcon(type: string, cx: number, cy: number, scale: number = 1): string {
  const s = scale;
  switch (type) {
    case 'squirrel':
    case 'lion':
    case 'animal':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <circle cx="0" cy="0" r="22" fill="#FDBA74" stroke="#141414" stroke-width="3"/>
        <circle cx="-14" cy="-16" r="8" fill="#F97316" stroke="#141414" stroke-width="2.5"/>
        <circle cx="14" cy="-16" r="8" fill="#F97316" stroke="#141414" stroke-width="2.5"/>
        <circle cx="-7" cy="-4" r="3" fill="#141414"/>
        <circle cx="7" cy="-4" r="3" fill="#141414"/>
        <ellipse cx="0" cy="4" rx="5" ry="3.5" fill="#7C2D12"/>
        <path d="M -6 10 Q 0 16 6 10" fill="none" stroke="#141414" stroke-width="2.5" stroke-linecap="round"/>
      </g>`;
    case 'acorn':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <path d="M -14 -4 Q 0 -20 14 -4 Z" fill="#78350F" stroke="#141414" stroke-width="2.5"/>
        <path d="M -12 -4 Q -12 18 0 22 Q 12 18 12 -4 Z" fill="#D97706" stroke="#141414" stroke-width="2.5"/>
        <path d="M 0 -16 L 3 -23" stroke="#141414" stroke-width="3" stroke-linecap="round"/>
      </g>`;
    case 'mushroom':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <path d="M -8 2 L -6 22 L 6 22 L 8 2 Z" fill="#FEF3C7" stroke="#141414" stroke-width="2.5"/>
        <path d="M -22 4 Q 0 -24 22 4 Z" fill="#EF4444" stroke="#141414" stroke-width="2.5"/>
        <circle cx="-8" cy="-4" r="3.5" fill="#FFFFFF"/>
        <circle cx="6" cy="-7" r="4" fill="#FFFFFF"/>
        <circle cx="11" cy="0" r="2.5" fill="#FFFFFF"/>
      </g>`;
    case 'pinecone':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <ellipse cx="0" cy="2" rx="14" ry="19" fill="#92400E" stroke="#141414" stroke-width="2.5"/>
        <path d="M -10 -6 Q 0 2 10 -6 M -12 2 Q 0 10 12 2 M -9 10 Q 0 17 9 10" fill="none" stroke="#FEF3C7" stroke-width="2"/>
      </g>`;
    case 'leaf':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <path d="M 0 -20 C 16 -12 18 10 0 20 C -18 10 -16 -12 0 -20 Z" fill="#F59E0B" stroke="#141414" stroke-width="2.5"/>
        <path d="M 0 -18 L 0 22 M 0 -4 L 8 -10 M 0 4 L -9 -2 M 0 10 L 8 4" stroke="#141414" stroke-width="2" stroke-linecap="round"/>
      </g>`;
    case 'star':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <polygon points="0,-20 6,-7 20,-5 10,5 12,19 0,12 -12,19 -10,5 -20,-5 -6,-7" fill="#FACC15" stroke="#141414" stroke-width="2.5" stroke-linejoin="round"/>
      </g>`;
    case 'monster':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <rect x="-24" y="-20" width="48" height="44" rx="18" fill="#38BDF8" stroke="#141414" stroke-width="3"/>
        <path d="M -16 -20 Q -22 -32 -10 -28" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <path d="M 16 -20 Q 22 -32 10 -28" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <circle cx="-9" cy="-4" r="5" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
        <circle cx="9" cy="-4" r="5" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
        <circle cx="-9" cy="-4" r="2" fill="#141414"/>
        <circle cx="9" cy="-4" r="2" fill="#141414"/>
        <path d="M -10 10 Q 0 18 10 10" fill="none" stroke="#141414" stroke-width="3" stroke-linecap="round"/>
      </g>`;
    case 'dino':
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <path d="M -18 16 L -18 -4 Q -18 -20 -4 -20 L 8 -20 Q 16 -20 16 -10 L 8 -10 L 8 0 L 20 16 Z" fill="#4ADE80" stroke="#141414" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="4" cy="-14" r="2.5" fill="#141414"/>
      </g>`;
    default:
      return `<g transform="translate(${cx},${cy}) scale(${s})">
        <circle cx="0" cy="0" r="18" fill="#A7F3D0" stroke="#141414" stroke-width="2.5"/>
        <circle cx="-6" cy="-4" r="2.5" fill="#141414"/>
        <circle cx="6" cy="-4" r="2.5" fill="#141414"/>
        <path d="M -7 6 Q 0 12 7 6" fill="none" stroke="#141414" stroke-width="2.5" stroke-linecap="round"/>
      </g>`;
  }
}

/**
 * Generates a complete, self-contained printable vector SVG graphic for ANY worksheet page!
 * Works 100% offline/autonomously without waiting for external API quotas.
 */
export function renderWorksheetPageSvg(page: GeneratedAssetPage, productTitle: string = ''): string {
  const headingLower = (page.heading + ' ' + page.illustrationTheme + ' ' + productTitle).toLowerCase();

  // 0. COVER PAGE / LÁMINA PRINCIPAL (PÁGINA 0 - PORTADA OFICIAL)
  if (page.pageNumber === 0 || page.visualType === 'COVER_PAGE' || headingLower.includes('portada')) {
    const cleanTitle = (productTitle || page.heading || 'Cuaderno Infantil PaperTopBCN').slice(0, 52);
    const subTitle = (productTitle || page.heading).length > 52 ? (productTitle || page.heading).slice(52, 108) : 'Edición Oficial Ilustrada · Portada + 20 Láminas de Ejercicios';
    return `<svg viewBox="0 0 680 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FEF3C7;border-radius:12px;">
      <!-- Outer & Inner Editorial Cover Borders -->
      <rect x="14" y="14" width="652" height="392" rx="16" fill="#FFFDF9" stroke="#141414" stroke-width="4"/>
      <rect x="26" y="26" width="628" height="368" rx="12" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="10 6"/>

      <!-- Top Brand Ribbon -->
      <rect x="170" y="38" width="340" height="30" rx="15" fill="#141414"/>
      <text x="340" y="58" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#FEF08A">★ PAPERTOPBCN · PORTADA OFICIAL (PÁGINA 0) ★</text>

      <!-- Cover Title & Subtitle -->
      <text x="340" y="102" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#0F172A">${cleanTitle}</text>
      <text x="340" y="126" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#0284C7" font-weight="bold">${subTitle}</text>

      <!-- Central Hero Medallion with Characters & Icons -->
      <rect x="75" y="142" width="530" height="172" rx="18" fill="#FFFBEB" stroke="#141414" stroke-width="3"/>
      <circle cx="340" cy="228" r="68" fill="#E0F2FE" stroke="#141414" stroke-width="2.5"/>
      ${renderMiniVectorIcon('squirrel', 205, 215, 1.45)}
      ${renderMiniVectorIcon('monster', 340, 222, 1.55)}
      ${renderMiniVectorIcon('dino', 475, 215, 1.45)}
      ${renderMiniVectorIcon('star', 120, 175, 0.9)}
      ${renderMiniVectorIcon('mushroom', 125, 275, 0.9)}
      ${renderMiniVectorIcon('acorn', 555, 175, 0.9)}
      ${renderMiniVectorIcon('leaf', 555, 275, 0.9)}

      <!-- Bottom Ownership Box for the Child -->
      <rect x="95" y="328" width="490" height="50" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="340" y="348" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#475569">ESTE CUADERNO DE 20 LÁMINAS PERTENECE A:</text>
      <line x1="160" y1="368" x2="520" y2="368" stroke="#141414" stroke-width="2" stroke-dasharray="6 4"/>
    </svg>`;
  }

  // 1. FLASHCARDS GRID (4 Cut-out Bilingual Cards per sheet)
  if (page.visualType === 'FLASHCARDS_GRID' || page.flashcardsData || headingLower.includes('flashcard') || headingLower.includes('tarjetas')) {
    const cards = page.flashcardsData && page.flashcardsData.length > 0
      ? page.flashcardsData
      : [
          { cardNumber: (page.pageNumber - 1) * 4 + 1, es: 'EL LEÓN', en: 'THE LION', phonetic: '/laɪən/', category: 'Animales / Animals', colorHex: '#FEF3C7', iconType: 'squirrel' },
          { cardNumber: (page.pageNumber - 1) * 4 + 2, es: 'LA SETA ROJA', en: 'THE MUSHROOM', phonetic: '/mʌʃruːm/', category: 'Bosque / Forest', colorHex: '#FEE2E2', iconType: 'mushroom' },
          { cardNumber: (page.pageNumber - 1) * 4 + 3, es: 'LA ESTRELLA', en: 'THE STAR', phonetic: '/stɑːr/', category: 'Noche / Night', colorHex: '#E0F2FE', iconType: 'star' },
          { cardNumber: (page.pageNumber - 1) * 4 + 4, es: 'LA HOJA', en: 'THE LEAF', phonetic: '/liːf/', category: 'Otoño / Autumn', colorHex: '#DCFCE7', iconType: 'leaf' },
        ];

    return `<svg viewBox="0 0 680 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="24" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#475569">✂️ LÍNEA DE RECORTE ESCOLAR · 4 TARJETAS BILINGÜES 300 DPI (LÁMINA 0${page.pageNumber})</text>
      ${cards
        .slice(0, 4)
        .map((c, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const x = 28 + col * 318;
          const y = 36 + row * 186;
          return `<g>
            <rect x="${x}" y="${y}" width="296" height="172" rx="14" fill="${c.colorHex}" stroke="#141414" stroke-width="2.5" stroke-dasharray="8 5"/>
            <rect x="${x + 10}" y="${y + 10}" width="276" height="152" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
            <text x="${x + 22}" y="${y + 30}" font-family="monospace" font-size="11" font-weight="bold" fill="#64748B">#${String(c.cardNumber).padStart(2, '0')} · ${c.category}</text>
            <text x="${x + 268}" y="${y + 30}" text-anchor="end" font-size="13">✂️</text>
            ${renderMiniVectorIcon(c.iconType, x + 72, y + 92, 1.15)}
            <text x="${x + 135}" y="${y + 74}" font-family="Georgia, serif" font-size="17" font-weight="bold" fill="#0F172A">🇪🇸 ${c.es}</text>
            <text x="${x + 135}" y="${y + 102}" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#0284C7">🇬🇧 ${c.en}</text>
            <text x="${x + 135}" y="${y + 124}" font-family="monospace" font-size="12" fill="#475569">Pronunciación: ${c.phonetic}</text>
            <line x1="${x + 135}" y1="${y + 144}" x2="${x + 266}" y2="${y + 144}" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 4"/>
          </g>`;
        })
        .join('')}
    </svg>`;
  }

  // 2. MATH SUMS & DOTTED NUMBERS (e.g. Lámina 3: Grupos visuales de elementos del bosque con números grandes punteados)
  if (page.visualType === 'MATH_SUMS' || headingLower.includes('suma') || headingLower.includes('números grandes punteados')) {
    return `<svg viewBox="0 0 680 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <!-- Row 1: 2 Setas + 3 Piñas = 5 -->
      <rect x="20" y="16" width="640" height="175" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="36" y="40" font-family="monospace" font-size="11" font-weight="bold" fill="#B45309">EJERCICIO VISUAL 1 · CUENTA LAS SETAS Y PIÑAS Y REPASA LOS NÚMEROS PUNTEADOS:</text>
      <!-- Group A: 2 Mushrooms -->
      <rect x="36" y="52" width="145" height="122" rx="10" fill="#FEF2F2" stroke="#141414" stroke-width="2"/>
      ${renderMiniVectorIcon('mushroom', 75, 98, 0.95)}
      ${renderMiniVectorIcon('mushroom', 140, 98, 0.95)}
      <text x="108" y="162" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.2" stroke-dasharray="4 4">2</text>

      <text x="205" y="122" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="#141414">+</text>

      <!-- Group B: 3 Pinecones -->
      <rect x="228" y="52" width="190" height="122" rx="10" fill="#FEF3C7" stroke="#141414" stroke-width="2"/>
      ${renderMiniVectorIcon('pinecone', 265, 98, 0.9)}
      ${renderMiniVectorIcon('pinecone', 323, 98, 0.9)}
      ${renderMiniVectorIcon('pinecone', 381, 98, 0.9)}
      <text x="323" y="162" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.2" stroke-dasharray="4 4">3</text>

      <text x="445" y="122" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="#141414">=</text>

      <!-- Result Box: Dotted 5 -->
      <rect x="472" y="52" width="168" height="122" rx="10" fill="#ECFDF5" stroke="#141414" stroke-width="2.5"/>
      <circle cx="556" cy="112" r="46" fill="#FFFFFF" stroke="#059669" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="556" y="132" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.5" stroke-dasharray="5 5">5</text>

      <!-- Row 2: 3 Bellotas + 1 Hoja = 4 -->
      <rect x="20" y="206" width="640" height="175" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="36" y="230" font-family="monospace" font-size="11" font-weight="bold" fill="#0284C7">EJERCICIO VISUAL 2 · SUMA LAS BELLOTAS Y HOJAS DE OTOÑO Y TRAZA EL TOTAL:</text>
      <rect x="36" y="242" width="190" height="122" rx="10" fill="#FFFBEB" stroke="#141414" stroke-width="2"/>
      ${renderMiniVectorIcon('acorn', 75, 286, 0.9)}
      ${renderMiniVectorIcon('acorn', 130, 286, 0.9)}
      ${renderMiniVectorIcon('acorn', 185, 286, 0.9)}
      <text x="131" y="352" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.2" stroke-dasharray="4 4">3</text>

      <text x="250" y="312" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="#141414">+</text>

      <rect x="275" y="242" width="140" height="122" rx="10" fill="#FEF3C7" stroke="#141414" stroke-width="2"/>
      ${renderMiniVectorIcon('leaf', 345, 286, 0.95)}
      <text x="345" y="352" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.2" stroke-dasharray="4 4">1</text>

      <text x="442" y="312" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="bold" fill="#141414">=</text>

      <rect x="472" y="242" width="168" height="122" rx="10" fill="#EFF6FF" stroke="#141414" stroke-width="2.5"/>
      <circle cx="556" cy="302" r="46" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="6 4"/>
      <text x="556" y="322" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.5" stroke-dasharray="5 5">4</text>
    </svg>`;
  }

  // 3. SCISSORS & SIZE SORTING (Lámina 2: Recorta con Tijeras y Clasifica por Tamaño)
  if (page.visualType === 'SCISSORS_CUTOUT' || headingLower.includes('tijera') || headingLower.includes('recorta')) {
    return `<svg viewBox="0 0 680 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">ZONA SUPERIOR · PEGA AQUÍ LAS FIGURAS ORDENADAS DE MENOR A MAYOR TAMAÑO</text>
      <!-- 3 Target Paste Boxes -->
      <rect x="35" y="38" width="180" height="130" rx="12" fill="#FEF3C7" stroke="#141414" stroke-width="2.5"/>
      <text x="125" y="64" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#92400E">1. PEQUEÑO (SMALL)</text>
      <circle cx="125" cy="112" r="24" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 5"/>

      <rect x="250" y="38" width="180" height="130" rx="12" fill="#E0F2FE" stroke="#141414" stroke-width="2.5"/>
      <text x="340" y="64" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#075985">2. MEDIANO (MEDIUM)</text>
      <circle cx="340" cy="112" r="34" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 5"/>

      <rect x="465" y="38" width="180" height="130" rx="12" fill="#DCFCE7" stroke="#141414" stroke-width="2.5"/>
      <text x="555" y="64" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#166534">3. GRANDE (LARGE)</text>
      <circle cx="555" cy="112" r="44" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" stroke-dasharray="5 5"/>

      <!-- Scissor Cut Line -->
      <line x1="20" y1="196" x2="660" y2="196" stroke="#141414" stroke-width="2.5" stroke-dasharray="10 6"/>
      <text x="36" y="191" font-size="18">✂️ Recorta por la línea de puntos con tijeras escolares</text>

      <!-- 6 Cutout Cards at Bottom -->
      ${[
        { x: 35, label: 'PEQUEÑO', scale: 0.65, icon: 'acorn' },
        { x: 140, label: 'MEDIANO', scale: 0.9, icon: 'acorn' },
        { x: 245, label: 'GRANDE', scale: 1.2, icon: 'acorn' },
        { x: 350, label: 'PEQUEÑO', scale: 0.65, icon: 'mushroom' },
        { x: 455, label: 'MEDIANO', scale: 0.9, icon: 'mushroom' },
        { x: 560, label: 'GRANDE', scale: 1.2, icon: 'mushroom' },
      ]
        .map(
          (item) => `<g>
          <rect x="${item.x}" y="216" width="90" height="156" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="2" stroke-dasharray="6 4"/>
          ${renderMiniVectorIcon(item.icon, item.x + 45, 285, item.scale)}
          <text x="${item.x + 45}" y="352" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#334155">${item.label}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // 4. EMOTION WHEEL & FREE DRAWING FRAME (Lámina 4: Rueda de las Emociones)
  if (page.visualType === 'EMOTION_WHEEL' || headingLower.includes('emocion') || headingLower.includes('calma')) {
    return `<svg viewBox="0 0 680 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <!-- Left: 4 Expressive Children Faces -->
      <text x="175" y="28" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">1. RODEA CÓMO TE SIENTES HOY:</text>
      ${[
        { x: 40, y: 42, title: 'ALEGRE', color: '#FEF08A', mouth: 'M 75 110 Q 95 128 115 110' },
        { x: 185, y: 42, title: 'TRANQUILO', color: '#BAE6FD', mouth: 'M 225 114 Q 240 120 255 114' },
        { x: 40, y: 215, title: 'CURIOSO', color: '#DDD6FE', mouth: 'M 88 285 A 7 7 0 1 0 102 285 A 7 7 0 1 0 88 285' },
        { x: 185, y: 215, title: 'CANSADO', color: '#FECDD3', mouth: 'M 225 290 Q 240 278 255 290' },
      ]
        .map(
          (f) => `<g>
          <rect x="${f.x}" y="${f.y}" width="130" height="155" rx="14" fill="${f.color}" stroke="#141414" stroke-width="2.5"/>
          <circle cx="${f.x + 65}" cy="${f.y + 62}" r="36" fill="#FFF" stroke="#141414" stroke-width="2.5"/>
          <circle cx="${f.x + 52}" cy="${f.y + 52}" r="4" fill="#141414"/>
          <circle cx="${f.x + 78}" cy="${f.y + 52}" r="4" fill="#141414"/>
          <path d="${f.mouth}" fill="none" stroke="#141414" stroke-width="3" stroke-linecap="round"/>
          <text x="${f.x + 65}" y="${f.y + 132}" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#141414">${f.title}</text>
        </g>`
        )
        .join('')}

      <!-- Right: Free Drawing Decorated Frame -->
      <rect x="345" y="38" width="310" height="334" rx="16" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <rect x="357" y="50" width="286" height="310" rx="12" fill="#FFFDF9" stroke="#F59E0B" stroke-width="2" stroke-dasharray="8 5"/>
      <text x="500" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#141414">Mi Rincón de Dibujo Emocional</text>
      <text x="500" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#64748B">Dibuja aquí tu momento favorito de hoy</text>
      ${renderMiniVectorIcon('star', 385, 330, 0.7)}
      ${renderMiniVectorIcon('leaf', 615, 330, 0.7)}
    </svg>`;
  }

  // 5. STORY ILLUSTRATION (EPUB / Cuento Interactivo El Monstruo de la Calma)
  if (page.visualType === 'STORY_ILLUSTRATION' || headingLower.includes('capítulo') || headingLower.includes('monstruo') || headingLower.includes('frasco')) {
    return `<svg viewBox="0 0 680 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#EFF6FF;border-radius:10px;">
      <rect x="16" y="16" width="648" height="348" rx="16" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <!-- Friendly Calm Monster on Left -->
      ${renderMiniVectorIcon('monster', 135, 195, 2.3)}
      <text x="135" y="310" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#0369A1">Monstruito Lumi · Guía de Calma</text>

      <!-- Magic Star Jar in Center/Right -->
      <rect x="290" y="56" width="160" height="225" rx="26" fill="#F0F9FF" stroke="#141414" stroke-width="3"/>
      <rect x="320" y="36" width="100" height="24" rx="6" fill="#F59E0B" stroke="#141414" stroke-width="2.5"/>
      ${renderMiniVectorIcon('star', 340, 115, 0.9)}
      ${renderMiniVectorIcon('star', 405, 145, 0.9)}
      ${renderMiniVectorIcon('star', 355, 210, 0.9)}
      <text x="370" y="310" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#1E293B">FRASCO DE ESTRELLAS (CAP. 0${page.pageNumber})</text>

      <!-- Breathing Track on Far Right -->
      <rect x="478" y="56" width="164" height="225" rx="14" fill="#FEFCE8" stroke="#141414" stroke-width="2"/>
      <text x="560" y="84" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#854D0E">RESPIRA CON TU DEDO:</text>
      <path d="M 505 235 C 505 110, 615 110, 615 235" fill="none" stroke="#F59E0B" stroke-width="4" stroke-dasharray="7 5"/>
      <text x="515" y="258" font-family="monospace" font-size="10" fill="#141414">1. INHALA ⬆</text>
      <text x="575" y="258" font-family="monospace" font-size="10" fill="#141414">2. EXHALA ⬇</text>
    </svg>`;
  }

  // 6. MAZE FOREST (Laberinto)
  if (page.visualType === 'MAZE_FOREST' || headingLower.includes('laberinto')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">ENCUENTRA EL CAMINO EN EL LABERINTO DESDE LA ARDILLA HASTA LA GRAN BELLOTA</text>
      ${renderMiniVectorIcon('squirrel', 65, 90, 1.1)}
      <rect x="120" y="42" width="440" height="310" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <line x1="120" y1="120" x2="460" y2="120" stroke="#141414" stroke-width="3"/>
      <line x1="220" y1="195" x2="560" y2="195" stroke="#141414" stroke-width="3"/>
      <line x1="120" y1="275" x2="450" y2="275" stroke="#141414" stroke-width="3"/>
      <path d="M 105 82 L 505 82 L 505 158 L 175 158 L 175 235 L 505 235 L 505 315 L 595 315" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-dasharray="8 6"/>
      ${renderMiniVectorIcon('acorn', 615, 310, 1.25)}
    </svg>`;
  }

  // 6B. SHADOW MATCH (Empareja cada figura con su sombra)
  if (page.visualType === 'SHADOW_MATCH' || headingLower.includes('sombra')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">UNE CON UNA LÍNEA CADA ELEMENTO DE COLOR CON SU SOMBRA EXACTA</text>
      ${[
        { yLeft: 85, yRight: 245, icon: 'squirrel', label: 'Ardilla' },
        { yLeft: 165, yRight: 325, icon: 'mushroom', label: 'Seta Roja' },
        { yLeft: 245, yRight: 85, icon: 'acorn', label: 'Bellota' },
        { yLeft: 325, yRight: 165, icon: 'leaf', label: 'Hoja de Arce' },
      ]
        .map(
          (row) => `<g>
          <rect x="55" y="${row.yLeft - 32}" width="160" height="64" rx="10" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          ${renderMiniVectorIcon(row.icon, 95, row.yLeft, 0.9)}
          <text x="135" y="${row.yLeft + 5}" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#141414">${row.label}</text>
          <circle cx="230" cy="${row.yLeft}" r="6" fill="#0284C7"/>
          <line x1="236" y1="${row.yLeft}" x2="444" y2="${row.yRight}" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 6"/>
          <circle cx="450" cy="${row.yRight}" r="6" fill="#141414"/>
          <rect x="465" y="${row.yRight - 32}" width="160" height="64" rx="10" fill="#1E293B" stroke="#141414" stroke-width="2"/>
          <circle cx="515" cy="${row.yRight}" r="20" fill="#0F172A"/>
          <text x="550" y="${row.yRight + 5}" font-family="monospace" font-size="11" fill="#E2E8F0">Sombra ?</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // 6C. LOGIC SERIES (Series Lógicas Montessori ABAB / AABB)
  if (page.visualType === 'LOGIC_SERIES' || headingLower.includes('serie') || headingLower.includes('lógica')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">OBSERVA LA SECUENCIA LÓGICA Y DIBUJA O PEGA LA FIGURA QUE FALTA AL FINAL</text>
      ${[
        { y: 65, seq: ['mushroom', 'acorn', 'mushroom', 'acorn'], answer: '¿Seta?' },
        { y: 175, seq: ['leaf', 'leaf', 'pinecone', 'leaf'], answer: '¿Hoja?' },
        { y: 285, seq: ['squirrel', 'star', 'squirrel', 'star'], answer: '¿Ardilla?' },
      ]
        .map(
          (serie) => `<g>
          <rect x="35" y="${serie.y - 25}" width="610" height="86" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          ${serie.seq
            .map(
              (ic, i) => `<g>
              <rect x="${55 + i * 110}" y="${serie.y - 15}" width="92" height="66" rx="8" fill="#FEF3C7" stroke="#141414" stroke-width="1.5"/>
              ${renderMiniVectorIcon(ic, 101 + i * 110, serie.y + 18, 0.85)}
            </g>`
            )
            .join('')}
          <rect x="505" y="${serie.y - 15}" width="120" height="66" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="6 4"/>
          <text x="565" y="${serie.y + 24}" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#0284C7">? (${serie.answer})</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // 6D. SYMMETRY DRAW (Simetría en Espejo)
  if (page.visualType === 'SYMMETRY_DRAW' || headingLower.includes('simetría') || headingLower.includes('espejo')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">COMPLETA LA MITAD DERECHA SOBRE LA CUADRÍCULA COMO EN UN ESPEJO</text>
      <rect x="120" y="42" width="440" height="320" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      ${[1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="${120 + i * 55}" y1="42" x2="${120 + i * 55}" y2="362" stroke="#E2E8F0" stroke-width="1.5"/>`).join('')}
      ${[1, 2, 3, 4, 5].map((i) => `<line x1="120" y1="${42 + i * 53}" x2="560" y2="${42 + i * 53}" stroke="#E2E8F0" stroke-width="1.5"/>`).join('')}
      <!-- Central Axis of Symmetry -->
      <line x1="340" y1="34" x2="340" y2="370" stroke="#EF4444" stroke-width="3" stroke-dasharray="8 5"/>
      <!-- Left Half (Solid) -->
      <path d="M 340 75 L 250 130 L 285 150 L 210 225 L 265 240 L 195 310 L 340 310 Z" fill="#FDE68A" stroke="#141414" stroke-width="3"/>
      <!-- Right Half (Dotted Guide for Child to Trace) -->
      <path d="M 340 75 L 430 130 L 395 150 L 470 225 L 415 240 L 485 310 L 340 310" fill="none" stroke="#64748B" stroke-width="2.5" stroke-dasharray="6 6"/>
    </svg>`;
  }

  // 6E. COLOR BY NUMBER (Colorea por Números)
  if (page.visualType === 'COLOR_BY_NUMBER' || headingLower.includes('colorea') || headingLower.includes('dinosaurio')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <!-- Color Legend -->
      <g>
        ${[
          { n: 1, label: '1 = ROJO', color: '#FCA5A5', x: 35 },
          { n: 2, label: '2 = AMARILLO', color: '#FDE047', x: 165 },
          { n: 3, label: '3 = VERDE', color: '#86EFAC', x: 315 },
          { n: 4, label: '4 = AZUL', color: '#93C5FD', x: 455 },
          { n: 5, label: '5 = MARRÓN', color: '#D6D3D1', x: 565 },
        ]
          .map(
            (c) => `<g>
            <rect x="${c.x}" y="16" width="105" height="32" rx="8" fill="${c.color}" stroke="#141414" stroke-width="2"/>
            <text x="${c.x + 52}" y="36" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#141414">${c.label}</text>
          </g>`
          )
          .join('')}
      </g>
      <!-- Large Line-Art Scene with Numbers inside Regions -->
      <rect x="35" y="62" width="610" height="308" rx="14" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <!-- Sun (2) -->
      <circle cx="565" cy="118" r="36" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="565" y="125" text-anchor="middle" font-size="22" font-weight="bold">2</text>
      <!-- Giant Mushroom / Forest Scene -->
      <path d="M 160 220 Q 320 75 480 220 Z" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <text x="320" y="175" text-anchor="middle" font-size="28" font-weight="bold">1</text>
      <circle cx="250" cy="165" r="22" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
      <text x="250" y="172" text-anchor="middle" font-size="18" font-weight="bold">2</text>
      <circle cx="390" cy="165" r="22" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
      <text x="390" y="172" text-anchor="middle" font-size="18" font-weight="bold">2</text>
      <rect x="275" y="220" width="90" height="120" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <text x="320" y="288" text-anchor="middle" font-size="26" font-weight="bold">5</text>
      <path d="M 35 340 Q 180 295 340 340 T 645 340 L 645 370 L 35 370 Z" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="140" y="356" font-size="20" font-weight="bold">3</text>
      <text x="520" y="356" font-size="20" font-weight="bold">3</text>
    </svg>`;
  }

  // 6F. COUNTING 1 TO 10 & DOTTED NUMBERS (Conteo del 1 al 10)
  if (page.visualType === 'COUNTING_1_10' || headingLower.includes('1 al 10') || headingLower.includes('conteo') || headingLower.includes('decena') || headingLower.includes('matemático')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">TRAZA LOS NÚMEROS PUNTEADOS DEL 1 AL 10 Y COLOREA TANTOS CÍRCULOS COMO INDIQUE</text>
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((n, idx) => {
          const col = idx % 5;
          const row = Math.floor(idx / 5);
          const x = 28 + col * 126;
          const y = 42 + row * 168;
          return `<g>
            <rect x="${x}" y="${y}" width="114" height="152" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
            <text x="${x + 57}" y="${y + 68}" text-anchor="middle" font-family="Georgia, serif" font-size="56" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.2" stroke-dasharray="4 4">${n}</text>
            ${Array.from({ length: n })
              .map((_, dotIdx) => {
                const dx = x + 18 + (dotIdx % 5) * 19;
                const dy = y + 105 + Math.floor(dotIdx / 5) * 22;
                return `<circle cx="${dx}" cy="${dy}" r="6.5" fill="#FEF3C7" stroke="#141414" stroke-width="1.5"/>`;
              })
              .join('')}
          </g>`;
        })
        .join('')}
    </svg>`;
  }

  // 6G. LETTER TRACING A-E-I-O-U (Vocales y Letras Punteadas)
  if (page.visualType === 'LETTER_TRACING_AEIOU' || headingLower.includes('vocal') || headingLower.includes('letra') || headingLower.includes('abecedario')) {
    const letters = page.pageNumber % 2 === 0 ? ['A', 'E', 'I', 'O', 'U'] : ['M', 'P', 'S', 'L', 'T'];
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">REPASA LAS LETRAS GIGANTES PUNTEADAS Y PRACTICA EN LA PAUTA MONTESSORI</text>
      ${letters
        .map((ltr, idx) => {
          const x = 30 + idx * 126;
          return `<g>
            <rect x="${x}" y="44" width="112" height="145" rx="12" fill="#FEF3C7" stroke="#141414" stroke-width="2"/>
            <text x="${x + 56}" y="142" text-anchor="middle" font-family="Georgia, serif" font-size="82" font-weight="bold" fill="none" stroke="#141414" stroke-width="2.5" stroke-dasharray="5 5">${ltr}</text>
          </g>`;
        })
        .join('')}
      <!-- Calligraphy Writing Guides -->
      ${[225, 285, 345]
        .map(
          (y) => `<g>
          <line x1="40" y1="${y - 16}" x2="640" y2="${y - 16}" stroke="#94A3B8" stroke-width="1.5"/>
          <line x1="40" y1="${y}" x2="640" y2="${y}" stroke="#0284C7" stroke-width="2" stroke-dasharray="6 5"/>
          <line x1="40" y1="${y + 16}" x2="640" y2="${y + 16}" stroke="#141414" stroke-width="2"/>
          <text x="65" y="${y + 12}" font-family="Georgia, serif" font-size="34" fill="none" stroke="#64748B" stroke-width="1.8" stroke-dasharray="4 4">${letters.join('   ')}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // 6H. CLOCK & DAILY ROUTINES (Reloj Montessori de Hábitos)
  if (page.visualType === 'CLOCK_ROUTINES' || headingLower.includes('reloj') || headingLower.includes('hora')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
      <text x="340" y="26" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#1E293B">DIBUJA LAS AGUJAS DEL RELOJ Y UNE CADA MOMENTO DEL DÍA CON SU HÁBITO</text>
      ${[
        { cx: 135, hour: '08:00 · MAÑANA', label: 'Desayunar y vestir' },
        { cx: 340, hour: '14:00 · MEDIODÍA', label: 'Comer y jugar' },
        { cx: 545, hour: '20:30 · NOCHE', label: 'Cuento y dormir' },
      ]
        .map(
          (clk) => `<g>
          <rect x="${clk.cx - 90}" y="48" width="180" height="310" rx="14" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
          <circle cx="${clk.cx}" cy="155" r="68" fill="#FEFCE8" stroke="#141414" stroke-width="3"/>
          <circle cx="${clk.cx}" cy="155" r="5" fill="#141414"/>
          <text x="${clk.cx}" y="104" text-anchor="middle" font-size="13" font-weight="bold">12</text>
          <text x="${clk.cx + 54}" y="160" text-anchor="middle" font-size="13" font-weight="bold">3</text>
          <text x="${clk.cx}" y="214" text-anchor="middle" font-size="13" font-weight="bold">6</text>
          <text x="${clk.cx - 54}" y="160" text-anchor="middle" font-size="13" font-weight="bold">9</text>
          <line x1="${clk.cx}" y1="155" x2="${clk.cx}" y2="115" stroke="#EF4444" stroke-width="3" stroke-dasharray="4 3"/>
          <line x1="${clk.cx}" y1="155" x2="${clk.cx + 35}" y2="155" stroke="#0284C7" stroke-width="3" stroke-dasharray="4 3"/>
          <text x="${clk.cx}" y="268" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#0284C7">${clk.hour}</text>
          <text x="${clk.cx}" y="295" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#141414">${clk.label}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // 6I. DIPLOMA FINAL (Lámina 20: Gran Diploma de Honor)
  if (page.visualType === 'DIPLOMA_FINAL' || headingLower.includes('diploma')) {
    return `<svg viewBox="0 0 680 390" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FEF3C7;border-radius:10px;">
      <rect x="20" y="20" width="640" height="350" rx="16" fill="#FFFFFF" stroke="#141414" stroke-width="4"/>
      <rect x="34" y="34" width="612" height="322" rx="12" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="8 6"/>
      ${renderMiniVectorIcon('star', 95, 95, 1.3)}
      ${renderMiniVectorIcon('star', 585, 95, 1.3)}
      <text x="340" y="90" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#141414">★ GRAN DIPLOMA MONTESSORI ★</text>
      <text x="340" y="122" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#B45309">OTORGADO CON ORGULLO POR PAPERTOPBCN A:</text>
      <line x1="140" y1="178" x2="540" y2="178" stroke="#141414" stroke-width="3" stroke-dasharray="6 4"/>
      <text x="340" y="218" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#334155">Por haber completado con creatividad, paciencia y alegría las 20 láminas de actividades.</text>
      ${renderMiniVectorIcon('squirrel', 220, 285, 1.1)}
      ${renderMiniVectorIcon('monster', 340, 285, 1.1)}
      ${renderMiniVectorIcon('dino', 460, 285, 1.1)}
    </svg>`;
  }

  // 7. DEFAULT / TRACING PATHS (Lámina 1: Trazos del Bosque y Preescritura — 5 caminos punteados)
  return `<svg viewBox="0 0 680 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
    <text x="340" y="24" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#475569">✏️ TRAZA CON LÁPIZ DE IZQUIERDA A DERECHA SIN LEVANTAR LA MANO (LÁMINA ${String(page.pageNumber).padStart(2, '0')})</text>
    ${[1, 2, 3, 4, 5]
      .map((rowNum, idx) => {
        const y = 66 + idx * 68;
        const pathD =
          idx % 3 === 0
            ? `M 110 ${y} Q 210 ${y - 28} 310 ${y} T 510 ${y} L 565 ${y}`
            : idx % 3 === 1
            ? `M 110 ${y} L 190 ${y - 22} L 270 ${y + 22} L 350 ${y - 22} L 430 ${y + 22} L 510 ${y - 22} L 565 ${y}`
            : `M 110 ${y} C 180 ${y - 32}, 240 ${y + 32}, 340 ${y} C 420 ${y - 32}, 490 ${y + 32}, 565 ${y}`;
        return `<g>
          <circle cx="42" cy="${y}" r="16" fill="#FEF3C7" stroke="#141414" stroke-width="2"/>
          <text x="42" y="${y + 5}" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#141414">${rowNum}</text>
          ${renderMiniVectorIcon('squirrel', 82, y, 0.65)}
          <path d="${pathD}" fill="none" stroke="#141414" stroke-width="3.2" stroke-dasharray="8 7" stroke-linecap="round"/>
          ${renderMiniVectorIcon('acorn', 615, y, 0.75)}
        </g>`;
      })
      .join('')}
  </svg>`;
}

/**
 * Guarantees that EVERY digital product has:
 * - Página 0 (Lámina Principal / Portada Oficial Ilustrada, pageNumber = 0)
 * - Minimum 20 Exercise Pages (Lámina 01 to Lámina 20, pageNumber = 1..20)
 * = Minimum 21 sheets in total!
 */
export function ensureCoverAndMin20ExercisePages(
  assetTitle: string,
  ageRange: string,
  formatType: 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS',
  rawPages: GeneratedAssetPage[]
): GeneratedAssetPage[] {
  // 1. Build or preserve Page 0 (Portada Principal)
  const existingCover = rawPages.find((p) => p.pageNumber === 0 || p.visualType === 'COVER_PAGE');
  const coverPage: GeneratedAssetPage = existingCover
    ? { ...existingCover, pageNumber: 0, visualType: 'COVER_PAGE' }
    : {
        pageNumber: 0,
        heading: `Página 0 (Portada Principal): ${assetTitle}`,
        activityInstruction:
          `Portada oficial a color e interior imprimible (${ageRange}). Escribe el nombre del peque en el recuadro inferior antes de comenzar las 20 láminas de actividades.`,
        childContent:
          `¡Bienvenido/a a tu cuaderno de 20 láminas interactivas de PaperTopBCN! Escribe tu nombre y prepárate para aprender jugando.`,
        illustrationTheme: 'Portada oficial ilustrada con medallón central, personajes PaperTopBCN y cajetín de pertenencia',
        visualType: 'COVER_PAGE',
      };

  // 2. Collect existing exercise pages (pageNumber >= 1)
  const exercisePages = rawPages
    .filter((p) => p.pageNumber !== 0 && p.visualType !== 'COVER_PAGE')
    .map((p, idx) => ({
      ...p,
      pageNumber: idx + 1,
    }));

  // 3. Template bank for completing up to 20 distinct exercise pages (Láminas 01..20)
  const extraTemplates: Omit<GeneratedAssetPage, 'pageNumber'>[] = [
    {
      heading: 'Trazos Curvos y Preescritura Montessori (Nivel Progresivo)',
      activityInstruction: 'Sigue los 5 senderos punteados de izquierda a derecha sin levantar el lápiz.',
      childContent: '¡Acompaña a nuestros amigos por las 5 pistas curvas hasta llegar a la meta!',
      illustrationTheme: '5 pistas de grafomotricidad curva con iconos vectoriales',
      visualType: 'TRACING_PATHS',
    },
    {
      heading: 'Recorta con Tijeras y Clasifica por Tamaño (Pequeño, Mediano, Grande)',
      activityInstruction: 'Recorta por la línea de puntos las 6 tarjetas inferiores y pégalas en las 3 casillas superiores.',
      childContent: 'Pequeño · Mediano · Grande — Observa el tamaño de cada figura y clasifícala.',
      illustrationTheme: '3 casillas superiores y 6 fichas recortables con icono de tijeras',
      visualType: 'SCISSORS_CUTOUT',
    },
    {
      heading: 'Sumas Visuales con Apoyo Pictórico y Números Punteados',
      activityInstruction: 'Cuenta los objetos de cada grupo, traza los sumandos punteados y escribe el total.',
      childContent: 'Cuenta despacio con el dedo, suma los dos grupos y repasa el resultado final.',
      illustrationTheme: 'Bloques de sumas visuales con números grandes punteados',
      visualType: 'MATH_SUMS',
    },
    {
      heading: 'Educación Emocional: Termómetro de Emociones y Dibujo Libre',
      activityInstruction: 'Señala la emoción que sientes hoy y dibuja en el marco lateral tu actividad favorita.',
      childContent: 'Alegre · Tranquilo · Curioso · Cansado — Reconozco y expreso mis emociones.',
      illustrationTheme: '4 caritas emocionales y marco decorado de dibujo libre',
      visualType: 'EMOTION_WHEEL',
    },
    {
      heading: 'Laberinto de Atención Sostenida y Orientación Espacial',
      activityInstruction: 'Resuelve el recorrido del laberinto primero con el dedo índice y luego con cera o lápiz.',
      childContent: '¡Encuentra el camino abierto desde la entrada hasta el tesoro final!',
      illustrationTheme: 'Laberinto vectorial de trazo grueso infantil',
      visualType: 'MAZE_FOREST',
    },
    {
      heading: 'Discriminación Visual: Une cada Figura con su Sombra',
      activityInstruction: 'Observa los detalles del contorno y une con una línea cada dibujo con su silueta oscura.',
      childContent: '¿De quién es cada sombra? Conecta cada pareja con tu lápiz.',
      illustrationTheme: 'Columna de ilustraciones a la izquierda y siluetas de sombra a la derecha',
      visualType: 'SHADOW_MATCH',
    },
    {
      heading: 'Razonamiento Lógico: Completa las Series Montessori',
      activityInstruction: 'Descubre el patrón que se repite en cada fila y dibuja la figura que falta en el recuadro azul.',
      childContent: 'Observa el orden secreto de cada fila y adivina qué figura continúa la serie.',
      illustrationTheme: '3 secuencias lógicas visuales con casilla de incógnita',
      visualType: 'LOGIC_SERIES',
    },
    {
      heading: 'Geometría y Percepción: Dibujo en Espejo (Simetría Axial)',
      activityInstruction: 'Observa la mitad izquierda y completa la mitad derecha contando los cuadros de la rejilla.',
      childContent: '¡Dibuja la mitad que falta como si se mirara en un espejo mágico!',
      illustrationTheme: 'Cuadrícula con eje de simetría rojo y guía punteada',
      visualType: 'SYMMETRY_DRAW',
    },
    {
      heading: 'Atención y Motricidad Fina: Colorea por Números (1 al 5)',
      activityInstruction: 'Pinta cada zona numerada siguiendo el código de 5 colores de la parte superior.',
      childContent: '1 = Rojo · 2 = Amarillo · 3 = Verde · 4 = Azul · 5 = Marrón. ¡Colorea toda la escena!',
      illustrationTheme: 'Ilustración de línea clara dividida en zonas numeradas del 1 al 5',
      visualType: 'COLOR_BY_NUMBER',
    },
    {
      heading: 'Numeración y Cantidad: Conteo del 1 al 10 con Contadores',
      activityInstruction: 'Repasa la caligrafía punteada de los números del 1 al 10 y pinta sus círculos correspondientes.',
      childContent: 'Del 1 al 10: traza cada número y colorea tantos puntos como indique.',
      illustrationTheme: '10 tarjetas numeradas del 1 al 10 con números punteados y contadores',
      visualType: 'COUNTING_1_10',
    },
    {
      heading: 'Lectoescritura Inicial: Trazos de Vocales y Letras en Pauta',
      activityInstruction: 'Repasa las letras gigantes punteadas siguiendo la dirección del trazo y practica en la pauta inferior.',
      childContent: 'A · E · I · O · U — ¡Mis primeras letras grandes y claras en pauta Montessori!',
      illustrationTheme: '5 letras gigantes punteadas y 3 renglones de pauta caligráfica escolar',
      visualType: 'LETTER_TRACING_AEIOU',
    },
    {
      heading: 'Autonomía y Tiempo: El Reloj de Mis Rutinas Diarias',
      activityInstruction: 'Repasa las agujas punteadas de cada reloj para aprender las horas clave de mañana, tarde y noche.',
      childContent: '08:00 Mañana · 14:00 Mediodía · 20:30 Noche — Comprendo el orden de mi día.',
      illustrationTheme: '3 relojes analógicos didácticos con agujas punteadas y hábitos diarios',
      visualType: 'CLOCK_ROUTINES',
    },
  ];

  while (exercisePages.length < 20) {
    const nextNum = exercisePages.length + 1;

    if (nextNum === 20) {
      exercisePages.push({
        pageNumber: 20,
        heading: `Lámina 20: Gran Diploma de Honor y Superación (${assetTitle.slice(0, 38)})`,
        activityInstruction:
          'Escribe el nombre del niño/a en el diploma, recórtalo y colócalo en un lugar especial para celebrar que ha completado las 20 láminas.',
        childContent:
          '¡Enhorabuena! Has completado las 20 láminas de ejercicios con entusiasmo, concentración y creatividad.',
        illustrationTheme: 'Diploma oficial orlado con estrellas, personajes de PaperTopBCN y línea para el nombre',
        visualType: 'DIPLOMA_FINAL',
      });
      break;
    }

    if (formatType === 'JPG_FLASHCARDS') {
      const startCard = (nextNum - 1) * 4 + 1;
      const vocabPairs = [
        ['EL SOL', 'THE SUN', '/ðə sʌn/'],
        ['LA LUNA', 'THE MOON', '/ðə muːn/'],
        ['EL ÁRBOL', 'THE TREE', '/ðə triː/'],
        ['LA FLOR', 'THE FLOWER', '/ðə ˈflaʊ.ər/'],
        ['EL AGUA', 'THE WATER', '/ðə ˈwɔː.tər/'],
        ['EL LIBRO', 'THE BOOK', '/ðə bʊk/'],
        ['EL LÁPIZ', 'THE PENCIL', '/ðə ˈpen.səl/'],
        ['LA CASA', 'THE HOUSE', '/ðə haʊs/'],
      ];
      exercisePages.push({
        pageNumber: nextNum,
        heading: `Lámina ${nextNum} (Tarjetas #${String(startCard).padStart(2, '0')} a #${String(startCard + 3).padStart(2, '0')}): Vocabulario y Frases Bilingües ES/EN`,
        activityInstruction:
          'Recorta por la línea de puntos estas 4 tarjetas bilingües adicionales y combínalas con las anteriores para formar frases.',
        childContent: `Tarjetas recortables #${startCard} a #${startCard + 3} en español e inglés con pronunciación figurada.`,
        illustrationTheme: 'Cuadrícula de 4 tarjetas flashcards bilingües recortables a 300 DPI',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [0, 1, 2, 3].map((offset) => {
          const pair = vocabPairs[(startCard + offset) % vocabPairs.length];
          const icons = ['star', 'leaf', 'acorn', 'mushroom', 'squirrel', 'dino'];
          const colors = ['#FEF3C7', '#E0F2FE', '#DCFCE7', '#FCE7F3'];
          return {
            cardNumber: startCard + offset,
            es: pair[0],
            en: pair[1],
            phonetic: pair[2],
            category: 'Bilingüe · ES/EN',
            colorHex: colors[offset % colors.length],
            iconType: icons[(startCard + offset) % icons.length],
          };
        }),
      });
      continue;
    }

    const tpl = extraTemplates[(nextNum - 1) % extraTemplates.length];
    exercisePages.push({
      pageNumber: nextNum,
      heading: `Lámina ${nextNum}: ${tpl.heading}`,
      activityInstruction: tpl.activityInstruction,
      childContent: tpl.childContent,
      illustrationTheme: tpl.illustrationTheme,
      visualType: tpl.visualType,
    });
  }

  return [coverPage, ...exercisePages];
}
