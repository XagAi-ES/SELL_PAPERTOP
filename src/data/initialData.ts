export interface PolsiaTask {
  id: string;
  title: string;
  description: string;
  category: 'CORRECCIÓN' | 'FUNCIONALIDAD' | 'INVESTIGACIÓN' | 'AUTOPUBLICACIÓN' | 'CATÁLOGO';
  credits: number;
  status: 'PENDIENTE' | 'EN_CURSO' | 'DESPLEGADO';
  createdAt: string;
  deliverable?: string;
}

export interface SocialPostItem {
  id: string;
  portalId: string;
  portalName: string;
  handle: string;
  content: string;
  imageSuggestion?: string;
  hashtags?: string[];
  scheduledFor?: string;
  timestamp: string;
  status: 'PUBLICADO' | 'PROGRAMADO' | 'PENDIENTE_APROBACIÓN' | 'BORRADOR';
  trendSource?: string;
  metrics?: {
    impressions: number;
    clicks: number;
    ctrPct?: number;
    conversions: number;
  };
}

export interface PortalConfig {
  id: string;
  name: string;
  handle: string;
  category: 'SOCIAL' | 'MARKETPLACE' | 'DISEÑO' | 'ADS';
  connected: boolean;
  autoPublish: boolean;
  dailySchedule: string;
  lastSync: string;
  accentColor: string;
  description: string;
  interactionCapabilities: string[];
  metrics: {
    followersOrItems: string;
    monthlyClicks: number;
    revenueEur: number;
    impressions?: number;
    ctrPct?: number;
    avgTimeOnPageSec?: number;
    conversionRatePct?: number;
    ordersCount?: number;
  };
}

export interface CatalogProduct {
  id: string;
  sku: string;
  title: string;
  category: 'Cuadernos Montessori' | 'Colorear KDP' | 'Flashcards Imprimibles' | 'Juegos de Aula' | 'Plantillas Canva';
  ageRange: string;
  priceEur: number;
  formats: string[];
  portals: string[];
  salesCount: number;
  revenueEur: number;
  status: 'ACTIVO' | 'BORRADOR' | 'TENDENCIA';
  canvaTemplateUrl?: string;
  gumroadSlug?: string;
  kdpAsin?: string;
  previewColor: string;
  previewIconType: 'montessori' | 'dinosaur' | 'flashcards' | 'busybook' | 'emotions' | 'math';
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  productTitle: string;
  portal: 'Gumroad' | 'Amazon KDP' | 'Web PaperTopBCN' | 'Instagram Shop' | 'Canva Hub' | 'Pinterest' | 'TikTok' | 'X (Twitter)' | 'Reddit';
  amountEur: number;
  status: 'ENTREGADO_PDF' | 'PROCESANDO_KDP' | 'PLANTILLA_CANVA_ENVIADA';
  createdAt: string;
  dateIso?: string;
  country: string;
}

export interface TrendPlatformDraft {
  postText: string;
  imageSuggestion: string;
  hashtags: string[];
  bestTime: string;
}

export interface TrendItem {
  id: string;
  title: string;
  growthBadge: string;
  sourcePlatform: string;
  whyItWorks: string;
  recommendedProductIdea: string;
  autoPosts: {
    x: string;
    instagram: string;
    pinterest: string;
    reddit: string;
    tiktok: string;
  };
  richDrafts?: {
    x: TrendPlatformDraft;
    instagram: TrendPlatformDraft;
    pinterest: TrendPlatformDraft;
    tiktok: TrendPlatformDraft;
    reddit?: TrendPlatformDraft;
  };
}

export interface GrowthSuggestion {
  id: string;
  title: string;
  impact: string;
  channel: string;
  recommendation: string;
  automationPrompt: string;
  implemented: boolean;
}

export interface PolsiaDocument {
  id: string;
  title: string;
  updatedAgo: string;
  category: string;
  content: string;
}

export interface ChatFeedItem {
  id: string;
  type: 'DEPLOYMENT_CARD' | 'USER_MESSAGE' | 'AI_THOUGHT_RESPONSE' | 'DIVIDER';
  portalLinkText?: string;
  title?: string;
  text: string;
  timestamp: string;
  thinkingSeconds?: number;
  actionLinkText?: string;
  actionTaskId?: string;
  rated?: 'up' | 'down' | null;
}

export interface DomainConfig {
  customDomain: string;
  ftpDirectory: string;
  sslActive: boolean;
  dnsVerified: boolean;
  autoDeployChanges: boolean;
  brandTagline: string;
  supportEmail: string;
}

export type CrmSegment =
  | 'VIP_RECURRENTE'
  | 'COLEGIOS_DOCENTES'
  | 'FAMILIAS_MONTESSORI'
  | 'COMPRADORES_KDP_GUMROAD'
  | 'NUEVOS_LEADS';

export interface CrmInteraction {
  id: string;
  type: 'EMAIL' | 'SOPORTE_PDF' | 'REDES_SOCIALES' | 'NOTA_INTERNA' | 'CAMPANA_IA';
  summary: string;
  channel: string;
  timestamp: string;
}

export interface CrmCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organizationOrRole: string;
  country: string;
  segment: CrmSegment;
  acquisitionChannel: string;
  totalSpentEur: number;
  ordersCount: number;
  lastPurchaseDate: string;
  favoriteCategory: string;
  tags: string[];
  notes: string;
  interactions: CrmInteraction[];
}

export const INITIAL_TASKS: PolsiaTask[] = [
  {
    id: 'task-1',
    title: 'Unificación total de marca PaperTopBCN y paquete listo para FTP (/PTB)',
    description: 'Eliminadas todas las referencias externas de marca y compilado el paquete con rutas relativas para el directorio FTP /PTB.',
    category: 'CORRECCIÓN',
    credits: 1,
    status: 'DESPLEGADO',
    createdAt: 'Hace 5 min',
    deliverable: '✔ Auditoría completada: 100% marca PaperTopBCN (PTB).\n✔ Configuración Vite con base relativa ("./") y archivo .htaccess listos para subir por FTP a la carpeta /PTB junto a tu instalación WordPress.\n✔ Paquete ZIP descargable disponible en la pestaña Inversiones & Dominio / FTP.',
  },
  {
    id: 'task-2',
    title: 'Aclarar qué recibe quien consulta un recurso en PaperTopBCN',
    description: '– En la ficha pública de PaperTopBCN, destacar junto a la descripción el formato PDF listo para imprimir (A4 y US Letter), guía pedagógica y plantilla editable en Canva.',
    category: 'FUNCIONALIDAD',
    credits: 1,
    status: 'PENDIENTE',
    createdAt: 'Hace 1 h',
  },
  {
    id: 'task-3',
    title: 'Comparar ofertas de recursos educativos digitales infantiles',
    description: '– Analizar Twinkl, Teachers Pay Teachers, Orientación Andújar y bestsellers de Amazon KDP para posicionar los packs descargables de PaperTopBCN.',
    category: 'INVESTIGACIÓN',
    credits: 1,
    status: 'PENDIENTE',
    createdAt: 'Hace 2 h',
  },
  {
    id: 'task-4',
    title: 'Seleccionar primeros segmentos para PaperTopBCN',
    description: '– Investigar y priorizar 3–5 segmentos: docentes de infantil y primaria, familias Montessori en casa, logopedas/terapeutas y compradores en Gumroad/KDP.',
    category: 'INVESTIGACIÓN',
    credits: 1,
    status: 'PENDIENTE',
    createdAt: 'Hace 2 h',
  },
  {
    id: 'task-5',
    title: 'Autopublicar tendencia diaria de Otoño Montessori en 5 redes',
    description: '– Generar y publicar hilo en X, carrusel en Instagram, Pin SEO en Pinterest y post educativo en Reddit enlazando al catálogo de Gumroad.',
    category: 'AUTOPUBLICACIÓN',
    credits: 1,
    status: 'PENDIENTE',
    createdAt: 'Hace 30 min',
  },
];

export const INITIAL_PORTALS: PortalConfig[] = [
  {
    id: 'gumroad',
    name: 'Gumroad',
    handle: 'papertopbcn.gumroad.com',
    category: 'MARKETPLACE',
    connected: true,
    autoPublish: true,
    dailySchedule: 'Sincronización continua',
    lastSync: 'En vivo',
    accentColor: '#FF90E8',
    description: 'Pasarela principal de descarga instantánea para cuadernos PDF, flashcards y packs de actividades infantiles.',
    interactionCapabilities: ['Subir / Actualizar Producto PDF', 'Crear Cupón de Descuento', 'Webhook de Pedidos en Tiempo Real', 'Upsell Automático en Checkout'],
    metrics: {
      followersOrItems: '18 productos activos',
      monthlyClicks: 6120,
      revenueEur: 1890.40,
      impressions: 74500,
      ctrPct: 8.21,
      avgTimeOnPageSec: 245,
      conversionRatePct: 6.42,
      ordersCount: 158,
    },
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    handle: '@papertopbcn',
    category: 'SOCIAL',
    connected: true,
    autoPublish: true,
    dailySchedule: '09:00 · 15:00 · 21:00 CET',
    lastSync: 'Hace 12 min',
    accentColor: '#E60023',
    description: 'Motor #1 de tráfico orgánico de madres, padres y docentes buscando fichas imprimibles, dibujos para colorear y actividades Montessori.',
    interactionCapabilities: ['Auto-Pin desde Catálogo', 'Optimizar SEO de Tableros Infantiles', 'Detectar Pines Virales del Día', 'Enlace Directo a Ficha Gumroad/Web'],
    metrics: {
      followersOrItems: '64.5k vistas/mes',
      monthlyClicks: 5290,
      revenueEur: 1120.80,
      impressions: 92400,
      ctrPct: 5.73,
      avgTimeOnPageSec: 198,
      conversionRatePct: 4.85,
      ordersCount: 96,
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@papertopbcn',
    category: 'SOCIAL',
    connected: true,
    autoPublish: true,
    dailySchedule: '12:30 · 20:00 CET',
    lastSync: 'Hace 8 min',
    accentColor: '#C13584',
    description: 'Carruseles demostrativos de cuadernos imprimibles, Reels de actividades para niños y automatización DM "QUIERO EL PDF".',
    interactionCapabilities: ['Publicar Carrusel / Reel', 'Auto-DM por Palabra Clave', 'Etiquetar Productos del Catálogo', 'Generar Hashtags Niños/Educación'],
    metrics: {
      followersOrItems: '8.920 seguidores',
      monthlyClicks: 4310,
      revenueEur: 985.00,
      impressions: 68200,
      ctrPct: 6.32,
      avgTimeOnPageSec: 176,
      conversionRatePct: 4.50,
      ordersCount: 82,
    },
  },
  {
    id: 'amazon_kdp',
    name: 'Amazon KDP',
    handle: 'PaperTopBCN Publishing',
    category: 'MARKETPLACE',
    connected: true,
    autoPublish: true,
    dailySchedule: 'Revisión diaria de BSR y Keywords',
    lastSync: 'Hace 18 min',
    accentColor: '#FF9900',
    description: 'Publicación de cuadernos de colorear, caligrafía y pasatiempos infantiles en formato físico (tapa blanda 8.5" x 11") sin inventario.',
    interactionCapabilities: ['Convertir PDF Infantil a Formato KDP', 'Optimizar 7 Cajones de Keywords KDP', 'Analizar BSR y Regalías en Tiempo Real'],
    metrics: {
      followersOrItems: '9 libros publicados',
      monthlyClicks: 3480,
      revenueEur: 845.20,
      impressions: 51000,
      ctrPct: 6.82,
      avgTimeOnPageSec: 212,
      conversionRatePct: 5.90,
      ordersCount: 85,
    },
  },
  {
    id: 'canva',
    name: 'Canva Studio',
    handle: 'PaperTopBCN Brand Hub',
    category: 'DISEÑO',
    connected: true,
    autoPublish: true,
    dailySchedule: 'Plantillas sincronizadas',
    lastSync: 'Hace 5 min',
    accentColor: '#00C4CC',
    description: 'Repositorio de plantillas infantiles editables, generación de mockups para fichas y exportación automática a PDF A4 / KDP.',
    interactionCapabilities: ['Sincronizar Link de Plantilla Editable', 'Exportar Interior PDF 300 DPI', 'Generar Mockup para Instagram/Pinterest'],
    metrics: {
      followersOrItems: '42 plantillas maestras',
      monthlyClicks: 2150,
      revenueEur: 540.00,
      impressions: 29800,
      ctrPct: 7.21,
      avgTimeOnPageSec: 290,
      conversionRatePct: 5.15,
      ordersCount: 48,
    },
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@papertopbcn',
    category: 'SOCIAL',
    connected: true,
    autoPublish: true,
    dailySchedule: '10:00 · 18:30 CET',
    lastSync: 'Hace 4 min',
    accentColor: '#141414',
    description: 'Hilos diarios sobre educación sin pantallas, creatividad infantil y enlaces directos a nuevos lanzamientos en Gumroad.',
    interactionCapabilities: ['Publicar Tweet / Hilo', 'Autopublicar Tendencia Diaria', 'Respuestas Automáticas con Link Gumroad', 'Sincronizar Bio'],
    metrics: {
      followersOrItems: '2.480 seguidores',
      monthlyClicks: 1840,
      revenueEur: 420.50,
      impressions: 38900,
      ctrPct: 4.73,
      avgTimeOnPageSec: 142,
      conversionRatePct: 3.65,
      ordersCount: 37,
    },
  },
  {
    id: 'reddit',
    name: 'Reddit',
    handle: 'u/PaperTopBCN',
    category: 'SOCIAL',
    connected: true,
    autoPublish: true,
    dailySchedule: '16:00 CET',
    lastSync: 'Hace 25 min',
    accentColor: '#FF4500',
    description: 'Participación de alto valor en comunidades educativas (r/Montessori, r/homeschool, r/Parenting, r/Teachers) compartiendo muestras gratuitas.',
    interactionCapabilities: ['Publicar Recurso Gratuito + Upsell', 'Monitorizar Subreddits de Educación', 'Responder Consultas de Padres/Maestros'],
    metrics: {
      followersOrItems: '4 comunidades clave',
      monthlyClicks: 1420,
      revenueEur: 310.00,
      impressions: 24600,
      ctrPct: 5.77,
      avgTimeOnPageSec: 264,
      conversionRatePct: 4.12,
      ordersCount: 29,
    },
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@papertopbcn.kids',
    category: 'SOCIAL',
    connected: true,
    autoPublish: true,
    dailySchedule: '19:30 CET',
    lastSync: 'Hace 15 min',
    accentColor: '#000000',
    description: 'Vídeos cenitales de manos recortando, plastificando y jugando con los imprimibles de PaperTopBCN con audios en tendencia.',
    interactionCapabilities: ['Generar Guion Cenital 15s', 'Autopublicar Vídeo Demostrativo', 'Sincronizar TikTok Shop / Bio Link'],
    metrics: {
      followersOrItems: '3.650 seguidores',
      monthlyClicks: 2890,
      revenueEur: 495.00,
      impressions: 84200,
      ctrPct: 3.43,
      avgTimeOnPageSec: 158,
      conversionRatePct: 3.95,
      ordersCount: 41,
    },
  },
];

export const INITIAL_SOCIAL_POSTS: SocialPostItem[] = [
  {
    id: 'post-1',
    portalId: 'x',
    portalName: 'X (Twitter)',
    handle: '@papertopbcn',
    content: 'El juego también puede abrir la puerta a nuevas ideas. En PaperTopBCN creamos actividades educativas y recursos creativos descargables para que los niños aprendan creando, en casa o en el aula. Sin esperar envíos; solo buenas ideas listas para imprimir y poner en marcha.',
    imageSuggestion: 'Fotografía cenital sobre mesa de madera clara con manos infantiles recortando tarjetas Montessori de otoño, tijeras escolares seguras y lápices de colores.',
    hashtags: ['#PaperTopBCN', '#MontessoriEnCasa', '#RecursosEducativos', '#ImprimiblesNiños', '#EducacionInfantil'],
    scheduledFor: '2026-10-04 10:03',
    timestamp: '10:03 · 4 OCT 2026',
    status: 'PUBLICADO',
    trendSource: 'Aprendizaje manipulativo sin pantallas',
    metrics: { impressions: 1420, clicks: 84, ctrPct: 5.9, conversions: 7 },
  },
  {
    id: 'post-2',
    portalId: 'instagram',
    portalName: 'Instagram',
    handle: '@papertopbcn',
    content: '🍂 ¿Tarde lluviosa en casa? Nuevo Pack Montessori de Otoño de PaperTopBCN (120 páginas listas para imprimir en A4). Incluye conteo con hojas, trazos pre-escritura, recortables y memoria visual. Comenta "OTOÑO" y nuestro bot te envía el acceso directo a Gumroad.',
    imageSuggestion: 'Carrusel 4:5 de 5 diapositivas: Portada con mockup 3D del cuaderno Montessori + 3 páginas interiores impresas con gomets y velcro + llamada a la acción final.',
    hashtags: ['#ActividadesParaNiños', '#ImprimiblesInfantiles', '#MontessoriEspaña', '#PaperTopBCN', '#AprenderJugando'],
    scheduledFor: '2026-10-04 12:30',
    timestamp: '12:30 · 4 OCT 2026',
    status: 'PUBLICADO',
    trendSource: 'Actividades sensoriales de otoño (+210%)',
    metrics: { impressions: 3890, clicks: 245, ctrPct: 6.3, conversions: 19 },
  },
  {
    id: 'post-3',
    portalId: 'pinterest',
    portalName: 'Pinterest',
    handle: '@papertopbcn',
    content: 'Fichas Imprimibles de Gestión Emocional para Niños (3-8 Años) | Rincón de la Calma Montessori en PDF y Editable en Canva | PaperTopBCN Recursos Educativos.',
    imageSuggestion: 'Pin vertical 2:3 con tipografía grande arriba "Rincón de la Calma Imprimible", mostrando la rueda de las emociones y tarjetas de respiración.',
    hashtags: ['#RinconDeLaCalma', '#EducacionEmocional', '#FichasImprimibles', '#MaterialDocente', '#PaperTopBCN'],
    scheduledFor: '2026-10-04 18:00',
    timestamp: '18:00 · 4 OCT 2026',
    status: 'PROGRAMADO',
    trendSource: 'Rincón de la calma aula infantil',
    metrics: { impressions: 5120, clicks: 310, ctrPct: 6.05, conversions: 24 },
  },
  {
    id: 'post-4',
    portalId: 'tiktok',
    portalName: 'TikTok',
    handle: '@papertopbcn.kids',
    content: 'POV: Cambias 30 minutos de dibujos en la tablet por este Busy Book de viajes imprimible de PaperTopBCN. Solo imprimir, poner velcro adhesivo y listo para el restaurante o el avión ✈️🧩',
    imageSuggestion: 'Vídeo vertical 9:16 de 15s (solo manos, sin mostrar caras): imprimiendo las hojas a color, pegando círculos de velcro transparente y colocando las piezas de dinosaurios.',
    hashtags: ['#BusyBook', '#CrianzaSinPantallas', '#ActividadesNiños3Años', '#PaperTopBCN', '#TikTokFamilias'],
    scheduledFor: '2026-10-04 19:30',
    timestamp: '19:30 · 4 OCT 2026',
    status: 'PENDIENTE_APROBACIÓN',
    trendSource: 'Busy Books de viaje con velcro (+280%)',
    metrics: { impressions: 0, clicks: 0, ctrPct: 0, conversions: 0 },
  },
];

export const INITIAL_CATALOG: CatalogProduct[] = [
  {
    id: 'prod-1',
    sku: 'PTB-001',
    title: 'Pack Mega Montessori Otoño & Bosque (120 Págs PDF + Canva)',
    category: 'Cuadernos Montessori',
    ageRange: '3–6 años',
    priceEur: 12.90,
    formats: ['PDF A4', 'PDF US Letter', 'Plantilla Canva'],
    portals: ['Gumroad', 'Pinterest', 'Instagram', 'Canva'],
    salesCount: 164,
    revenueEur: 2115.60,
    status: 'TENDENCIA',
    gumroadSlug: 'papertopbcn.gumroad.com/l/montessori-otono',
    canvaTemplateUrl: 'canva.com/papertopbcn/otono-editable',
    previewColor: '#FEF3C7',
    previewIconType: 'montessori',
  },
  {
    id: 'prod-2',
    sku: 'PTB-002',
    title: 'Busy Book Imprimible: Viajes y Restaurantes Sin Pantallas',
    category: 'Cuadernos Montessori',
    ageRange: '2–5 años',
    priceEur: 14.50,
    formats: ['PDF Recortable Velcro', 'Guía de Montaje'],
    portals: ['Gumroad', 'Instagram', 'Pinterest', 'TikTok'],
    salesCount: 192,
    revenueEur: 2784.00,
    status: 'ACTIVO',
    gumroadSlug: 'papertopbcn.gumroad.com/l/busybook-viajes',
    previewColor: '#DBEAFE',
    previewIconType: 'busybook',
  },
  {
    id: 'prod-3',
    sku: 'PTB-003',
    title: 'Gran Libro de Colorear y Trazos: Dinosaurios y Espacio (Edición KDP)',
    category: 'Colorear KDP',
    ageRange: '4–8 años',
    priceEur: 9.95,
    formats: ['Interior KDP 8.5x11"', 'Cubierta 300 DPI', 'PDF Casa'],
    portals: ['Amazon KDP', 'Gumroad'],
    salesCount: 118,
    revenueEur: 1174.10,
    status: 'TENDENCIA',
    kdpAsin: 'B0DK9PAPER',
    gumroadSlug: 'papertopbcn.gumroad.com/l/dinos-colorear',
    previewColor: '#DCFCE7',
    previewIconType: 'dinosaur',
  },
  {
    id: 'prod-4',
    sku: 'PTB-004',
    title: 'Flashcards Bilingües ES/EN: Emociones, Animales y Rutinas Diarias',
    category: 'Flashcards Imprimibles',
    ageRange: '2–7 años',
    priceEur: 7.90,
    formats: ['PDF Tarjetas 4xHoja', 'Editable Canva'],
    portals: ['Gumroad', 'Canva', 'Pinterest', 'Reddit'],
    salesCount: 230,
    revenueEur: 1817.00,
    status: 'ACTIVO',
    gumroadSlug: 'papertopbcn.gumroad.com/l/flashcards-bilingues',
    canvaTemplateUrl: 'canva.com/papertopbcn/flashcards-es-en',
    previewColor: '#FCE7F3',
    previewIconType: 'flashcards',
  },
  {
    id: 'prod-5',
    sku: 'PTB-005',
    title: 'Kit Rincón de la Calma: Rueda de Emociones y Respiración Infantil',
    category: 'Juegos de Aula',
    ageRange: '3–10 años',
    priceEur: 11.00,
    formats: ['Pósters A3/A4', 'Tarjetas de Calma', 'Guía Docente'],
    portals: ['Gumroad', 'X (Twitter)', 'Instagram', 'Pinterest'],
    salesCount: 145,
    revenueEur: 1595.00,
    status: 'ACTIVO',
    gumroadSlug: 'papertopbcn.gumroad.com/l/rincon-calma',
    previewColor: '#EDE9FE',
    previewIconType: 'emotions',
  },
  {
    id: 'prod-6',
    sku: 'PTB-006',
    title: 'Pack Matemático Manipulativo: Decenas, Regletas y Tiendecita',
    category: 'Juegos de Aula',
    ageRange: '5–9 años',
    priceEur: 10.50,
    formats: ['PDF A4 Imprimible', 'Billetes de Juego', 'Plantilla Canva'],
    portals: ['Gumroad', 'Canva', 'Amazon KDP'],
    salesCount: 84,
    revenueEur: 882.00,
    status: 'ACTIVO',
    gumroadSlug: 'papertopbcn.gumroad.com/l/mates-tiendecita',
    previewColor: '#FFEDD5',
    previewIconType: 'math',
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    orderNumber: '#PTB-4892',
    customerId: 'cust-1',
    customerName: 'Laura Puigvert (Escuela BCN)',
    customerEmail: 'laura.puigvert@escolabcn.cat',
    productTitle: 'Pack Mega Montessori Otoño & Bosque (120 Págs PDF + Canva)',
    portal: 'Gumroad',
    amountEur: 12.90,
    status: 'ENTREGADO_PDF',
    createdAt: 'Hace 6 min',
    dateIso: '2026-10-04',
    country: 'ES',
  },
  {
    id: 'ord-102',
    orderNumber: '#PTB-4891',
    customerId: 'cust-2',
    customerName: 'Marta Gómez',
    customerEmail: 'mgomez.familia@gmail.com',
    productTitle: 'Busy Book Imprimible: Viajes y Restaurantes Sin Pantallas',
    portal: 'Instagram Shop',
    amountEur: 14.50,
    status: 'ENTREGADO_PDF',
    createdAt: 'Hace 22 min',
    dateIso: '2026-10-04',
    country: 'ES',
  },
  {
    id: 'ord-103',
    orderNumber: '#PTB-4890',
    customerId: 'cust-3',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins.homeschool@outlook.com',
    productTitle: 'Gran Libro de Colorear y Trazos: Dinosaurios y Espacio (Edición KDP)',
    portal: 'Amazon KDP',
    amountEur: 9.95,
    status: 'PROCESANDO_KDP',
    createdAt: 'Hace 49 min',
    dateIso: '2026-10-04',
    country: 'US',
  },
  {
    id: 'ord-104',
    orderNumber: '#PTB-4889',
    customerId: 'cust-4',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos.mendoza.edu@gmail.com',
    productTitle: 'Flashcards Bilingües ES/EN: Emociones, Animales y Rutinas Diarias',
    portal: 'Canva Hub',
    amountEur: 7.90,
    status: 'PLANTILLA_CANVA_ENVIADA',
    createdAt: 'Hace 1 h',
    dateIso: '2026-10-03',
    country: 'MX',
  },
  {
    id: 'ord-105',
    orderNumber: '#PTB-4888',
    customerId: 'cust-5',
    customerName: 'Elena Vallés',
    customerEmail: 'elena.valles@yahoo.es',
    productTitle: 'Kit Rincón de la Calma: Rueda de Emociones y Respiración Infantil',
    portal: 'Pinterest',
    amountEur: 11.00,
    status: 'ENTREGADO_PDF',
    createdAt: 'Hace 2 h',
    dateIso: '2026-10-02',
    country: 'ES',
  },
];

export const INITIAL_CRM_CUSTOMERS: CrmCustomer[] = [
  {
    id: 'cust-1',
    name: 'Laura Puigvert',
    email: 'laura.puigvert@escolabcn.cat',
    phone: '+34 612 884 192',
    organizationOrRole: 'Coordinadora Infantil · Escola BCN',
    country: 'ES',
    segment: 'COLEGIOS_DOCENTES',
    acquisitionChannel: 'Gumroad',
    totalSpentEur: 64.50,
    ordersCount: 5,
    lastPurchaseDate: '2026-10-04',
    favoriteCategory: 'Cuadernos Montessori',
    tags: ['Licencia Aula', 'Catalunya', 'Infantil 3-6', 'Canva Editable'],
    notes: 'Compra packs estacionales cada trimestre para 4 aulas de infantil. Muy interesada en licencias escolares anuales.',
    interactions: [
      {
        id: 'int-1',
        type: 'SOPORTE_PDF',
        summary: 'Descarga verificada del Pack Mega Montessori Otoño (#PTB-4892) + enlace de plantilla Canva enviado.',
        channel: 'Gumroad Webhook',
        timestamp: '04 Oct 2026 · 10:15',
      },
      {
        id: 'int-2',
        type: 'EMAIL',
        summary: 'Solicitó factura para el colegio y consultó disponibilidad de versión en catalán/inglés.',
        channel: 'hola@papertopbcn.com',
        timestamp: '29 Sep 2026 · 16:40',
      },
    ],
  },
  {
    id: 'cust-2',
    name: 'Marta Gómez',
    email: 'mgomez.familia@gmail.com',
    phone: '+34 678 331 094',
    organizationOrRole: 'Madre de 2 peques (3 y 5 años)',
    country: 'ES',
    segment: 'VIP_RECURRENTE',
    acquisitionChannel: 'Instagram',
    totalSpentEur: 49.20,
    ordersCount: 4,
    lastPurchaseDate: '2026-10-04',
    favoriteCategory: 'Cuadernos Montessori',
    tags: ['Busy Books', 'Sin Pantallas', 'Instagram Auto-DM'],
    notes: 'Llegó a través de un Reel de Instagram comentando "OTOÑO". Ha comprado 3 Busy Books y el tablero de rutinas.',
    interactions: [
      {
        id: 'int-3',
        type: 'REDES_SOCIALES',
        summary: 'Comentó "VIAJE" en Instagram Reel; el bot de PaperTopBCN le envió el link directo al Busy Book.',
        channel: 'Instagram (@papertopbcn)',
        timestamp: '04 Oct 2026 · 09:50',
      },
    ],
  },
  {
    id: 'cust-3',
    name: 'Sarah Jenkins',
    email: 's.jenkins.homeschool@outlook.com',
    phone: '+1 512 490 8821',
    organizationOrRole: 'Homeschool Educator & Mom',
    country: 'US',
    segment: 'COMPRADORES_KDP_GUMROAD',
    acquisitionChannel: 'Amazon KDP',
    totalSpentEur: 32.85,
    ordersCount: 3,
    lastPurchaseDate: '2026-10-04',
    favoriteCategory: 'Colorear KDP',
    tags: ['US Letter', 'Bilingüe EN/ES', 'Amazon KDP'],
    notes: 'Compra tanto nuestros libros impresos en Amazon KDP como las flashcards bilingües en Gumroad.',
    interactions: [
      {
        id: 'int-4',
        type: 'CAMPANA_IA',
        summary: 'El Agente IA de PaperTopBCN le envió cupón de 15% para el pack de Flashcards Bilingües tras su pedido en KDP.',
        channel: 'Email Automatizado',
        timestamp: '04 Oct 2026 · 08:30',
      },
    ],
  },
  {
    id: 'cust-4',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza.edu@gmail.com',
    phone: '+52 55 4192 3301',
    organizationOrRole: 'Maestro de Primaria y Psicopedagogo',
    country: 'MX',
    segment: 'COLEGIOS_DOCENTES',
    acquisitionChannel: 'Reddit',
    totalSpentEur: 29.80,
    ordersCount: 3,
    lastPurchaseDate: '2026-10-03',
    favoriteCategory: 'Flashcards Imprimibles',
    tags: ['r/Teachers', 'Psicopedagogía', 'Plantillas Canva'],
    notes: 'Nos conoció por una muestra gratuita en Reddit. Utiliza las plantillas de Canva para personalizar tarjetas para su gabinete.',
    interactions: [
      {
        id: 'int-5',
        type: 'SOPORTE_PDF',
        summary: 'Acceso enviado al Hub de Plantillas Canva de Flashcards Bilingües (#PTB-4889).',
        channel: 'Canva Hub',
        timestamp: '03 Oct 2026 · 19:12',
      },
    ],
  },
  {
    id: 'cust-5',
    name: 'Elena Vallés',
    email: 'elena.valles@yahoo.es',
    phone: '+34 644 910 215',
    organizationOrRole: 'Familia Montessori en Casa',
    country: 'ES',
    segment: 'FAMILIAS_MONTESSORI',
    acquisitionChannel: 'Pinterest',
    totalSpentEur: 23.90,
    ordersCount: 2,
    lastPurchaseDate: '2026-10-02',
    favoriteCategory: 'Juegos de Aula',
    tags: ['Pinterest Pin', 'Rincón de la Calma', 'Educación Emocional'],
    notes: 'Guarda casi todos nuestros pines de educación emocional y crianza respetuosa en Pinterest.',
    interactions: [
      {
        id: 'int-6',
        type: 'EMAIL',
        summary: 'Recibió la guía PDF de montaje del Rincón de la Calma y dejó valoración de 5 estrellas en Gumroad.',
        channel: 'Gumroad',
        timestamp: '02 Oct 2026 · 17:20',
      },
    ],
  },
];

export const INITIAL_TRENDS: TrendItem[] = [
  {
    id: 'trend-1',
    title: 'Cuadernos de Actividades de Otoño y Halloween Amigable (Sin Sustos)',
    growthBadge: '+240% hoy en Pinterest & Gumroad',
    sourcePlatform: 'Pinterest / Gumroad',
    whyItWorks: 'Padres y docentes de infantil buscan imprimibles temáticos de octubre con calabazas simpáticas, conteo de hojas y laberintos listos para imprimir en 2 minutos.',
    recommendedProductIdea: 'Mini-Pack "Halloween Dulce Montessori" (35 páginas PDF + plantilla Canva)',
    autoPosts: {
      x: '🎃 Octubre es el mes perfecto para aprender jugando en casa. En PaperTopBCN hemos preparado actividades de otoño y calabazas simpáticas para niños de 3 a 6 años: trazos, tijeras y conteo sin pantallas. Descarga inmediata en Gumroad 👇 https://papertopbcn.com',
      instagram: '🍁✨ ¡Aprender jugando esta semana! Desliza para ver las fichas de Otoño Sensorial de PaperTopBCN. Imprime en casa todas las veces que quieras. Comenta "HOJAS" y te enviamos el enlace directo.',
      pinterest: 'Cuaderno Imprimible de Otoño y Calabazas para Niños 3-6 Años | Fichas Montessori Preescritura y Matemáticas en PDF | PaperTopBCN',
      reddit: 'Hemos diseñado 5 láminas gratuitas de recorte con tijeras y simetría de hojas de otoño para peques de 3 a 5 años en PaperTopBCN. ¿Qué destreza estáis trabajando esta semana en casa o en el aula?',
      tiktok: '[Vídeo cenital 15s] Imprimiendo el nuevo cuaderno de otoño de PaperTopBCN + plastificando las tarjetas de hojas con velcro. Link en bio para descargar el PDF al instante.',
    },
    richDrafts: {
      x: {
        postText: '🎃 Octubre es el mes perfecto para aprender jugando en casa. En PaperTopBCN hemos preparado actividades de otoño y calabazas simpáticas para niños de 3 a 6 años: trazos, tijeras y conteo sin pantallas. Descarga inmediata 👇 https://papertopbcn.com',
        imageSuggestion: 'Composición plana (flat-lay) de 4 hojas A4 impresas con calabazas sonrientes, hojas de otoño para recortar con línea punteada y tijeras infantiles.',
        hashtags: ['#PaperTopBCN', '#MontessoriEnCasa', '#ActividadesOtoño', '#ImprimiblesNiños'],
        bestTime: '10:00 CET',
      },
      instagram: {
        postText: '🍁✨ ¡Tarde de otoño sin pantallas! Desliza para ver por dentro nuestro Pack Montessori de Otoño y Halloween Amigable (120 páginas PDF + editable en Canva). Comenta "OTOÑO" y te enviamos el link directo por DM.',
        imageSuggestion: 'Carrusel 4:5 en luz natural cálida: portada del cuaderno en iPad + hojas impresas sobre mesa de pino con ceras gruesas.',
        hashtags: ['#ImprimiblesInfantiles', '#RecursosEducativos', '#MontessoriEspaña', '#PaperTopBCN', '#CrianzaCreativa'],
        bestTime: '12:30 CET',
      },
      pinterest: {
        postText: 'Cuaderno Imprimible de Otoño y Halloween Sin Sustos para Niños (3-6 Años) | Fichas Montessori de Preescritura, Tijeras y Conteo en PDF A4 | PaperTopBCN',
        imageSuggestion: 'Pin vertical 1000x1500px con banda superior editorial "120 FICHAS IMPRIMIBLES DE OTOÑO" y abanico de 6 páginas de actividades infantiles.',
        hashtags: ['#FichasInfantil', '#MontessoriImprimible', '#ActividadesPreescolar', '#PaperTopBCN'],
        bestTime: '15:00 CET',
      },
      tiktok: {
        postText: 'Imprimiendo en 1 minuto las actividades de otoño favoritas de mis peques 🍂✂️ Sin envíos, descargas el PDF en PaperTopBCN y listo para jugar toda la tarde.',
        imageSuggestion: 'Vídeo 9:16 cenital rápido (3 cortes): saliendo las hojas a color de la impresora, niño recortando una bellota por la línea de puntos y pegándola.',
        hashtags: ['#ActividadesParaNiños', '#BusyBook', '#MadresTikTok', '#PaperTopBCN', '#EducacionInfantil'],
        bestTime: '19:30 CET',
      },
    },
  },
  {
    id: 'trend-2',
    title: 'Rutinas Visuales Imprimibles con Velcro para Mañanas sin Rabietas',
    growthBadge: '+185% en Instagram Reels & Reddit',
    sourcePlatform: 'Instagram / r/Parenting',
    whyItWorks: 'El dolor #1 de las familias con niños de 2 a 6 años es el caos antes de ir al colegio. Los tableros visuales con pictogramas tienen altísima conversión inmediata.',
    recommendedProductIdea: 'Tablero Magnético/Velcro "Mi Mañana y Mi Noche Autónoma" (Bilingüe ES/EN + Editable en Canva)',
    autoPosts: {
      x: '¿Mañanas caóticas antes del cole? ⏰ Cuando los niños ven su rutina en imágenes y pueden mover cada tarjeta a "¡Hecho!", ganan autonomía y seguridad. Descubre el tablero imprimible de PaperTopBCN:',
      instagram: '🌞 Adiós a repetir 20 veces "lávate los dientes y ponte los zapatos". Mira cómo funciona el Tablero de Rutinas Visuales de PaperTopBCN (editable en Canva con el nombre de tu peque).',
      pinterest: 'Tablero de Rutinas Diarias para Niños Imprimible PDF | Pictogramas Montessori Mañana y Noche Editables en Canva | PaperTopBCN',
      reddit: 'Para quienes buscáis tableros de rutinas visuales limpios y sin exceso de estímulos: en PaperTopBCN hemos creado una versión minimalista editable en Canva para adaptar horarios de cada familia.',
      tiktok: '[POV] Cómo pasamos de 40 minutos de peleas por la mañana a que mi hijo de 4 años siga solito su tablero de rutinas de PaperTopBCN.',
    },
    richDrafts: {
      x: {
        postText: '¿Mañanas caóticas antes del cole? ⏰ Cuando los niños ven su rutina en pictogramas y mueven cada tarjeta a "¡Hecho!", ganan autonomía sin gritos. Descarga el tablero editable de PaperTopBCN:',
        imageSuggestion: 'Fotografía de detalle de un tablero plastificado A4 con columnas "Por hacer" y "¡Hecho!" con tarjetas de velcro de cepillo de dientes, desayuno y mochila.',
        hashtags: ['#RutinasInfantiles', '#CrianzaRespetuosa', '#Montessori', '#PaperTopBCN'],
        bestTime: '08:45 CET',
      },
      instagram: {
        postText: '🌞 Adiós a repetir 20 veces "ponte los zapatos". Con el Tablero de Rutinas Visuales de PaperTopBCN tu peque lleva el control de su mañana jugando. Editable en Canva e imprimible en casa.',
        imageSuggestion: 'Reel o Carrusel comparativo "Antes (estrés matutino) vs Después (peque moviendo su tarjeta de velcro con orgullo)".',
        hashtags: ['#RutinasMontessori', '#PictogramasInfantiles', '#MaternidadReal', '#PaperTopBCN'],
        bestTime: '13:00 CET',
      },
      pinterest: {
        postText: 'Tablero de Rutinas Diarias para Niños Imprimible PDF y Editable en Canva | Pictogramas Montessori Mañana y Noche | PaperTopBCN',
        imageSuggestion: 'Infografía vertical mostrando las 24 tarjetas de rutinas incluidas (baño, dientes, cuento, recoger juguetes, vestirse).',
        hashtags: ['#TableroDeRutinas', '#AutonomiaInfantil', '#Pictogramas', '#PaperTopBCN'],
        bestTime: '20:30 CET',
      },
      tiktok: {
        postText: 'El truco Montessori que nos salvó las mañanas antes del cole 🙌 Imprimible en PDF y editable en Canva desde PaperTopBCN.',
        imageSuggestion: 'Vídeo de 12s pegando puntos de velcro adhesivo en las tarjetas de rutina y probando el sonido "crunch" al pasarlas a la columna "¡Completado!".',
        hashtags: ['#TipsMaternidad', '#RutinaNiños', '#MontessoriEnCasa', '#PaperTopBCN'],
        bestTime: '21:00 CET',
      },
    },
  },
  {
    id: 'trend-3',
    title: 'Libros "Bold & Easy" de Colorear Trazo Grueso en Amazon KDP',
    growthBadge: '+310% BSR en Amazon KDP',
    sourcePlatform: 'Amazon KDP / TikTok',
    whyItWorks: 'Los dibujos de línea gruesa y formas grandes evitan la frustración en niños pequeños (2-5 años) y dominan el Top 100 de Amazon KDP este mes.',
    recommendedProductIdea: 'Libro KDP + PDF "Mis Primeros 100 Dibujos de Trazo Grueso: Animales y Vehículos"',
    autoPosts: {
      x: '¿Sabías por qué los niños de 2 a 4 años se frustran con los libros de colorear clásicos? Tienen demasiados detalles pequeños. En PaperTopBCN diseñamos láminas "Bold & Easy" de trazo grueso para potenciar su motricidad fina.',
      instagram: '🖍️ ¡Trazo grueso = niños felices coloreando! Nuevo lanzamiento de PaperTopBCN disponible tanto en PDF descargable en Gumroad como en libro físico por Amazon KDP.',
      pinterest: 'Dibujos para Colorear Trazo Grueso Niños 2 3 4 Años | Libro Bold and Easy Infantil PDF y Amazon KDP | PaperTopBCN',
      reddit: 'Tip para peques que empiezan con ceras: los dibujos con bordes de 4pt-5pt les ayudan muchísimo a distinguir el contorno. Aquí tenéis muestras de nuestra serie Bold & Easy de PaperTopBCN.',
      tiktok: 'Probando ceras acuarelables sobre nuestro nuevo libro de colorear Bold & Easy de PaperTopBCN disponible en Amazon KDP y Gumroad.',
    },
    richDrafts: {
      x: {
        postText: '¿Por qué los peques de 2 a 4 años se frustran coloreando? Porque los dibujos tienen detalles diminutos. En PaperTopBCN hemos lanzado la colección "Bold & Easy" de trazo ultra grueso (en PDF Gumroad y físico en Amazon KDP) 🖍️🦖',
        imageSuggestion: 'Comparativa lado a lado: dibujo complejo tradicional vs dibujo Bold & Easy de PaperTopBCN con un dinosaurio simpático de línea gruesa.',
        hashtags: ['#AmazonKDP', '#LibrosParaColorear', '#MotricidadFina', '#PaperTopBCN'],
        bestTime: '11:15 CET',
      },
      instagram: {
        postText: '🖍️✨ ¡Sin salirse de la raya y ganando confianza! Nuestro nuevo libro Bold & Easy ya está disponible para imprimir hoy mismo en Gumroad o recibir en tapa blanda por Amazon KDP.',
        imageSuggestion: 'Foto luminosa de mano infantil coloreando un cohete espacial de línea gruesa con ceras pastel sin esfuerzo.',
        hashtags: ['#ColorearNiños', '#BoldAndEasy', '#Actividades2Años', '#PaperTopBCN'],
        bestTime: '17:30 CET',
      },
      pinterest: {
        postText: '100 Dibujos para Colorear de Trazo Grueso (Bold & Easy) para Niños de 2 a 5 Años | Descarga PDF o Libro Amazon KDP | PaperTopBCN',
        imageSuggestion: 'Mosaico vertical con 8 ilustraciones de trazo grueso (león, excavadora, dinosaurio, submarino) y sello "PDF + AMAZON KDP".',
        hashtags: ['#DibujosParaColorear', '#ImprimiblesGratis', '#Preescolar', '#PaperTopBCN'],
        bestTime: '16:00 CET',
      },
      tiktok: {
        postText: 'Coloreando con rotuladores gorditos nuestro nuevo cuaderno Bold & Easy de PaperTopBCN 🦕 Disponible en PDF y en Amazon KDP.',
        imageSuggestion: 'Vídeo ASMR satisfactorio coloreando un dinosaurio de línea gruesa en 10 segundos.',
        hashtags: ['#ColoringBook', '#KDPBooks', '#ActividadesInfantiles', '#PaperTopBCN'],
        bestTime: '20:00 CET',
      },
    },
  },
];

export const INITIAL_SUGGESTIONS: GrowthSuggestion[] = [
  {
    id: 'sug-1',
    title: 'Doble Monetización Automática: Cada PDF de Gumroad → Libro Físico en Amazon KDP',
    impact: '+38% ingresos pasivos mensuales (€650–€1.100/mes extra)',
    channel: 'Amazon KDP + Gumroad',
    recommendation: 'Tus cuadernos descargables en Gumroad ya tienen el diseño listo. El Agente IA de PaperTopBCN puede adaptar las dimensiones a 8.5" x 11" con sangría para publicarlos en Amazon KDP como libros en tapa blanda y capturar compradores de Amazon.',
    automationPrompt: 'Adapta nuestros 3 productos más vendidos del catálogo de Gumroad al formato de Amazon KDP (8.5x11 pulgadas), genera sus 7 keywords KDP y crea las tareas de publicación.',
    implemented: false,
  },
  {
    id: 'sug-2',
    title: 'Embudo "Muestra Gratis de 3 Páginas" en Pinterest y Reddit con Upsell al Pack Completo',
    impact: '+2.4x conversión de visitas a clientes en papertopbcn.com',
    channel: 'Pinterest + Reddit + Gumroad',
    recommendation: 'Los pines de Pinterest que ofrecen "3 Fichas Gratis Imprimibles" reciben un 190% más de clics. En la última página del PDF gratuito incluimos un código QR y cupón del 20% hacia el Mega Pack de PaperTopBCN en Gumroad.',
    automationPrompt: 'Crea una campaña automática de muestra gratuita en Pinterest y Reddit para el Pack Montessori de Otoño y programa los posts de hoy.',
    implemented: false,
  },
  {
    id: 'sug-3',
    title: 'Activar TikTok e Instagram Reels con Vídeos Cenitales "Manos Imprimiendo y Jugando"',
    impact: '+15.000 impresiones orgánicas semanales',
    channel: 'TikTok + Instagram + Canva',
    recommendation: 'Las cuentas de recursos infantiles que muestran únicamente las manos recortando y usando velcro sobre mesa clara logran viralidad sin mostrar rostros de niños. El Agente IA genera los guiones de 15 segundos cada mañana según la tendencia del día.',
    automationPrompt: 'Activa el portal de TikTok para PaperTopBCN y autopublica hoy un guion y post para nuestro Busy Book de viajes sin pantallas.',
    implemented: false,
  },
  {
    id: 'sug-4',
    title: 'Licencia Escolar / Pack Aula para Colegios y Docentes de Primaria',
    impact: 'Ticket medio de €12.90 → €39.00 por pedido B2B',
    channel: 'Catálogo PaperTopBCN + Correo Prospección',
    recommendation: 'Añadir una variante "Licencia Aula (Hasta 30 alumnos + Plantillas Canva editables para el maestro)" en cada producto de Gumroad y activar la prospección por correo a colegios y AMPAs.',
    automationPrompt: 'Añade al catálogo un Pack Licencia Escolar para Colegios a €39 y crea una tarea de prospección para docentes.',
    implemented: false,
  },
];

export const INITIAL_DOCUMENTS: PolsiaDocument[] = [
  {
    id: 'doc-1',
    title: 'PaperTopBCN — Perfil de la empresa',
    updatedAgo: 'HACE 5 MIN',
    category: 'IDENTIDAD',
    content: `# PaperTopBCN — Perfil Oficial de la Empresa

**Dominio Principal:** https://papertopbcn.com
**Directorio FTP Activo:** /PTB (https://papertopbcn.com/PTB)
**Sede & Inspiración:** Barcelona (Diseño editorial pedagógico para familias y escuelas).
**Especialidad:** Productos digitales educativos, creativos e imprimibles para niños de 2 a 10 años.

## Propuesta de Valor Única
En PaperTopBCN transformamos el tiempo frente a las pantallas en momentos de juego manipulativo, curiosidad y autonomía. Todos nuestros recursos están listos para descargar e imprimir al instante en casa o en el aula (PDF A4 / US Letter), editar en Canva o recibir impresos vía Amazon KDP.`,
  },
  {
    id: 'doc-2',
    title: 'Hoja de ruta del producto',
    updatedAgo: 'HACE 1 H',
    category: 'ESTRATEGIA',
    content: `# Hoja de Ruta del Producto — PaperTopBCN (Q4 2026)

1. **Identidad 100% PaperTopBCN y Despliegue en /PTB (Completado)**
2. **Automatización Diaria de Tendencias (Activo)**
3. **Expansión Catálogo Bilingüe (ES / EN / CAT)**
4. **Canal Colegios y Licencias de Aula**`,
  },
];

export const INITIAL_CHAT_FEED: ChatFeedItem[] = [
  {
    id: 'chat-1',
    type: 'USER_MESSAGE',
    text: 'Quita todas las referencias externas de nombre y deja el proyecto 100% como PaperTopBCN preparado para subir por FTP al directorio /PTB.',
    timestamp: '12:40',
  },
  {
    id: 'chat-2',
    type: 'AI_THOUGHT_RESPONSE',
    thinkingSeconds: 4,
    text: 'He eliminado todas las referencias de nombre externas: todo el sistema, correos, agentes y metadatos operan exclusivamente bajo **PaperTopBCN (PTB)**. Además, he configurado la compilación con rutas relativas (`./`) y `.htaccess` para que puedas subirlo directamente por FTP a tu carpeta **`/PTB`** en FileZilla o sincronizarlo con GitHub.',
    actionLinkText: 'Abrir Descarga ZIP para FTP (/PTB) →',
    actionTaskId: 'task-1',
    timestamp: '12:41',
  },
];

export const INITIAL_DOMAIN_CONFIG: DomainConfig = {
  customDomain: 'https://papertopbcn.com/PTB',
  ftpDirectory: '/PTB',
  sslActive: true,
  dnsVerified: true,
  autoDeployChanges: true,
  brandTagline: 'Productos digitales educativos y recursos creativos imprimibles para niños',
  supportEmail: 'hola@papertopbcn.com',
};
