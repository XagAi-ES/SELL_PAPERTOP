import { ActionAlertItem } from '../components/AutonomousContentFactoryView';

export const COMPLETE_ACTION_ALERTS: ActionAlertItem[] = [
  // =========================================================================
  // PRODUCTO 1: CUADERNO MONTESSORI DE OTOÑO (10 LÁMINAS COMPLETAS)
  // =========================================================================
  {
    id: 'alert-init-1',
    assetTitle: 'Cuaderno Montessori de Otoño: 10 Láminas de Conteo, Trazos, Tijeras, Lógica y Emociones (3–6 años)',
    recommendedFileNameBase: 'PTB_01_Cuaderno_Montessori_Otono_3_6_Anos',
    formatType: 'PDF_IMPRIMIBLE',
    ageRange: '3–6 años',
    suggestedPriceEur: 11.9,
    createdAt: 'Hoy · 09:40',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'El Agente IA de PaperTopBCN y el Motor Gráfico Vectorial SVG han montado las 10 láminas completas anunciadas (Trazos, Recorte con Tijeras, Sumas Visuales, Rueda de Emociones, Laberinto, Sombras, Series Lógicas, Simetría, Colorear por Números y Conteo 1–10) listas en A4 y KDP 8.5x11" sin consumir cuota de API.',
    canAutoPublishPortals: ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit', 'TikTok'],
    manualActionRequired: true,
    whatToDo:
      '1. Revisa las 10 láminas ilustradas en el visor superior. 2. Descarga el PDF/HTML con las 10 láminas completas (PTB_01_Cuaderno_Montessori_Otono_3_6_Anos_Gumroad_A4.html). 3. Súbelo a Gumroad, Amazon KDP y /PTB/descargas/.',
    whereToPublish:
      '1) Gumroad: app.gumroad.com/products > New Product. 2) Amazon KDP: kdp.amazon.com > Libro de tapa blanda (8.5x11" Sin sangría). 3) FTP FileZilla: carpeta /PTB/descargas/.',
    whatWeNeedFromUser:
      'Tienes las 10 láminas gráficas ya creadas y previsualizables una por una arriba. Solo confirma el precio (€11.90) y sube el archivo descargado a Gumroad y KDP.',
    seoKeywords: [
      'cuaderno montessori otono imprimir pdf',
      'actividades preescolar 3 a 6 anos',
      'grafomotricidad y trazos infantiles',
      'recortables tijeras motricidad fina',
      'educacion emocional ninos',
      'busy book espanol imprimible',
      'libro actividades infantil kdp',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1: Trazos del Bosque y Preescritura (5 Caminos)',
        activityInstruction:
          'Une cada ardilla con su bellota siguiendo los 5 caminos punteados (curvos, zigzag y ondas) con un lápiz o cera gruesa sin levantar la mano.',
        childContent:
          '¡Ayuda a la ardilla Leo a llevar las 5 bellotas hasta su madriguera contando en voz alta: 1, 2, 3, 4 y 5!',
        illustrationTheme: '5 caminos de grafomotricidad punteados con ardillas e iconos de bellotas vectoriales',
        visualType: 'TRACING_PATHS',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Recorta con Tijeras y Clasifica por Tamaño',
        activityInstruction:
          'Recorta por la línea discontinua las 6 tarjetas inferiores con tijeras de punta redonda y pégalas de menor a mayor en las 3 casillas superiores.',
        childContent:
          'Pequeño (Small) · Mediano (Medium) · Grande (Large) — Observa las bellotas y setas del bosque y ordénalas.',
        illustrationTheme: '3 casillas superiores de clasificación y 6 tarjetas recortables con guía de tijeras',
        visualType: 'SCISSORS_CUTOUT',
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3: Sumas Visuales Montessori con Setas y Piñas',
        activityInstruction:
          'Cuenta los elementos ilustrados de cada grupo, repasa el número grande punteado y escribe el resultado dentro del círculo.',
        childContent:
          '2 setas rojas + 3 piñas del pino = 5 tesoros de otoño · 3 bellotas + 1 hoja = 4. ¡Repasa los números punteados!',
        illustrationTheme: 'Grupos visuales de elementos del bosque con números grandes punteados para trazar',
        visualType: 'MATH_SUMS',
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4: La Rueda de las Emociones en Casa y en el Cole',
        activityInstruction:
          'Señala o rodea qué carita representa cómo te sientes hoy y dibuja en el marco decorado de la derecha tu momento favorito del día.',
        childContent:
          'Hoy me siento: Alegre · Tranquilo · Curioso · Cansado. ¡Todas mis emociones son importantes!',
        illustrationTheme: '4 caritas expresivas infantiles y marco ilustrado con estrellas y hojas para dibujo libre',
        visualType: 'EMOTION_WHEEL',
      },
      {
        pageNumber: 5,
        heading: 'Lámina 5: El Gran Laberinto de la Ardilla Leo',
        activityInstruction:
          'Sigue primero con el dedo índice y luego con un rotulador el camino correcto dentro del laberinto sin chocar con las paredes.',
        childContent:
          '¿Por dónde debe ir la ardilla Leo para llegar hasta la bellota gigante antes de que empiece a llover?',
        illustrationTheme: 'Laberinto vectorial completo con entrada de ardilla, pasillos y meta con bellota',
        visualType: 'MAZE_FOREST',
      },
      {
        pageNumber: 6,
        heading: 'Lámina 6: Discriminación Visual — Empareja con su Sombra',
        activityInstruction:
          'Observa la silueta de cada elemento del bosque a la izquierda y únelo mediante una línea recta con su sombra oscura a la derecha.',
        childContent:
          'Ardilla · Seta Roja · Bellota · Hoja de Arce — ¡Encuentra la sombra secreta de cada tesoro del bosque!',
        illustrationTheme: '4 ilustraciones a color a la izquierda conectables con 4 siluetas de sombra a la derecha',
        visualType: 'SHADOW_MATCH',
      },
      {
        pageNumber: 7,
        heading: 'Lámina 7: Series Lógicas Montessori (Secuencias ABAB y AABB)',
        activityInstruction:
          'Observa el orden en que se repiten las figuras de cada fila y dibuja en la casilla azul final el elemento que continúa la serie.',
        childContent:
          'Fila 1: Seta, Bellota, Seta, Bellota... ¿Qué viene ahora? · Fila 2: Hoja, Hoja, Piña, Hoja... ¡Descúbrelo!',
        illustrationTheme: '3 filas de razonamiento lógico visual con casilla de incógnita al final',
        visualType: 'LOGIC_SERIES',
      },
      {
        pageNumber: 8,
        heading: 'Lámina 8: Simetría en Espejo sobre Cuadrícula',
        activityInstruction:
          'Fíjate en la mitad izquierda del árbol de otoño y repasa o dibuja la mitad derecha sobre la cuadrícula respetando el eje rojo de simetría.',
        childContent:
          '¡Conviértete en un gran dibujante completando la otra mitad del gran árbol del bosque como en un espejo!',
        illustrationTheme: 'Cuadrícula didáctica con eje de simetría central y figura mitad sólida / mitad punteada',
        visualType: 'SYMMETRY_DRAW',
      },
      {
        pageNumber: 9,
        heading: 'Lámina 9: Colorea por Números la Escena del Bosque',
        activityInstruction:
          'Mira el código de colores superior (del 1 al 5) y pinta cada zona del dibujo según el número indicado en su interior.',
        childContent:
          '1 = Rojo · 2 = Amarillo · 3 = Verde · 4 = Azul · 5 = Marrón. ¡Da vida a la gran seta mágica y al sol de otoño!',
        illustrationTheme: 'Escena de línea clara con regiones numeradas del 1 al 5 y paleta de referencia superior',
        visualType: 'COLOR_BY_NUMBER',
      },
      {
        pageNumber: 10,
        heading: 'Lámina 10: Conteo Montessori y Caligrafía del 1 al 10',
        activityInstruction:
          'Repasa con lápiz los números grandes punteados del 1 al 10 y colorea en cada tarjeta tantos círculos sensoriales como indique el número.',
        childContent:
          '1, 2, 3, 4, 5, 6, 7, 8, 9 y 10 — ¡Ya sabemos contar y escribir todos los números del bosque!',
        illustrationTheme: 'Cuadrícula de 10 tarjetas numeradas del 1 al 10 con tipografía punteada y contadores Montessori',
        visualType: 'COUNTING_1_10',
      },
    ],
    resolved: false,
  },

  // =========================================================================
  // PRODUCTO 2: PACK 30 FLASHCARDS BILINGÜES ES/EN (8 LÁMINAS = 30 TARJETAS + 2 EXTRA)
  // =========================================================================
  {
    id: 'alert-init-2',
    assetTitle: 'Pack 30 Flashcards Bilingües (Español-Inglés): Animales, Colores y Rutinas (8 Láminas Completas)',
    recommendedFileNameBase: 'PTB_02_Flashcards_Bilingues_Animales_Rutinas',
    formatType: 'JPG_FLASHCARDS',
    ageRange: '2–5 años',
    suggestedPriceEur: 8.9,
    createdAt: 'Hoy · 09:15',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Se han montado las 8 láminas completas que contienen las 30 Flashcards Bilingües (Español-Inglés) anunciadas en el título (#01 a #30 + 2 tarjetas comodín de recompensa = 32 tarjetas recortables a 300 DPI con pronunciación figurada e ilustración vectorial).',
    canAutoPublishPortals: ['Instagram', 'Pinterest', 'TikTok', 'X (Twitter)'],
    manualActionRequired: true,
    whatToDo:
      '1. Navega por las 8 láminas en el visor superior para ver las 30 tarjetas numeradas (#01 a #30). 2. Descarga el PDF A4 con las 8 láminas o las láminas .JPG a 300 DPI. 3. Súbelo a Gumroad y Pinterest.',
    whereToPublish:
      'Gumroad (app.gumroad.com/products) · Pinterest (Pin de Producto enlazado a Gumroad) · Canva Hub',
    whatWeNeedFromUser:
      'Todas las 30 tarjetas anunciadas están ya creadas en las 8 láminas (4 tarjetas por folio A4). Solo descarga el archivo y súbelo a tu tienda.',
    seoKeywords: [
      '30 flashcards bilingues ingles espanol ninos',
      'tarjetas vocabulario infantil imprimir',
      'montessori tarjetas animales colores rutinas',
      'aprender ingles jugando preescolar',
      'recursos aula infantil imprimibles',
      'flashcards 300 dpi pdf',
      'material didactico bilingue',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1 (Tarjetas #01 a #04): Animales del Bosque (Forest Animals)',
        activityInstruction:
          'Imprime en cartulina blanca A4, recorta por la línea de puntos las tarjetas #01 a #04 y practica la pronunciación en español e inglés.',
        childContent:
          '#01 EL LEÓN / THE LION · #02 LA ARDILLA / THE SQUIRREL · #03 EL BÚHO / THE OWL · #04 EL ZORRO / THE FOX',
        illustrationTheme: '4 tarjetas recortables bilingües (#01–#04) con iconos de animales del bosque y fonética',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 1, es: 'EL LEÓN', en: 'THE LION', phonetic: '/ðə ˈlaɪ.ən/', category: 'Animales · Animals', colorHex: '#FEF3C7', iconType: 'squirrel' },
          { cardNumber: 2, es: 'LA ARDILLA', en: 'THE SQUIRREL', phonetic: '/ðə ˈskwɪr.əl/', category: 'Bosque · Forest', colorHex: '#FFEDD5', iconType: 'squirrel' },
          { cardNumber: 3, es: 'EL ERIZO', en: 'THE HEDGEHOG', phonetic: '/ðə ˈhedʒ.hɒɡ/', category: 'Bosque · Forest', colorHex: '#FCE7F3', iconType: 'pinecone' },
          { cardNumber: 4, es: 'EL CIERVO', en: 'THE DEER', phonetic: '/ðə dɪər/', category: 'Bosque · Forest', colorHex: '#DCFCE7', iconType: 'squirrel' },
        ],
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2 (Tarjetas #05 a #08): Animales de la Granja (Farm Animals)',
        activityInstruction:
          'Recorta las tarjetas #05 a #08 y juega a imitar el sonido de cada animal de la granja antes de decir su nombre en inglés.',
        childContent:
          '#05 LA OVEJA / THE SHEEP · #06 EL CONEJO / THE RABBIT · #07 EL PATO / THE DUCK · #08 LA VACA / THE COW',
        illustrationTheme: '4 tarjetas recortables bilingües (#05–#08) de animales de la granja con borde de tijera',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 5, es: 'LA OVEJA', en: 'THE SHEEP', phonetic: '/ðə ʃiːp/', category: 'Granja · Farm', colorHex: '#E0F2FE', iconType: 'animal' },
          { cardNumber: 6, es: 'EL CONEJO', en: 'THE RABBIT', phonetic: '/ðə ˈræb.ɪt/', category: 'Granja · Farm', colorHex: '#FCE7F3', iconType: 'squirrel' },
          { cardNumber: 7, es: 'EL PATO', en: 'THE DUCK', phonetic: '/ðə dʌk/', category: 'Granja · Farm', colorHex: '#FEF9C3', iconType: 'animal' },
          { cardNumber: 8, es: 'LA VACA', en: 'THE COW', phonetic: '/ðə kaʊ/', category: 'Granja · Farm', colorHex: '#DCFCE7', iconType: 'animal' },
        ],
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3 (Tarjetas #09 a #12): Naturaleza y Exploración (Nature)',
        activityInstruction:
          'Utiliza las tarjetas #09 a #12 durante vuestro paseo por el parque para buscar hojas, setas, piñas y bellotas reales.',
        childContent:
          '#09 LA BELLOTA / THE ACORN · #10 LA SETA / THE MUSHROOM · #11 LA PIÑA / THE PINECONE · #12 LA HOJA / THE LEAF',
        illustrationTheme: '4 tarjetas recortables bilingües (#09–#12) de elementos botánicos y naturaleza',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 9, es: 'LA BELLOTA', en: 'THE ACORN', phonetic: '/ði ˈeɪ.kɔːn/', category: 'Naturaleza · Nature', colorHex: '#FEF3C7', iconType: 'acorn' },
          { cardNumber: 10, es: 'LA SETA ROJA', en: 'THE MUSHROOM', phonetic: '/ðə ˈmʌʃ.ruːm/', category: 'Naturaleza · Nature', colorHex: '#FEE2E2', iconType: 'mushroom' },
          { cardNumber: 11, es: 'LA PIÑA', en: 'THE PINECONE', phonetic: '/ðə ˈpaɪn.kəʊn/', category: 'Naturaleza · Nature', colorHex: '#FFEDD5', iconType: 'pinecone' },
          { cardNumber: 12, es: 'LA HOJA', en: 'THE LEAF', phonetic: '/ðə liːf/', category: 'Naturaleza · Nature', colorHex: '#DCFCE7', iconType: 'leaf' },
        ],
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4 (Tarjetas #13 a #16): Colores Primarios y Luz (Colors I)',
        activityInstruction:
          'Pide al peque que busque un juguete de su habitación que tenga el mismo color que cada tarjeta (#13 a #16).',
        childContent:
          '#13 ROJO / RED · #14 AMARILLO / YELLOW · #15 AZUL / BLUE · #16 VERDE / GREEN',
        illustrationTheme: '4 tarjetas recortables bilingües (#13–#16) de colores primarios y secundarios',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 13, es: 'EL COLOR ROJO', en: 'RED COLOR', phonetic: '/red/', category: 'Colores · Colors', colorHex: '#FECACA', iconType: 'mushroom' },
          { cardNumber: 14, es: 'AMARILLO SOL', en: 'YELLOW SUN', phonetic: '/ˈjel.əʊ/', category: 'Colores · Colors', colorHex: '#FEF08A', iconType: 'star' },
          { cardNumber: 15, es: 'AZUL CIELO', en: 'SKY BLUE', phonetic: '/bluː/', category: 'Colores · Colors', colorHex: '#BAE6FD', iconType: 'monster' },
          { cardNumber: 16, es: 'VERDE BOSQUE', en: 'FOREST GREEN', phonetic: '/ɡriːn/', category: 'Colores · Colors', colorHex: '#BBF7D0', iconType: 'dino' },
        ],
      },
      {
        pageNumber: 5,
        heading: 'Lámina 5 (Tarjetas #17 a #20): Colores del Arcoíris (Colors II)',
        activityInstruction:
          'Combina las tarjetas de la Lámina 4 y la Lámina 5 para formar un arcoíris completo en el suelo o en la mesa de luz.',
        childContent:
          '#17 NARANJA / ORANGE · #18 MORADO / PURPLE · #19 ROSA / PINK · #20 MARRÓN TIERRA / BROWN',
        illustrationTheme: '4 tarjetas recortables bilingües (#17–#20) de colores complementarios Montessori',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 17, es: 'NARANJA OTOÑO', en: 'ORANGE', phonetic: '/ˈɒr.ɪndʒ/', category: 'Colores · Colors', colorHex: '#FED7AA', iconType: 'leaf' },
          { cardNumber: 18, es: 'MORADO MAGIA', en: 'PURPLE', phonetic: '/ˈpɜː.pəl/', category: 'Colores · Colors', colorHex: '#E9D5FF', iconType: 'star' },
          { cardNumber: 19, es: 'ROSA DULCE', en: 'SWEET PINK', phonetic: '/pɪŋk/', category: 'Colores · Colors', colorHex: '#FBCFE8', iconType: 'animal' },
          { cardNumber: 20, es: 'MARRÓN TRONCO', en: 'WOOD BROWN', phonetic: '/braʊn/', category: 'Colores · Colors', colorHex: '#E7E5E4', iconType: 'acorn' },
        ],
      },
      {
        pageNumber: 6,
        heading: 'Lámina 6 (Tarjetas #21 a #24): Rutinas de la Mañana (Morning Routines)',
        activityInstruction:
          'Coloca estas 4 tarjetas en un panel visible para que el niño gane autonomía al despertarse sin necesidad de prisas.',
        childContent:
          '#21 DESPERTARSE / WAKE UP · #22 DESAYUNAR / HAVE BREAKFAST · #23 LAVARSE DIENTES / BRUSH TEETH · #24 VESTIRSE / GET DRESSED',
        illustrationTheme: '4 tarjetas recortables bilingües (#21–#24) de hábitos de autonomía matinal',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 21, es: 'DESPERTARSE', en: 'WAKE UP', phonetic: '/weɪk ʌp/', category: 'Rutina Mañana', colorHex: '#FEF3C7', iconType: 'star' },
          { cardNumber: 22, es: 'DESAYUNAR SANO', en: 'HAVE BREAKFAST', phonetic: '/hæv ˈbrek.fəst/', category: 'Rutina Mañana', colorHex: '#FFEDD5', iconType: 'acorn' },
          { cardNumber: 23, es: 'LAVAR DIENTES', en: 'BRUSH TEETH', phonetic: '/brʌʃ tiːθ/', category: 'Higiene · Hygiene', colorHex: '#E0F2FE', iconType: 'monster' },
          { cardNumber: 24, es: 'VESTIRSE SOLO', en: 'GET DRESSED', phonetic: '/ɡet drest/', category: 'Autonomía', colorHex: '#DCFCE7', iconType: 'squirrel' },
        ],
      },
      {
        pageNumber: 7,
        heading: 'Lámina 7 (Tarjetas #25 a #28): Rutinas de Tarde y Juego (Afternoon)',
        activityInstruction:
          'Ordena junto al peque las actividades de la tarde tras volver del cole para anticipar momentos de juego y recogida.',
        childContent:
          '#25 IR AL COLE / GO TO SCHOOL · #26 PINTAR Y CREAR / DRAW & CREATE · #27 RECOGER JUGUETES / TIDY UP · #28 BAÑO CALENTITO / TAKE A BATH',
        illustrationTheme: '4 tarjetas recortables bilingües (#25–#28) de rutinas de tarde y orden Montessori',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 25, es: 'IR AL COLE', en: 'GO TO SCHOOL', phonetic: '/ɡəʊ tuː skuːl/', category: 'Rutina Tarde', colorHex: '#DBEAFE', iconType: 'animal' },
          { cardNumber: 26, es: 'PINTAR Y CREAR', en: 'DRAW & CREATE', phonetic: '/drɔː ænd kriˈeɪt/', category: 'Creatividad', colorHex: '#FCE7F3', iconType: 'leaf' },
          { cardNumber: 27, es: 'RECOGER TODO', en: 'TIDY UP TOYS', phonetic: '/ˈtaɪ.di ʌp/', category: 'Orden · Montessori', colorHex: '#FEF3C7', iconType: 'pinecone' },
          { cardNumber: 28, es: 'HORA DEL BAÑO', en: 'TAKE A BATH', phonetic: '/teɪk ə bɑːθ/', category: 'Rutina Tarde', colorHex: '#E0F2FE', iconType: 'monster' },
        ],
      },
      {
        pageNumber: 8,
        heading: 'Lámina 8 (Tarjetas #29 a #30 + 2 Extra): Rutina de Noche y Calma (Night)',
        activityInstruction:
          'Completa las 30 tarjetas oficiales con la rutina de sueño (#29 y #30) más 2 tarjetas estrella de refuerzo positivo.',
        childContent:
          '#29 LEER UN CUENTO / READ A STORY · #30 DORMIR FELIZ / GO TO SLEEP · ★ TARJETA ESTRELLA DE CALMA · ★ TARJETA SUPERLOGRADO',
        illustrationTheme: 'Tarjetas finales #29 y #30 + 2 tarjetas comodín de recompensa emocional',
        visualType: 'FLASHCARDS_GRID',
        flashcardsData: [
          { cardNumber: 29, es: 'LEER UN CUENTO', en: 'READ A STORY', phonetic: '/riːd ə ˈstɔː.ri/', category: 'Rutina Noche', colorHex: '#EDE9FE', iconType: 'star' },
          { cardNumber: 30, es: 'DORMIR FELIZ', en: 'GO TO SLEEP', phonetic: '/ɡəʊ tuː sliːp/', category: 'Rutina Noche', colorHex: '#E0E7FF', iconType: 'monster' },
          { cardNumber: 31, es: '★ RESPIRACIÓN', en: 'CALM BREATH', phonetic: '/kɑːm breθ/', category: 'Extra · Calma', colorHex: '#FEF9C3', iconType: 'star' },
          { cardNumber: 32, es: '★ ¡LO LOGRASTE!', en: 'WELL DONE!', phonetic: '/wel dʌn/', category: 'Extra · Premio', colorHex: '#DCFCE7', iconType: 'star' },
        ],
      },
    ],
    resolved: false,
  },

  // =========================================================================
  // PRODUCTO 3: CUENTO INTERACTIVO ILUSTRADO (6 CAPÍTULOS / LÁMINAS COMPLETAS)
  // =========================================================================
  {
    id: 'alert-init-3',
    assetTitle: 'Cuento Interactivo Ilustrado: El Monstruo de la Calma y el Frasco de Estrellas (6 Capítulos Ilustrados)',
    recommendedFileNameBase: 'PTB_03_Cuento_Interactivo_Monstruo_Calma',
    formatType: 'EPUB_CUENTO',
    ageRange: '3–8 años',
    suggestedPriceEur: 9.5,
    createdAt: 'Ayer · 20:30',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Cuento infantil completo estructurado en 6 capítulos/láminas ilustradas con el Monstruito Lumi, el Frasco de Estrellas y ejercicios guiados de respiración consciente para antes de dormir (.EPUB y .PDF A4).',
    canAutoPublishPortals: ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit'],
    manualActionRequired: true,
    whatToDo:
      'Revisa los 6 capítulos ilustrados en el visor superior y descarga el archivo PTB_03_Cuento_Interactivo_Monstruo_Calma_Cuento_Interactivo.epub.xhtml o el PDF A4 para subirlo a Amazon KDP y Gumroad.',
    whereToPublish:
      'Amazon KDP (Crear > eBook Kindle / Tapa Blanda) y Gumroad (Digital Product)',
    whatWeNeedFromUser:
      'Los 6 capítulos ilustrados están listos y aprobados. Solo arrastra el archivo descargado a tu panel de KDP Kindle y Gumroad.',
    seoKeywords: [
      'cuento infantil gestionar rabietas',
      'libro ninos dormir tranquilos',
      'mindfulness y respiracion infantil',
      'cuento interactivo emociones epub',
      'educacion respetuosa cuento',
      'libro infantil kindle kdp espanol',
      'recursos psicologia infantil',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Capítulo 1: Cuando la Nube Roja Llega de Repente',
        activityInstruction:
          'Lee este capítulo en voz suave y pide al peque que hinche la barriga como un globo tres veces siguiendo la curva punteada.',
        childContent:
          'A veces, cuando las cosas no salen como queremos, aparece una nube rápida en la tripa. ¡Pero el monstruito Lumi conoce un superpoder secreto: la respiración de la estrella!',
        illustrationTheme: 'Monstruito Lumi junto al frasco de estrellas y curva de respiración con el dedo',
        visualType: 'STORY_ILLUSTRATION',
      },
      {
        pageNumber: 2,
        heading: 'Capítulo 2: El Secreto de Respirar con las Cinco Puntas',
        activityInstruction:
          'Recorre con el dedo índice las 5 puntas de la estrella luminosa: sube tomando aire por la nariz y baja soltando el aire despacito.',
        childContent:
          'Inhalo luz dorada... 1, 2, 3. Exhalo despacito como una pluma... 1, 2, 3. ¡Mira cómo la nube roja se vuelve blanca y suave!',
        illustrationTheme: 'Estrella de 5 puntas numeradas para seguimiento táctil de respiración consciente',
        visualType: 'STORY_ILLUSTRATION',
      },
      {
        pageNumber: 3,
        heading: 'Capítulo 3: El Frasco Mágico de las Estrellas de Calma',
        activityInstruction:
          'Pregúntale al niño qué 3 cosas bonitas han pasado hoy para guardarlas imaginariamente en su frasco antes de apagar la luz.',
        childContent:
          'Cada vez que nombramos algo que nos hizo sonreír hoy, una estrella nueva entra en el frasco de Lumi e ilumina toda la habitación.',
        illustrationTheme: 'Frasco mágico con estrellas brillantes para colorear y señalar en familia',
        visualType: 'STORY_ILLUSTRATION',
      },
      {
        pageNumber: 4,
        heading: 'Capítulo 4: ¿Cómo se Siente mi Cuerpo Ahora?',
        activityInstruction:
          'Señala en la rueda emocional cómo estaba el cuerpo antes de respirar y cómo se siente ahora después de encender el frasco.',
        childContent:
          'Mis hombros bajan, mis manos se abren y mi corazón late lento y contento como una tortuga que descansa al sol.',
        illustrationTheme: 'Rueda emocional del cuento y espacio para dibujar cómo brilla el frasco de calma',
        visualType: 'EMOTION_WHEEL',
      },
      {
        pageNumber: 5,
        heading: 'Capítulo 5: El Camino de Estrellas Hacia los Sueños',
        activityInstruction:
          'Traza con el dedo o con un lápiz amarillo los 5 senderos suaves que llevan a Lumi hasta su cama de nubes.',
        childContent:
          'Buenas noches a los árboles, buenas noches a la luna y buenas noches a mis pensamientos. ¡Mañana será otro gran día para descubrir!',
        illustrationTheme: '5 senderos punteados nocturnos desde Lumi hasta las estrellas del descanso',
        visualType: 'TRACING_PATHS',
      },
      {
        pageNumber: 6,
        heading: 'Capítulo 6: Actividad Recortable — Monta tu Propio Frasco de Calma',
        activityInstruction:
          'Recorta las 6 estrellas de gratitud de la parte inferior y pégalas dentro de tu frasco cada noche de la semana.',
        childContent:
          'Estrella de la Risa · Estrella del Abrazo · Estrella de la Paciencia · Estrella del Juego · Estrella del Cariño · Estrella del Sueño',
        illustrationTheme: 'Plantilla recortable con tijeras de 6 estrellas y casillas de clasificación emocional',
        visualType: 'SCISSORS_CUTOUT',
      },
    ],
    resolved: false,
  },

  // =========================================================================
  // PRODUCTO 4: BUSY BOOK IMPRIMIBLE VIAJES Y RESTAURANTES (6 LÁMINAS VELCRO)
  // =========================================================================
  {
    id: 'alert-init-4',
    assetTitle: 'Busy Book Imprimible: Viajes y Restaurantes Sin Pantallas (6 Láminas Recortables con Velcro)',
    recommendedFileNameBase: 'PTB_04_Busy_Book_Viajes_Restaurantes',
    formatType: 'PDF_IMPRIMIBLE',
    ageRange: '2–5 años',
    suggestedPriceEur: 14.5,
    createdAt: 'Ayer · 18:10',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Montadas las 6 láminas interactivas de viaje (Emparejar Sombras, Clasificar Tamaños con Velcro, Series de Vehículos, Laberinto de Vacaciones, Conteo de Maletas y Trazos de Aviones) listas para plastificar.',
    canAutoPublishPortals: ['Instagram', 'Pinterest', 'TikTok'],
    manualActionRequired: true,
    whatToDo:
      'Descarga el archivo PTB_04_Busy_Book_Viajes_Restaurantes_Gumroad_A4.html y súbelo a tu tienda Gumroad y catálogo web /PTB/descargas/.',
    whereToPublish: 'Gumroad · TikTok Shop · Web PaperTopBCN (/PTB/descargas/)',
    whatWeNeedFromUser:
      'Las 6 láminas del Busy Book de Viajes están listas en el visor. Solo sube el PDF/HTML descargado a Gumroad.',
    seoKeywords: [
      'busy book imprimible viajes pdf',
      'actividades restaurante sin pantallas ninos',
      'libro sensorial velcro imprimir',
      'juegos viaje coche avion preescolar',
      'montessori 2 a 5 anos descargable',
      'cuaderno actividades plastificar',
      'papertopbcn busy book',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1: Empareja cada Figura de Viaje con su Sombra (Velcro)',
        activityInstruction: 'Plastifica la lámina, pon un punto de velcro transparente en cada sombra y une cada figura con su silueta.',
        childContent: '¡Encuentra la sombra de cada compañero de viaje antes de despegar!',
        illustrationTheme: 'Tablero de sombras con guías circulares para velcro adhesivo',
        visualType: 'SHADOW_MATCH',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Clasifica tu Equipaje por Tamaño (Pequeño, Mediano, Grande)',
        activityInstruction: 'Recorta las 6 piezas inferiores y pégalas con velcro en el compartimento pequeño, mediano o grande.',
        childContent: 'Pequeño · Mediano · Grande — Ordena cada pieza en su maleta correspondiente.',
        illustrationTheme: '3 casillas superiores de velcro y 6 fichas recortables inferiores',
        visualType: 'SCISSORS_CUTOUT',
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3: Razonamiento Lógico en la Mesa del Restaurante',
        activityInstruction: 'Observa la serie de figuras y coloca con velcro la pieza que completa cada fila.',
        childContent: '¿Qué figura sigue ahora? Descubre el patrón secreto mientras esperamos la comida.',
        illustrationTheme: '3 secuencias lógicas Montessori con casilla final para ficha con velcro',
        visualType: 'LOGIC_SERIES',
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4: Trazos Borrables de Ruta (Usa Rotulador de Pizarra)',
        activityInstruction: 'Si plastificas esta hoja, el peque puede repasar los 5 caminos con rotulador borrable infinitas veces.',
        childContent: '¡Sigue las 5 rutas de viaje de principio a fin sin salirte del carril!',
        illustrationTheme: '5 pistas de grafomotricidad para usar con rotulador borrable en viajes',
        visualType: 'TRACING_PATHS',
      },
      {
        pageNumber: 5,
        heading: 'Lámina 5: Laberinto de Aventura Sin Pantallas',
        activityInstruction: 'Encuentra la salida del laberinto repasando con el dedo o con rotulador borrable.',
        childContent: '¡Ayuda a nuestro explorador a cruzar el laberinto hasta llegar al tesoro!',
        illustrationTheme: 'Laberinto infantil de trazo grueso para viajes en tren, coche o avión',
        visualType: 'MAZE_FOREST',
      },
      {
        pageNumber: 6,
        heading: 'Lámina 6: Conteo Rápido del 1 al 10 con Gomets o Velcro',
        activityInstruction: 'Cuenta los círculos de cada tarjeta del 1 al 10 y repasa el número punteado.',
        childContent: '¡Cuenta del 1 al 10 y completa todas las tarjetas del Busy Book!',
        illustrationTheme: '10 tarjetas numeradas del 1 al 10 con números punteados y contadores visuales',
        visualType: 'COUNTING_1_10',
      },
    ],
    resolved: false,
  },

  // =========================================================================
  // PRODUCTO 5: GRAN LIBRO DE COLOREAR Y TRAZOS DINOSAURIOS Y ESPACIO (6 LÁMINAS KDP)
  // =========================================================================
  {
    id: 'alert-init-5',
    assetTitle: 'Gran Libro de Colorear y Trazos: Dinosaurios y Espacio — Edición KDP 8.5x11" (6 Láminas)',
    recommendedFileNameBase: 'PTB_05_Dinosaurios_Espacio_Colorear_KDP',
    formatType: 'PDF_IMPRIMIBLE',
    ageRange: '4–8 años',
    suggestedPriceEur: 9.95,
    createdAt: 'Ayer · 16:45',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Maquetadas las 6 láminas de trazo grueso para Amazon KDP (8.5x11" sin sangría) y Gumroad: Colorear por Números, Simetría Espacial, Trazos Prehistóricos, Laberinto Jurásico, Sumas Visuales y Recortables.',
    canAutoPublishPortals: ['Amazon KDP', 'Gumroad', 'Pinterest'],
    manualActionRequired: true,
    whatToDo:
      'Descarga PTB_05_Dinosaurios_Espacio_Colorear_KDP_KDP_Interior_85x11.html y súbelo a Amazon KDP (Tapa Blanda 8.5x11").',
    whereToPublish: 'Amazon KDP (kdp.amazon.com) y Gumroad',
    whatWeNeedFromUser:
      'Revisa las 6 láminas KDP en el visor superior y sube el interior 8.5x11" a tu biblioteca de Amazon KDP.',
    seoKeywords: [
      'libro colorear dinosaurios ninos 4 a 8 anos',
      'cuaderno trazos y colorear por numeros kdp',
      'actividades dinosaurios y espacio imprimir',
      'grafomotricidad infantil kdp espanol',
      'pasatiempos infantiles sin pantallas',
      'simetria y laberintos ninos',
      'papertopbcn kdp',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1: Colorea por Números (Código del 1 al 5)',
        activityInstruction: 'Sigue la leyenda superior de colores del 1 al 5 para colorear cada zona numerada del paisaje.',
        childContent: '1 = Rojo · 2 = Amarillo · 3 = Verde · 4 = Azul · 5 = Marrón. ¡Pinta sin salirte del borde grueso!',
        illustrationTheme: 'Ilustración de línea gruesa KDP con números grandes en cada zona para colorear',
        visualType: 'COLOR_BY_NUMBER',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Simetría en Espejo sobre Cuadrícula Espacial',
        activityInstruction: 'Completa la mitad derecha de la figura siguiendo los cuadros como si fuera un espejo.',
        childContent: '¡Dibuja la otra mitad exacta guiándote por la línea central de puntos!',
        illustrationTheme: 'Cuadrícula de simetría visual para desarrollar la percepción espacial',
        visualType: 'SYMMETRY_DRAW',
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3: Caminos y Trazos de Precisión Jurásica',
        activityInstruction: 'Une cada fila de izquierda a derecha repasando las curvas y zigzags punteados.',
        childContent: '¡Domina el lápiz completando los 5 senderos de aventura!',
        illustrationTheme: '5 pistas de grafomotricidad progresiva en blanco y negro apto para KDP',
        visualType: 'TRACING_PATHS',
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4: El Laberinto del Explorador',
        activityInstruction: 'Traza la ruta correcta desde la entrada superior izquierda hasta la salida inferior derecha.',
        childContent: '¿Puedes encontrar el único camino abierto hasta la meta?',
        illustrationTheme: 'Laberinto vectorial de alto contraste para impresión en papel KDP',
        visualType: 'MAZE_FOREST',
      },
      {
        pageNumber: 5,
        heading: 'Lámina 5: Reto de Sumas Visuales y Caligrafía Numérica',
        activityInstruction: 'Cuenta las figuras de cada bloque, repasa los sumandos punteados y traza el resultado.',
        childContent: '2 + 3 = 5 · 3 + 1 = 4. ¡Aprende a sumar contando objetos reales!',
        illustrationTheme: 'Bloques de sumas gráficas con números grandes punteados',
        visualType: 'MATH_SUMS',
      },
      {
        pageNumber: 6,
        heading: 'Lámina 6: Empareja cada Silueta con su Sombra Misteriosa',
        activityInstruction: 'Une mediante una flecha cada ilustración de la columna izquierda con su sombra derecha.',
        childContent: '¡Agudiza la vista y descubre a quién pertenece cada sombra!',
        illustrationTheme: 'Ejercicio de atención visual y emparejamiento de siluetas',
        visualType: 'SHADOW_MATCH',
      },
    ],
    resolved: false,
  },

  // =========================================================================
  // PRODUCTO 6: PACK MATEMÁTICO MANIPULATIVO DECENAS, REGLETAS Y TIENDECITA (6 LÁMINAS)
  // =========================================================================
  {
    id: 'alert-init-6',
    assetTitle: 'Pack Matemático Manipulativo: Decenas, Regletas y Tiendecita (6 Láminas Completas)',
    recommendedFileNameBase: 'PTB_06_Pack_Matematico_Manipulativo_Tiendecita',
    formatType: 'PDF_IMPRIMIBLE',
    ageRange: '5–9 años',
    suggestedPriceEur: 10.5,
    createdAt: 'Ayer · 14:20',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Creadas las 6 láminas de matemáticas manipulativas: Conteo y Decenas del 1 al 10, Sumas Visuales de la Tiendecita, Series Numéricas y Lógicas, Clasificación de Tamaños, Simetría Geométrica y Cálculo por Colores.',
    canAutoPublishPortals: ['Gumroad', 'Canva', 'Amazon KDP', 'Pinterest'],
    manualActionRequired: true,
    whatToDo:
      'Descarga PTB_06_Pack_Matematico_Manipulativo_Tiendecita_Gumroad_A4.html y súbelo a Gumroad y Canva.',
    whereToPublish: 'Gumroad · Amazon KDP · Carpeta FTP /PTB/descargas/',
    whatWeNeedFromUser:
      'Revisa las 6 láminas matemáticas en el visor superior y descarga el PDF A4 listo para aula o casa.',
    seoKeywords: [
      'matematicas manipulativas primaria imprimir pdf',
      'sumas visuales montessori ninos',
      'aprender a contar del 1 al 10 fichas',
      'juegos matematicos aula infantil',
      'series logicas y simetria primaria',
      'cuaderno matematicas kdp espanol',
      'papertopbcn matematicas',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1: Tarjetas de Números Punteados y Contadores del 1 al 10',
        activityInstruction: 'Traza cada número del 1 al 10 y pinta los contadores circulares formando decenas.',
        childContent: 'Del 1 al 10: comprende la cantidad exacta que representa cada número.',
        illustrationTheme: '10 paneles matemáticos con número punteado grande y base diez visual',
        visualType: 'COUNTING_1_10',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Sumas Manipulativas en la Tiendecita del Bosque',
        activityInstruction: 'Suma los artículos comprados en cada cesta y repasa el precio/cantidad total.',
        childContent: '2 + 3 = 5 artículos · 3 + 1 = 4 artículos. ¡Cuenta, suma y repasa!',
        illustrationTheme: 'Operaciones de suma con apoyo pictórico y resultado punteado en círculo',
        visualType: 'MATH_SUMS',
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3: Patrones y Razonamiento Algebraico Inicial (Series)',
        activityInstruction: 'Descubre la regla de repetición en cada fila y dibuja el elemento que ocupa el lugar final.',
        childContent: 'Observa, razona y completa las 3 series lógicas.',
        illustrationTheme: '3 trenes de secuencias lógicas con casilla de resolución',
        visualType: 'LOGIC_SERIES',
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4: Geometría y Simetría Axial en Cuadrícula',
        activityInstruction: 'Cuenta los cuadritos desde el eje rojo central y traza la figura simétrica a la derecha.',
        childContent: 'Aprende geometría dibujando en espejo con precisión.',
        illustrationTheme: 'Cuadrícula milimetrada escolar con eje de simetría central',
        visualType: 'SYMMETRY_DRAW',
      },
      {
        pageNumber: 5,
        heading: 'Lámina 5: Clasificación por Magnitudes y Tamaños (Recortable)',
        activityInstruction: 'Recorta las 6 tarjetas inferiores y clasifícalas según su magnitud: pequeño, mediano o grande.',
        childContent: 'Compara tamaños y pega cada ficha en su columna matemática.',
        illustrationTheme: 'Tabla de 3 columnas de magnitud y 6 fichas recortables',
        visualType: 'SCISSORS_CUTOUT',
      },
      {
        pageNumber: 6,
        heading: 'Lámina 6: Código Numérico de Colores (Atención y Número)',
        activityInstruction: 'Asocia cada número del 1 al 5 con su color correspondiente y completa el mosaico.',
        childContent: '1=Rojo, 2=Amarillo, 3=Verde, 4=Azul, 5=Marrón. ¡Matemáticas a todo color!',
        illustrationTheme: 'Lámina de asociación número-color con leyenda superior',
        visualType: 'COLOR_BY_NUMBER',
      },
    ],
    resolved: false,
  },
];

