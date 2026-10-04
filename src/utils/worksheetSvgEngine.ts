export interface GeneratedAssetPage {
  pageNumber: number;
  heading: string;
  activityInstruction: string;
  childContent: string;
  illustrationTheme: string;
  visualType?:
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

  // 7. DEFAULT / TRACING PATHS (Lámina 1: Trazos del Bosque y Preescritura — 5 caminos punteados)
  return `<svg viewBox="0 0 680 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9;border-radius:10px;">
    <text x="340" y="24" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#475569">✏️ TRAZA CON LÁPIZ DE IZQUIERDA A DERECHA SIN LEVANTAR LA MANO (LÁMINA 0${page.pageNumber})</text>
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
