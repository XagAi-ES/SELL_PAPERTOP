import React from 'react';

export const BUILTIN_AI_IMAGES = {
  forestTracing: '/src/assets/images/montessori_forest_tracing_1791119199051.jpg',
  mathMushrooms: '/src/assets/images/montessori_math_mushrooms_1791119212514.jpg',
  animalFlashcards: '/src/assets/images/bilingual_animal_flashcards_1791119223765.jpg',
  calmMonster: '/src/assets/images/calm_monster_storybook_1791119234942.jpg',
};

export interface FlashcardEntry {
  num: number;
  es: string;
  en: string;
  phonetic: string;
  icon: string;
  bg: string;
  category: string;
}

// Complete catalog of 30 Bilingual Flashcards (#01 to #30) so ALL 30 advertised cards are rendered and printable!
export const ALL_30_BILINGUAL_FLASHCARDS: FlashcardEntry[] = [
  // Lámina 1 (Cards #01 - #06): Animales del Bosque y Granja I
  { num: 1, es: 'EL LEÓN', en: 'THE LION', phonetic: '/ðə ˈlaɪ.ən/', icon: '🦁', bg: '#FEF3C7', category: 'Animales' },
  { num: 2, es: 'LA OVEJA', en: 'THE SHEEP', phonetic: '/ðə ʃiːp/', icon: '🐑', bg: '#E0F2FE', category: 'Animales' },
  { num: 3, es: 'EL CONEJO', en: 'THE RABBIT', phonetic: '/ðə ˈræb.ɪt/', icon: '🐰', bg: '#FCE7F3', category: 'Animales' },
  { num: 4, es: 'EL PATO', en: 'THE DUCK', phonetic: '/ðə dʌk/', icon: '🦆', bg: '#DCFCE7', category: 'Animales' },
  { num: 5, es: 'LA ARDILLA', en: 'THE SQUIRREL', phonetic: '/ðə ˈskwɪr.əl/', icon: '🐿️', bg: '#FFEDD5', category: 'Animales' },
  { num: 6, es: 'EL OSO', en: 'THE BEAR', phonetic: '/ðə beər/', icon: '🐻', bg: '#F3E8FF', category: 'Animales' },
  // Lámina 2 (Cards #07 - #12): Animales del Mar y Selva II
  { num: 7, es: 'EL ELEFANTE', en: 'THE ELEPHANT', phonetic: '/ði ˈel.ɪ.fənt/', icon: '🐘', bg: '#E0F2FE', category: 'Animales' },
  { num: 8, es: 'LA TORTUGA', en: 'THE TURTLE', phonetic: '/ðə ˈtɜː.təl/', icon: '🐢', bg: '#DCFCE7', category: 'Animales' },
  { num: 9, es: 'EL BÚHO', en: 'THE OWL', phonetic: '/ði aʊl/', icon: '🦉', bg: '#FEF3C7', category: 'Animales' },
  { num: 10, es: 'LA BALLENA', en: 'THE WHALE', phonetic: '/ðə weɪl/', icon: '🐳', bg: '#E0E7FF', category: 'Animales' },
  { num: 11, es: 'EL CABALLO', en: 'THE HORSE', phonetic: '/ðə hɔːs/', icon: '🐴', bg: '#FFEDD5', category: 'Animales' },
  { num: 12, es: 'LA MARIPOSA', en: 'THE BUTTERFLY', phonetic: '/ðə ˈbʌt.ə.flaɪ/', icon: '🦋', bg: '#FCE7F3', category: 'Animales' },
  // Lámina 3 (Cards #13 - #18): Colores y Formas (Colors & Shapes)
  { num: 13, es: 'ROJO CORAZÓN', en: 'RED HEART', phonetic: '/red hɑːt/', icon: '❤️', bg: '#FEE2E2', category: 'Colores' },
  { num: 14, es: 'AZUL CIELO', en: 'SKY BLUE', phonetic: '/skaɪ bluː/', icon: '💙', bg: '#E0F2FE', category: 'Colores' },
  { num: 15, es: 'AMARILLO SOL', en: 'SUN YELLOW', phonetic: '/sʌn ˈjel.əʊ/', icon: '☀️', bg: '#FEF9C3', category: 'Colores' },
  { num: 16, es: 'VERDE HOJA', en: 'LEAF GREEN', phonetic: '/liːf ɡriːn/', icon: '🍀', bg: '#DCFCE7', category: 'Colores' },
  { num: 17, es: 'NARANJA CALABAZA', en: 'ORANGE PUMPKIN', phonetic: '/ˈɒr.ɪndʒ/', icon: '🎃', bg: '#FFEDD5', category: 'Colores' },
  { num: 18, es: 'VIOLETA UVA', en: 'PURPLE GRAPE', phonetic: '/ˈpɜː.pəl/', icon: '🍇', bg: '#F3E8FF', category: 'Colores' },
  // Lámina 4 (Cards #19 - #24): Rutinas de Mañana (Morning Routines)
  { num: 19, es: 'DESPERTARSE', en: 'WAKE UP', phonetic: '/weɪk ʌp/', icon: '⏰', bg: '#FEF3C7', category: 'Rutinas' },
  { num: 20, es: 'DESAYUNAR SANO', en: 'EAT BREAKFAST', phonetic: '/iːt ˈbrek.fəst/', icon: '🥣', bg: '#DCFCE7', category: 'Rutinas' },
  { num: 21, es: 'LAVARSE DIENTES', en: 'BRUSH TEETH', phonetic: '/brʌʃ tiːθ/', icon: '🪥', bg: '#E0F2FE', category: 'Rutinas' },
  { num: 22, es: 'VESTIRSE SOLO', en: 'GET DRESSED', phonetic: '/ɡet drest/', icon: '👕', bg: '#FCE7F3', category: 'Rutinas' },
  { num: 23, es: 'PREPARAR MOCHILA', en: 'PACK BACKPACK', phonetic: '/pæk ˈbæk.pæk/', icon: '🎒', bg: '#FFEDD5', category: 'Rutinas' },
  { num: 24, es: 'IR AL COLEGIO', en: 'GO TO SCHOOL', phonetic: '/ɡəʊ tuː skuːl/', icon: '🚌', bg: '#FEF9C3', category: 'Rutinas' },
  // Lámina 5 (Cards #25 - #30): Rutinas de Tarde y Noche (Evening Routines)
  { num: 25, es: 'JUGAR Y CREAR', en: 'PLAY & CREATE', phonetic: '/pleɪ ænd kriˈeɪt/', icon: '🎨', bg: '#FCE7F3', category: 'Rutinas' },
  { num: 26, es: 'RECOGER JUGUETES', en: 'TIDY UP TOYS', phonetic: '/ˈtaɪ.di ʌp tɔɪz/', icon: '🧸', bg: '#FEF3C7', category: 'Rutinas' },
  { num: 27, es: 'HORA DEL BAÑO', en: 'TAKE A BATH', phonetic: '/teɪk ə bɑːθ/', icon: '🛁', bg: '#E0F2FE', category: 'Rutinas' },
  { num: 28, es: 'CENAR EN FAMILIA', en: 'FAMILY DINNER', phonetic: '/ˈfæm.əl.i ˈdɪn.ər/', icon: '🍲', bg: '#DCFCE7', category: 'Rutinas' },
  { num: 29, es: 'LEER UN CUENTO', en: 'READ A STORY', phonetic: '/riːd ə ˈstɔː.ri/', icon: '📖', bg: '#F3E8FF', category: 'Rutinas' },
  { num: 30, es: 'DORMIR FELIZ', en: 'SLEEP WELL', phonetic: '/sliːp wel/', icon: '🌙', bg: '#E0E7FF', category: 'Rutinas' },
];

/**
 * Generates self-contained, print-ready 300-DPI vector SVG artwork for EVERY sheet (#1..#N)
 * so 100% of announced sheets/flashcards/chapters have complete, distinct illustrations.
 */
export function getPrintableSvgMarkup(
  pageNumber: number,
  heading: string,
  illustrationTheme: string,
  formatType: 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS'
): string {
  // ===========================================================================
  // FORMAT A: PACK 30 FLASHCARDS BILINGÜES (5 Sheets x 6 Cards = 30 Cards #01-#30)
  // ===========================================================================
  if (formatType === 'JPG_FLASHCARDS' || heading.toLowerCase().includes('flashcard')) {
    const sheetIndex = Math.max(0, (pageNumber - 1) % 5);
    const startCardIdx = sheetIndex * 6;
    const sheetCards = ALL_30_BILINGUAL_FLASHCARDS.slice(startCardIdx, startCardIdx + 6);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 520" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="24" y="28" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">
        ✂️ LÁMINA ${pageNumber} DE 5 · FLASHCARDS BILINGÜES #${String(startCardIdx + 1).padStart(2, '0')} A #${String(startCardIdx + sheetCards.length).padStart(2, '0')} (DE 30 TOTALES)
      </text>
      ${sheetCards
        .map((c, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const x = 24 + col * 392;
          const y = 42 + row * 152;
          return `
          <g transform="translate(${x}, ${y})">
            <rect x="0" y="0" width="376" height="140" rx="14" fill="${c.bg}" stroke="#141414" stroke-width="2.5" stroke-dasharray="9 5"/>
            <rect x="12" y="12" width="36" height="22" rx="6" fill="#141414"/>
            <text x="30" y="27" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">#${String(c.num).padStart(2, '0')}</text>
            <circle cx="76" cy="78" r="42" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
            <text x="76" y="94" text-anchor="middle" font-size="42">${c.icon}</text>
            <text x="135" y="54" font-family="Georgia, serif" font-size="21" font-weight="bold" fill="#141414">${c.es}</text>
            <text x="135" y="84" font-family="monospace" font-size="18" font-weight="bold" fill="#0284C7">${c.en}</text>
            <text x="135" y="108" font-family="monospace" font-size="12" fill="#475569">Pronunciación: ${c.phonetic}</text>
            <text x="135" y="128" font-family="monospace" font-size="10" fill="#64748B">✂️ Recortar por borde punteado · Categoría: ${c.category}</text>
          </g>`;
        })
        .join('')}
    </svg>`;
  }

  // ===========================================================================
  // FORMAT B: CUENTO INTERACTIVO ILUSTRADO (8 Complete Illustrated Chapters)
  // ===========================================================================
  if (formatType === 'EPUB_CUENTO' || heading.toLowerCase().includes('capítulo')) {
    const chapterScenes: {
      badge: string;
      centerEmoji: string;
      practiceTitle: string;
      steps: string[];
      accent: string;
    }[] = [
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 01 · LA NUBE ROJA EN LA TRIPA',
        centerEmoji: '🌩️ 👾 💨',
        practiceTitle: 'Ejercicio Visual 1: Hincha el Globo de la Calma (3 Veces)',
        steps: ['1. Inspira por la nariz (4s)', '2. Siente tu barriga como un globo', '3. Sopla suave por la boca'],
        accent: '#FEE2E2',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 02 · EL FRASCO DE LAS ESTRELLAS',
        centerEmoji: '🫙 ✨ ⭐ 🌟',
        practiceTitle: 'Ejercicio Visual 2: Guarda 3 Estrellas Bonitas de Tu Día',
        steps: ['Estrella 1: Algo divertido', 'Estrella 2: Alguien a quien abrazar', 'Estrella 3: Un sueño bonito'],
        accent: '#FEF3C7',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 03 · LA ESTRELLA DE 5 PUNTAS',
        centerEmoji: '⭐ 👆 🌬️',
        practiceTitle: 'Ejercicio Visual 3: Sigue las 5 Puntas con tu Dedo Índice',
        steps: ['Sube por la punta: Toma aire', 'Pausa en la cima: Sonríe', 'Baja por la punta: Suelta el aire'],
        accent: '#E0F2FE',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 04 · EL ABRAZO DE LA TORTUGA SABIA',
        centerEmoji: '🐢 💚 🤗',
        practiceTitle: 'Ejercicio Visual 4: El Caparazón Seguro cuando Hay Ruido',
        steps: ['Cruza tus brazos sobre el pecho', 'Baja la barbilla despacio', 'Cuenta hasta 5 en silencio'],
        accent: '#DCFCE7',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 05 · SACUDIENDO LAS GOTAS DE LLUVIA',
        centerEmoji: '🌧️ 👐 🌈',
        practiceTitle: 'Ejercicio Visual 5: Sacude Manos y Pies como un Perrito Feliz',
        steps: ['Sacude la mano derecha 5 veces', 'Sacude la mano izquierda 5 veces', '¡Mira cómo sale el arcoíris!'],
        accent: '#F3E8FF',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 06 · LA PLUMA MÁGICA DEL BÚHO LEO',
        centerEmoji: '🦉 🪶 🌙',
        practiceTitle: 'Ejercicio Visual 6: Sopla la Pluma Imaginaria Sin que Caiga',
        steps: ['Pon tu palma abierta delante', 'Sopla un hilo de aire largo y suave', 'Observa cómo se relajan tus hombros'],
        accent: '#FFEDD5',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 07 · LA MANTA DE NUBES SUAVES',
        centerEmoji: '☁️ 🛏️ 🧸',
        practiceTitle: 'Ejercicio Visual 7: Relajación de Pies a Cabeza en la Cama',
        steps: ['Aprieta y suelta los deditos de los pies', 'Descansa los brazos sobre la sábana', 'Cierra los ojos y escucha tu respiración'],
        accent: '#E0E7FF',
      },
      {
        badge: 'ESCENA ILUSTRADA CAPÍTULO 08 · DIPLOMA DEL GUARDIÁN DE LA CALMA',
        centerEmoji: '🏅 👑 ✨',
        practiceTitle: 'Ejercicio Visual 8: Firma tu Medalla de Guardián de las Estrellas',
        steps: ['Has aprendido a escuchar tus emociones', 'Sabes respirar con la estrella mágica', '¡Dulces sueños, pequeño guardián!'],
        accent: '#FEF9C3',
      },
    ];

    const scene = chapterScenes[(pageNumber - 1) % chapterScenes.length];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <rect x="20" y="16" width="760" height="215" rx="16" fill="${scene.accent}" stroke="#141414" stroke-width="3"/>
      <text x="40" y="44" font-family="monospace" font-size="12" font-weight="bold" fill="#141414">${scene.badge}</text>
      <circle cx="150" cy="130" r="68" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <text x="150" y="145" text-anchor="middle" font-size="42">${scene.centerEmoji}</text>

      <!-- Star Breathing Visual Diagram on Right -->
      <g transform="translate(260, 58)">
        <rect x="0" y="0" width="490" height="150" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
        <text x="20" y="32" font-family="Georgia, serif" font-size="17" font-weight="bold" fill="#141414">${scene.practiceTitle}</text>
        ${scene.steps
          .map(
            (st, i) => `
          <rect x="20" y="${48 + i * 31}" width="450" height="25" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
          <text x="32" y="${65 + i * 31}" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1E293B">★ ${st}</text>`
          )
          .join('')}
      </g>

      <!-- Interactive Coloring & Tracing Star Strip at Bottom -->
      <rect x="20" y="248" width="760" height="154" rx="14" fill="#FFFFFF" stroke="#141414" stroke-width="2.5" stroke-dasharray="8 6"/>
      <text x="40" y="276" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">
        🎨 ACTIVIDAD DEL CAPÍTULO 0${pageNumber}: COLOREA LAS 5 ESTRELLAS DE TU FRASCO DE LA CALMA
      </text>
      ${[1, 2, 3, 4, 5]
        .map(
          (n, idx) => `
        <g transform="translate(${105 + idx * 145}, 340)">
          <polygon points="0,-42 12,-14 42,-10 20,10 26,40 0,24 -26,40 -20,10 -42,-10 -12,-14" fill="#FEF9C3" stroke="#141414" stroke-width="3" stroke-dasharray="5 3"/>
          <text x="0" y="8" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#141414">${n}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // ===========================================================================
  // FORMAT C: CUADERNO MONTESSORI (10 Distinct Worksheet Graphic Templates!)
  // ===========================================================================
  const modPage = ((pageNumber - 1) % 10) + 1;

  // Lámina 1: Trazos del Bosque (Ardilla -> 5 Bellotas)
  if (modPage === 1) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="28" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">✏️ LÁMINA 01 · GRAFOMOTRICIDAD: UNE LA ARDILLA CON LAS 5 BELLOTAS Y REPASA LOS NÚMEROS</text>
      ${[1, 2, 3, 4, 5]
        .map((num, idx) => {
          const yPos = 68 + idx * 72;
          const pathData =
            idx % 2 === 0
              ? `M 120 ${yPos} Q 240 ${yPos - 34}, 360 ${yPos} T 600 ${yPos}`
              : `M 120 ${yPos} L 220 ${yPos - 22} L 320 ${yPos + 22} L 420 ${yPos - 22} L 520 ${yPos + 22} L 600 ${yPos}`;
          return `
          <g>
            <circle cx="70" cy="${yPos}" r="24" fill="#FEF3C7" stroke="#141414" stroke-width="3"/>
            <text x="70" y="${yPos + 6}" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#141414">🐿️ ${num}</text>
            <path d="${pathData}" fill="none" stroke="#1E293B" stroke-width="4" stroke-dasharray="10 10" stroke-linecap="round"/>
            <g transform="translate(640, ${yPos - 24})">
              <rect x="0" y="0" width="125" height="48" rx="10" fill="#F8FAFC" stroke="#141414" stroke-width="2.5"/>
              <circle cx="30" cy="24" r="14" fill="#FED7AA" stroke="#141414" stroke-width="2.5"/>
              <path d="M16,20 Q30,8 44,20" fill="#78350F" stroke="#141414" stroke-width="2.5"/>
              <text x="86" y="36" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="none" stroke="#141414" stroke-width="2" stroke-dasharray="4 3">${num}</text>
            </g>
          </g>`;
        })
        .join('')}
    </svg>`;
  }

  // Lámina 2: Recorta con Tijeras y Clasifica por Tamaño
  if (modPage === 2) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">✂️ LÁMINA 02 · RECORTA LAS CASTAÑAS Y PÉGALAS DE MENOR A MAYOR TAMAÑO:</text>
      ${[
        { label: '1º PEQUEÑO (SMALL)', x: 25 },
        { label: '2º MEDIANO (MEDIUM)', x: 285 },
        { label: '3º GRANDE (LARGE)', x: 545 },
      ]
        .map(
          (box) => `
        <g transform="translate(${box.x}, 45)">
          <rect x="0" y="0" width="230" height="150" rx="12" fill="#F8FAFC" stroke="#141414" stroke-width="3"/>
          <text x="115" y="132" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#334155">${box.label}</text>
        </g>`
        )
        .join('')}
      <line x1="20" y1="222" x2="780" y2="222" stroke="#141414" stroke-width="2.5" stroke-dasharray="12 8"/>
      <text x="35" y="216" font-family="monospace" font-size="14" font-weight="bold" fill="#141414">✂️ LÍNEA DE RECORTE CON TIJERAS ESCOLARES</text>
      ${[
        { title: 'PEQUEÑO', scale: 0.55, x: 45 },
        { title: 'MEDIANO', scale: 0.82, x: 305 },
        { title: 'GRANDE', scale: 1.12, x: 565 },
      ]
        .map(
          (item) => `
        <g transform="translate(${item.x}, 240)">
          <rect x="0" y="0" width="190" height="155" rx="12" fill="#FFFBEB" stroke="#141414" stroke-width="2.5" stroke-dasharray="8 6"/>
          <g transform="translate(95, 72) scale(${item.scale})">
            <path d="M0,-42 C28,-38 42,-12 36,18 C30,36 14,44 0,44 C-14,44 -30,36 -36,18 C-42,-12 -28,-38 0,-42 Z" fill="#FED7AA" stroke="#141414" stroke-width="3"/>
            <path d="M-26,18 C-10,10 10,10 26,18" fill="none" stroke="#141414" stroke-width="2.5"/>
          </g>
          <text x="95" y="142" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#141414">✂️ ${item.title}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // Lámina 3: Sumas Visuales (2 Setas + 3 Piñas = 5)
  if (modPage === 3) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <rect x="20" y="16" width="760" height="220" rx="14" fill="#FFFBEB" stroke="#141414" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="40" y="44" font-family="monospace" font-size="13" font-weight="bold" fill="#475569">➕ LÁMINA 03 · SUMAS VISUALES MONTESSORI: CUENTA, COLOREA Y REPASA</text>
      <g transform="translate(45, 65)">
        <rect x="0" y="0" width="210" height="150" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
        <g transform="translate(28, 22)">
          <path d="M10,55 C10,15 70,15 70,55 Z" fill="#FEE2E2" stroke="#141414" stroke-width="3"/>
          <circle cx="28" cy="36" r="5" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          <circle cx="48" cy="30" r="6" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          <rect x="28" y="55" width="24" height="38" rx="6" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
        </g>
        <g transform="translate(110, 22)">
          <path d="M10,55 C10,15 70,15 70,55 Z" fill="#FEE2E2" stroke="#141414" stroke-width="3"/>
          <circle cx="30" cy="34" r="5" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          <circle cx="50" cy="40" r="5" fill="#FFFFFF" stroke="#141414" stroke-width="2"/>
          <rect x="28" y="55" width="24" height="38" rx="6" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
        </g>
        <text x="105" y="138" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#141414">2 SETAS</text>
      </g>
      <text x="285" y="155" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="bold" fill="#141414">+</text>
      <g transform="translate(315, 65)">
        <rect x="0" y="0" width="250" height="150" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
        ${[18, 95, 172]
          .map(
            (tx) => `
          <g transform="translate(${tx}, 25)">
            <ellipse cx="30" cy="45" rx="22" ry="34" fill="#FEF3C7" stroke="#141414" stroke-width="3"/>
            <path d="M12,35 Q30,48 48,35 M10,50 Q30,63 50,50 M15,22 Q30,34 45,22" fill="none" stroke="#141414" stroke-width="2.5"/>
          </g>`
          )
          .join('')}
        <text x="125" y="138" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#141414">3 PIÑAS</text>
      </g>
      <text x="595" y="155" text-anchor="middle" font-family="sans-serif" font-size="44" font-weight="bold" fill="#141414">=</text>
      <g transform="translate(625, 65)">
        <rect x="0" y="0" width="130" height="150" rx="12" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
        <text x="65" y="102" text-anchor="middle" font-family="Georgia, serif" font-size="82" font-weight="bold" fill="none" stroke="#64748B" stroke-width="2.5" stroke-dasharray="6 5">5</text>
        <text x="65" y="138" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#475569">TOTAL: 5</text>
      </g>
      <rect x="20" y="252" width="760" height="150" rx="14" fill="#FFFFFF" stroke="#141414" stroke-width="2.5"/>
      <text x="40" y="278" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">REPASA LOS NÚMEROS GRANDES PUNTEADOS DEL 1 AL 5:</text>
      <line x1="40" y1="335" x2="760" y2="335" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 6"/>
      <line x1="40" y1="382" x2="760" y2="382" stroke="#141414" stroke-width="2"/>
      ${[1, 2, 3, 4, 5]
        .map(
          (n, idx) => `
        <g transform="translate(${85 + idx * 145}, 372)">
          <text x="0" y="0" text-anchor="middle" font-family="Georgia, serif" font-size="84" font-weight="bold" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-dasharray="5 5">${n}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // Lámina 4: Rueda de las Emociones
  if (modPage === 4) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">💛 LÁMINA 04 · RUEDA DE LAS EMOCIONES: COLOREA CÓMO TE SIENTES HOY</text>
      ${[
        { label: 'ALEGRE', x: 35, mouth: 'M-22,10 Q0,32 22,10' },
        { label: 'TRANQUILO', x: 225, mouth: 'M-18,14 Q0,22 18,14' },
        { label: 'CURIOSO', x: 415, mouth: 'M-10,16 A10,10 0 1,0 10,16 A10,10 0 1,0 -10,16' },
        { label: 'CANSADO', x: 605, mouth: 'M-18,22 Q0,10 18,22' },
      ]
        .map(
          (face) => `
        <g transform="translate(${face.x}, 48)">
          <rect x="0" y="0" width="160" height="175" rx="14" fill="#F8FAFC" stroke="#141414" stroke-width="2.5"/>
          <g transform="translate(80, 78)">
            <circle cx="0" cy="0" r="48" fill="#FFFFFF" stroke="#141414" stroke-width="3.5"/>
            <circle cx="-16" cy="-10" r="5" fill="#141414"/>
            <circle cx="16" cy="-10" r="5" fill="#141414"/>
            <path d="${face.mouth}" fill="none" stroke="#141414" stroke-width="3.5" stroke-linecap="round"/>
          </g>
          <text x="80" y="156" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#141414">${face.label}</text>
        </g>`
        )
        .join('')}
      <rect x="35" y="242" width="730" height="158" rx="14" fill="#FFFBEB" stroke="#141414" stroke-width="3" stroke-dasharray="10 6"/>
      <text x="55" y="272" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#141414">🎨 DIBUJA AQUÍ QUÉ TE HACE SENTIR FELIZ Y EN CALMA:</text>
    </svg>`;
  }

  // Lámina 5: Laberinto del Erizo Púas hasta las Manzanas de Otoño
  if (modPage === 5) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🦔 LÁMINA 05 · LABERINTO DE ATENCIÓN: LLEVA AL ERIZO HASTA LA CESTA DE MANZANAS</text>
      <rect x="130" y="48" width="540" height="340" rx="16" fill="#FFFBEB" stroke="#141414" stroke-width="4"/>
      <!-- Maze Internal Walls -->
      <line x1="130" y1="125" x2="520" y2="125" stroke="#141414" stroke-width="4"/>
      <line x1="260" y1="205" x2="670" y2="205" stroke="#141414" stroke-width="4"/>
      <line x1="130" y1="290" x2="530" y2="290" stroke="#141414" stroke-width="4"/>
      <line x1="390" y1="48" x2="390" y2="90" stroke="#141414" stroke-width="4"/>
      <line x1="390" y1="205" x2="390" y2="255" stroke="#141414" stroke-width="4"/>
      <!-- Dotted Solution Hint -->
      <path d="M 95 85 L 590 85 L 590 165 L 200 165 L 200 248 L 590 248 L 590 345 L 705 345" fill="none" stroke="#94A3B8" stroke-width="3" stroke-dasharray="8 8"/>
      <!-- Start Hedgehog & Goal Apples -->
      <circle cx="68" cy="85" r="36" fill="#FEF3C7" stroke="#141414" stroke-width="3"/>
      <text x="68" y="96" text-anchor="middle" font-size="34">🦔</text>
      <circle cx="732" cy="345" r="36" fill="#DCFCE7" stroke="#141414" stroke-width="3"/>
      <text x="732" y="356" text-anchor="middle" font-size="34">🍎</text>
    </svg>`;
  }

  // Lámina 6: Empareja cada Hoja del Bosque con su Sombra ( Percepción Visual )
  if (modPage === 6) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🍂 LÁMINA 06 · DISCRIMINACIÓN VISUAL: UNE CON UNA LÍNEA CADA ELEMENTO CON SU SOMBRA</text>
      ${[
        { y: 80, leftIcon: '🍁', rightIcon: '🌰', leftLabel: 'HOJA ARCE', rightLabel: 'SOMBRA CASTAÑA' },
        { y: 175, leftIcon: '🍄', rightIcon: '🍁', leftLabel: 'SETA ROJA', rightLabel: 'SOMBRA ARCE' },
        { y: 270, leftIcon: '🌰', rightIcon: '🎃', leftLabel: 'CASTAÑA', rightLabel: 'SOMBRA CALABAZA' },
        { y: 365, leftIcon: '🎃', rightIcon: '🍄', leftLabel: 'CALABAZA', rightLabel: 'SOMBRA SETA' },
      ]
        .map(
          (row, idx) => `
        <g>
          <rect x="40" y="${row.y - 36}" width="210" height="68" rx="12" fill="#FFFBEB" stroke="#141414" stroke-width="2.5"/>
          <text x="80" y="${row.y + 10}" text-anchor="middle" font-size="34">${row.leftIcon}</text>
          <text x="165" y="${row.y + 4}" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#141414">${row.leftLabel}</text>
          <circle cx="270" cy="${row.y}" r="8" fill="#141414"/>

          ${idx === 0 ? `<line x1="278" y1="80" x2="522" y2="175" stroke="#64748B" stroke-width="2.5" stroke-dasharray="6 6"/>` : ''}

          <circle cx="530" cy="${row.y}" r="8" fill="#141414"/>
          <rect x="550" y="${row.y - 36}" width="210" height="68" rx="12" fill="#1E293B" stroke="#141414" stroke-width="2.5"/>
          <text x="595" y="${row.y + 10}" text-anchor="middle" font-size="34" opacity="0.35">${row.rightIcon}</text>
          <text x="680" y="${row.y + 4}" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#F8FAFC">${row.rightLabel}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // Lámina 7: Las 5 Vocales del Bosque (A, E, I, O, U Punteadas)
  if (modPage === 7) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🔤 LÁMINA 07 · LECTOESCRITURA MONTESSORI: REPASA LAS 5 VOCALES MAYÚSCULAS</text>
      ${[
        { v: 'A', word: 'ARDILLA', icon: '🐿️', x: 30 },
        { v: 'E', word: 'ERIZO', icon: '🦔', x: 180 },
        { v: 'I', word: 'IGUANA', icon: '🦎', x: 330 },
        { v: 'O', word: 'OSO', icon: '🐻', x: 480 },
        { v: 'U', word: 'URRACA', icon: '🐦', x: 630 },
      ]
        .map(
          (item) => `
        <g transform="translate(${item.x}, 55)">
          <rect x="0" y="0" width="138" height="335" rx="14" fill="#F8FAFC" stroke="#141414" stroke-width="2.5"/>
          <circle cx="69" cy="52" r="32" fill="#FEF3C7" stroke="#141414" stroke-width="2"/>
          <text x="69" y="64" text-anchor="middle" font-size="32">${item.icon}</text>
          <text x="69" y="108" text-anchor="middle" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">${item.word}</text>
          <line x1="18" y1="225" x2="120" y2="225" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="5 5"/>
          <line x1="18" y1="295" x2="120" y2="295" stroke="#141414" stroke-width="2"/>
          <text x="69" y="288" text-anchor="middle" font-family="Georgia, serif" font-size="108" font-weight="bold" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-dasharray="6 5">${item.v}</text>
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // Lámina 8: Series Lógicas y Patrones de Otoño (¿Qué figura sigue?)
  if (modPage === 8) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🧩 LÁMINA 08 · SERIES LÓGICAS: DIBUJA O PEGA LA FIGURA QUE CONTINÚA CADA SERIE</text>
      ${[
        { y: 65, seq: ['🍁', '🍄', '🍁', '🍄', '?'] },
        { y: 185, seq: ['🌰', '🌰', '🎃', '🌰', '?'] },
        { y: 305, seq: ['🦉', '🐿️', '🦔', '🦉', '?'] },
      ]
        .map(
          (row) => `
        <g transform="translate(35, ${row.y})">
          ${row.seq
            .map(
              (sym, idx) => `
            <rect x="${idx * 148}" y="0" width="128" height="92" rx="14" fill="${sym === '?' ? '#FEF3C7' : '#F8FAFC'}" stroke="#141414" stroke-width="3" ${sym === '?' ? 'stroke-dasharray="8 5"' : ''}/>
            <text x="${idx * 148 + 64}" y="58" text-anchor="middle" font-size="40" font-family="sans-serif" font-weight="bold" fill="#141414">${sym}</text>`
            )
            .join('')}
        </g>`
        )
        .join('')}
    </svg>`;
  }

  // Lámina 9: Simetría y Dibujo en Espejo (Completa la mitad de la Hoja de Roble)
  if (modPage === 9) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
      <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🪞 LÁMINA 09 · SIMETRÍA INFANTIL: COMPLETA LA MITAD DERECHA DE LA GRAN BELLOTA</text>
      <rect x="80" y="48" width="640" height="340" rx="16" fill="#FFFFFF" stroke="#141414" stroke-width="3"/>
      <!-- Symmetry Grid -->
      ${[160, 240, 320, 480, 560, 640]
        .map((gx) => `<line x1="${gx}" y1="48" x2="${gx}" y2="388" stroke="#E2E8F0" stroke-width="1.5"/>`)
        .join('')}
      ${[115, 185, 255, 325]
        .map((gy) => `<line x1="80" y1="${gy}" x2="720" y2="${gy}" stroke="#E2E8F0" stroke-width="1.5"/>`)
        .join('')}
      <!-- Center Axis -->
      <line x1="400" y1="48" x2="400" y2="388" stroke="#EF4444" stroke-width="3" stroke-dasharray="10 6"/>
      <!-- Left Solid Half -->
      <path d="M 400,85 C 260,85 210,165 230,220 L 400,220 Z" fill="#FED7AA" stroke="#141414" stroke-width="4"/>
      <path d="M 245,220 C 245,335 330,365 400,365" fill="none" stroke="#141414" stroke-width="4"/>
      <!-- Right Dotted Guide Half for Child to Complete -->
      <path d="M 400,85 C 540,85 590,165 570,220 L 400,220" fill="none" stroke="#64748B" stroke-width="3" stroke-dasharray="8 8"/>
      <path d="M 555,220 C 555,335 470,365 400,365" fill="none" stroke="#64748B" stroke-width="3" stroke-dasharray="8 8"/>
    </svg>`;
  }

  // Lámina 10: Conteo del 6 al 10 y Diploma de Explorador Montessori
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%" style="background:#FFFFFF;border-radius:8px;">
    <text x="25" y="30" font-family="monospace" font-size="13" font-weight="bold" fill="#141414">🏆 LÁMINA 10 · CONTEO DEL 6 AL 10 Y DIPLOMA DE EXPLORADOR DEL BOSQUE</text>
    <rect x="25" y="48" width="750" height="165" rx="14" fill="#F8FAFC" stroke="#141414" stroke-width="2.5"/>
    <line x1="45" y1="125" x2="755" y2="125" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 6"/>
    <line x1="45" y1="182" x2="755" y2="182" stroke="#141414" stroke-width="2"/>
    ${[6, 7, 8, 9, 10]
      .map(
        (n, idx) => `
      <g transform="translate(${95 + idx * 148}, 172)">
        <text x="0" y="0" text-anchor="middle" font-family="Georgia, serif" font-size="78" font-weight="bold" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-dasharray="5 5">${n}</text>
      </g>`
      )
      .join('')}
    <!-- Diploma Box -->
    <rect x="25" y="232" width="750" height="168" rx="16" fill="#FEF3C7" stroke="#141414" stroke-width="3.5" stroke-dasharray="12 6"/>
    <text x="400" y="278" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#141414">🏅 DIPLOMA OFICIAL MONTESSORI · PAPERTOPBCN</text>
    <text x="400" y="318" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#334155">¡Enhorabuena! Has completado las 10 láminas de actividades del Cuaderno de Otoño.</text>
    <text x="400" y="368" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="#141414">FIRMA DEL EXPLORADOR/A: ____________________________________</text>
  </svg>`;
}

export function getMatchingAiImageUrl(
  pageNumber: number,
  heading: string,
  formatType: 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS',
  customImageUrl?: string
): string {
  if (customImageUrl) return customImageUrl;
  if (formatType === 'JPG_FLASHCARDS') return BUILTIN_AI_IMAGES.animalFlashcards;
  if (formatType === 'EPUB_CUENTO') return BUILTIN_AI_IMAGES.calmMonster;
  const lower = heading.toLowerCase();
  if (lower.includes('suma') || lower.includes('seta') || pageNumber === 3 || pageNumber === 10) {
    return BUILTIN_AI_IMAGES.mathMushrooms;
  }
  return BUILTIN_AI_IMAGES.forestTracing;
}

export const PrintableWorksheetGraphic: React.FC<{
  pageNumber: number;
  heading: string;
  illustrationTheme: string;
  formatType: 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS';
  customImageUrl?: string;
  graphicMode: 'VECTOR_PRINT' | 'AI_ILLUSTRATION' | 'HYBRID_BOTH';
}> = ({
  pageNumber,
  heading,
  illustrationTheme,
  formatType,
  customImageUrl,
  graphicMode,
}) => {
  const svgMarkup = getPrintableSvgMarkup(
    pageNumber,
    heading,
    illustrationTheme,
    formatType
  );
  const aiImageUrl = getMatchingAiImageUrl(
    pageNumber,
    heading,
    formatType,
    customImageUrl
  );

  return (
    <div className="space-y-4">
      {(graphicMode === 'VECTOR_PRINT' || graphicMode === 'HYBRID_BOTH') && (
        <div className="border-2 border-[#141414] rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-amber-100 border-b-2 border-[#141414] text-[#141414] px-3 py-1.5 font-mono-code text-[11px] flex items-center justify-between font-bold">
            <span>🎨 LÁMINA GRÁFICA VECTORIAL COMPLETA (#0{pageNumber} · {illustrationTheme})</span>
            <span className="text-emerald-800">✓ CREADA Y LISTA PARA IMPRIMIR (SIN CUOTAS)</span>
          </div>
          <div
            className="w-full p-2 bg-white"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      )}

      {(graphicMode === 'AI_ILLUSTRATION' || graphicMode === 'HYBRID_BOTH') && (
        <div className="border-2 border-[#141414] rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-[#141414] text-white px-3 py-1.5 font-mono-code text-[11px] flex items-center justify-between">
            <span>🖼️ ARTE ILUSTRADO ADICIONAL DE ALTA RESOLUCIÓN</span>
            <span className="text-emerald-400">INCLUIDO EN EL ARCHIVO</span>
          </div>
          <img
            src={aiImageUrl}
            alt={heading}
            referrerPolicy="no-referrer"
            className="w-full max-h-[260px] object-contain bg-white mx-auto p-2"
          />
        </div>
      )}
    </div>
  );
};
