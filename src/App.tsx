/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TASKS,
  INITIAL_PORTALS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_CATALOG,
  INITIAL_ORDERS,
  INITIAL_TRENDS,
  INITIAL_SUGGESTIONS,
  INITIAL_DOCUMENTS,
  INITIAL_CHAT_FEED,
  INITIAL_DOMAIN_CONFIG,
  INITIAL_CRM_CUSTOMERS,
  PolsiaTask,
  PortalConfig,
  SocialPostItem,
  CatalogProduct,
  OrderItem,
  TrendItem,
  GrowthSuggestion,
  PolsiaDocument,
  ChatFeedItem,
  DomainConfig,
  CrmCustomer,
  CrmInteraction,
} from './data/initialData';
import { CatalogOrdersView } from './components/CatalogOrdersView';
import { PortalsTrendsView } from './components/PortalsTrendsView';
import { AnalyticsGrowthView } from './components/AnalyticsGrowthView';
import { CrmManagerView } from './components/CrmManagerView';
import { InvestmentsDomainView } from './components/InvestmentsDomainView';
import {
  AutonomousContentFactoryView,
  ActionAlertItem,
} from './components/AutonomousContentFactoryView';
import { getApiUrl } from './utils/api';
import {
  Search,
  Bell,
  Bot,
  Activity,
  Sparkles,
  ShoppingBag,
  Users,
  BarChart3,
  Wallet,
  CheckCircle2,
  Play,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Code2,
  Plus,
  Send,
  Zap,
  Moon,
  RefreshCw,
  Layers,
  Globe,
  FileText,
  X,
} from 'lucide-react';

type WorkspaceSection =
  | 'AGENT_FLOW'
  | 'CONTENT_FACTORY'
  | 'CONTENT_STUDIO'
  | 'CATALOG_ORDERS'
  | 'CRM_CUSTOMERS'
  | 'ADVANCED_ANALYTICS'
  | 'INVESTMENTS_DOMAIN';

const INITIAL_ACTION_ALERTS: ActionAlertItem[] = [
  {
    id: 'alert-init-1',
    assetTitle: 'Cuaderno Montessori de Otoño: Conteo, Trazos, Tijeras y Emociones (3–6 años)',
    recommendedFileNameBase: 'PTB_01_Cuaderno_Montessori_Otono_3_6_Anos',
    formatType: 'PDF_IMPRIMIBLE',
    ageRange: '3–6 años',
    suggestedPriceEur: 11.9,
    createdAt: 'Hoy · 09:40',
    approvalStatus: 'PENDIENTE_OK',
    autonomousSummary:
      'El Agente IA de PaperTopBCN ha redactado los ejercicios pedagógicos y el Motor de Maquetación ha montado las 4 láminas A4 y 8.5x11" con guías de trazo punteado, recorte con tijeras y actividades emocionales.',
    canAutoPublishPortals: ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit', 'TikTok'],
    manualActionRequired: true,
    whatToDo:
      '1. Revisa las 4 láminas en el visor de arriba y pulsa "DAR EL OK". 2. Descarga el archivo con el nombre exacto PTB_01_Cuaderno_Montessori_Otono_3_6_Anos_Gumroad_A4.pdf. 3. Súbelo en Gumroad, Amazon KDP y en tu carpeta FTP /PTB/descargas/.',
    whereToPublish:
      '1) Gumroad: app.gumroad.com/products > New Product > Digital Product. 2) Amazon KDP: kdp.amazon.com > Crear > Libro de tapa blanda (8.5x11" Sin sangría). 3) FTP FileZilla: carpeta /PTB/descargas/.',
    whatWeNeedFromUser:
      'Necesitamos que: 1) Previsualices las 4 láminas montadas arriba y pulses el botón verde "DAR EL OK", 2) Confirmes el precio (€11.90), y 3) Subas el archivo descargado con el nombre exacto indicado a tu cuenta de Gumroad y KDP.',
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
        heading: 'Lámina 1: Trazos del Bosque y Preescritura',
        activityInstruction:
          'Une cada hoja de otoño con su árbol siguiendo la línea de puntos con un lápiz o cera gruesa sin levantar la mano.',
        childContent:
          '¡Ayuda a la ardilla Leo a llevar las 5 bellotas hasta su madriguera contando en voz alta: 1, 2, 3, 4 y 5!',
        illustrationTheme: 'Ardilla simpática de trazo grueso y 5 caminos punteados hacia las bellotas',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Recorta con Tijeras y Clasifica por Tamaño',
        activityInstruction:
          'Recorta por la línea discontinua las 6 figuras inferiores y pégalas de menor a mayor en las casillas superiores.',
        childContent:
          'Pequeño · Mediano · Grande — Observa las castañas y hojas del bosque y ordénalas.',
        illustrationTheme: '3 casillas superiores y 6 tarjetas recortables con icono de tijeras escolares',
      },
      {
        pageNumber: 3,
        heading: 'Lámina 3: Sumas Visuales Montessori con Setas y Piñas',
        activityInstruction:
          'Cuenta los elementos de cada grupo, repasa el número punteado y escribe el resultado dentro del círculo.',
        childContent:
          '2 setas rojas + 3 piñas del pino = 5 tesoros de otoño. ¡Píntalos con tus colores favoritos!',
        illustrationTheme: 'Grupos visuales de elementos del bosque con números grandes punteados',
      },
      {
        pageNumber: 4,
        heading: 'Lámina 4: La Rueda de las Emociones en Casa y en el Cole',
        activityInstruction:
          'Señala qué carita representa cómo te sientes hoy y dibuja en el cuadro central tu momento favorito del día.',
        childContent:
          'Hoy me siento: Alegre · Tranquilo · Curioso · Cansado. ¡Todas mis emociones son importantes!',
        illustrationTheme: '4 caritas expresivas infantiles y marco decorado con hojas para dibujo libre',
      },
    ],
    resolved: false,
  },
  {
    id: 'alert-init-2',
    assetTitle: 'Pack 30 Flashcards Bilingües (Español-Inglés): Animales, Colores y Rutinas',
    recommendedFileNameBase: 'PTB_02_Flashcards_Bilingues_Animales_Rutinas',
    formatType: 'JPG_FLASHCARDS',
    ageRange: '2–5 años',
    suggestedPriceEur: 8.9,
    createdAt: 'Hoy · 09:15',
    approvalStatus: 'PENDIENTE_OK',
    autonomousSummary:
      'Se han maquetado las tarjetas visuales bilingües a 300 DPI con bordes redondeados de recorte, fonética simplificada para padres y tipografía escolar.',
    canAutoPublishPortals: ['Instagram', 'Pinterest', 'TikTok', 'X (Twitter)'],
    manualActionRequired: true,
    whatToDo:
      '1. Previsualiza las tarjetas arriba y da tu OK. 2. Descarga la lámina .JPG de 300 DPI (PTB_02_Flashcards_Bilingues_Animales_Rutinas_Lamina_300dpi.jpg) y el PDF A4. 3. Súbelo a Gumroad y Pinterest.',
    whereToPublish:
      'Gumroad (app.gumroad.com/products) · Pinterest (Pin de Producto enlazado a Gumroad) · Canva Hub',
    whatWeNeedFromUser:
      'Solo necesitamos tu "OK" tras revisar las tarjetas en el visor y que subas el archivo PTB_02_Flashcards_Bilingues_Animales_Rutinas_Gumroad_A4.pdf en Gumroad.',
    seoKeywords: [
      'flashcards bilingues ingles espanol ninos',
      'tarjetas vocabulario infantil imprimir',
      'montessori tarjetas animales rutinas',
      'aprender ingles jugando preescolar',
      'recursos aula infantil imprimibles',
      'flashcards 300 dpi pdf',
      'material didactico bilingue',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lámina 1: Animales de la Granja y del Bosque (Farm & Forest)',
        activityInstruction:
          'Imprime en cartulina blanca, recorta las 4 tarjetas y juega a pronunciar el nombre en español e inglés.',
        childContent:
          'EL LEÓN / THE LION · LA OVEJA / THE SHEEP · EL CONEJO / THE RABBIT · EL PATO / THE DUCK',
        illustrationTheme: 'Cuadrícula de 4 tarjetas flashcards con borde de recorte e ilustración central',
      },
      {
        pageNumber: 2,
        heading: 'Lámina 2: Mi Rutina de Mañana y Noche (Daily Routines)',
        activityInstruction:
          'Coloca las tarjetas en la habitación del peque en el orden en que realiza cada hábito diario.',
        childContent:
          'DESAYUNAR / HAVE BREAKFAST · LAVARSE LOS DIENTES / BRUSH TEETH · LEER UN CUENTO / READ A BOOK',
        illustrationTheme: '4 tarjetas visuales de autonomía infantil estilo Montessori',
      },
    ],
    resolved: false,
  },
  {
    id: 'alert-init-3',
    assetTitle: 'Cuento Interactivo Ilustrado: El Monstruo de la Calma y el Frasco de Estrellas',
    recommendedFileNameBase: 'PTB_03_Cuento_Interactivo_Monstruo_Calma',
    formatType: 'EPUB_CUENTO',
    ageRange: '3–8 años',
    suggestedPriceEur: 9.5,
    createdAt: 'Ayer · 20:30',
    approvalStatus: 'APROBADO_OK',
    autonomousSummary:
      'Cuento infantil completo estructurado por capítulos con ejercicios de respiración consciente para antes de dormir, exportable en .EPUB y .PDF.',
    canAutoPublishPortals: ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit'],
    manualActionRequired: true,
    whatToDo:
      'Descarga el archivo PTB_03_Cuento_Interactivo_Monstruo_Calma_Cuento_Interactivo.epub y súbelo en Amazon KDP Kindle eBooks y Gumroad.',
    whereToPublish:
      'Amazon KDP (Crear > eBook Kindle) y Gumroad (Digital Product)',
    whatWeNeedFromUser:
      'Este cuento ya tiene tu OK. Solo falta arrastrar el archivo .epub descargado a tu panel de KDP Kindle.',
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
          'Lee este capítulo en voz suave y pide al peque que hinche la barriga como un globo tres veces.',
        childContent:
          'A veces, cuando las cosas no salen como queremos, aparece una nube rápida en la tripa. ¡Pero tenemos un superpoder secreto: la respiración de la estrella!',
        illustrationTheme: 'Monstruito tierno soplando estrellas luminosas dentro de un frasco',
      },
      {
        pageNumber: 2,
        heading: 'Capítulo 2: El Frasco de la Calma Antes de Dormir',
        activityInstruction:
          'Pregúntale al niño qué 3 cosas bonitas han pasado hoy para guardarlas imaginariamente en su frasco.',
        childContent:
          'Cada estrella que respiramos despacio ilumina nuestra habitación y nos prepara para soñar aventuras increíbles.',
        illustrationTheme: 'Frasco mágico con 3 estrellas numeradas para colorear o señalar',
      },
    ],
    resolved: false,
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<WorkspaceSection>('AGENT_FLOW');
  const [flowSubTab, setFlowSubTab] = useState<'ACTIVITY_FLOW' | 'RAW_IO_PORTALS'>('ACTIVITY_FLOW');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: true,
  });

  // Persistent State
  const [tasks, setTasks] = useState<PolsiaTask[]>(() => {
    const saved = localStorage.getItem('ptb_tasks_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [portals, setPortals] = useState<PortalConfig[]>(() => {
    const saved = localStorage.getItem('ptb_portals_v2');
    return saved ? JSON.parse(saved) : INITIAL_PORTALS;
  });

  const [socialPosts, setSocialPosts] = useState<SocialPostItem[]>(() => {
    const saved = localStorage.getItem('ptb_posts_v2');
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_POSTS;
  });

  const [catalog, setCatalog] = useState<CatalogProduct[]>(() => {
    const saved = localStorage.getItem('ptb_catalog_v2');
    return saved ? JSON.parse(saved) : INITIAL_CATALOG;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('ptb_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [crmCustomers, setCrmCustomers] = useState<CrmCustomer[]>(() => {
    const saved = localStorage.getItem('ptb_crm_v2');
    return saved ? JSON.parse(saved) : INITIAL_CRM_CUSTOMERS;
  });

  const [trends, setTrends] = useState<TrendItem[]>(() => {
    const saved = localStorage.getItem('ptb_trends_v2');
    return saved ? JSON.parse(saved) : INITIAL_TRENDS;
  });

  const [suggestions, setSuggestions] = useState<GrowthSuggestion[]>(() => {
    const saved = localStorage.getItem('ptb_suggestions_v2');
    return saved ? JSON.parse(saved) : INITIAL_SUGGESTIONS;
  });

  const [documents] = useState<PolsiaDocument[]>(INITIAL_DOCUMENTS);

  const [chatFeed, setChatFeed] = useState<ChatFeedItem[]>(() => {
    const saved = localStorage.getItem('ptb_chat_v2');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_FEED;
  });

  const [domainConfig, setDomainConfig] = useState<DomainConfig>(() => {
    const saved = localStorage.getItem('ptb_domain_v2');
    return saved ? JSON.parse(saved) : INITIAL_DOMAIN_CONFIG;
  });

  const [actionAlerts, setActionAlerts] = useState<ActionAlertItem[]>(() => {
    const saved = localStorage.getItem('ptb_action_alerts_v2');
    return saved ? JSON.parse(saved) : INITIAL_ACTION_ALERTS;
  });

  // Active Task in the CortX Activity Flow Inspector
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const [nightTaskMode, setNightTaskMode] = useState<boolean>(true);
  const [visitorsCount, setVisitorsCount] = useState<number>(1420);

  // Modals
  const [showNewCapabilityModal, setShowNewCapabilityModal] = useState<boolean>(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskCategory, setNewTaskCategory] =
    useState<PolsiaTask['category']>('AUTOPUBLICACIÓN');

  // AI Bot States
  const [chatInput, setChatInput] = useState<string>('');
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [isDetectingTrends, setIsDetectingTrends] = useState<boolean>(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState<boolean>(false);
  const [isExecutingTask, setIsExecutingTask] = useState<boolean>(false);
  const [lastLatencyMs, setLastLatencyMs] = useState<number>(2840.42);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ptb_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('ptb_portals_v2', JSON.stringify(portals));
  }, [portals]);
  useEffect(() => {
    localStorage.setItem('ptb_posts_v2', JSON.stringify(socialPosts));
  }, [socialPosts]);
  useEffect(() => {
    localStorage.setItem('ptb_catalog_v2', JSON.stringify(catalog));
  }, [catalog]);
  useEffect(() => {
    localStorage.setItem('ptb_orders_v2', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem('ptb_crm_v2', JSON.stringify(crmCustomers));
  }, [crmCustomers]);
  useEffect(() => {
    localStorage.setItem('ptb_trends_v2', JSON.stringify(trends));
  }, [trends]);
  useEffect(() => {
    localStorage.setItem('ptb_suggestions_v2', JSON.stringify(suggestions));
  }, [suggestions]);
  useEffect(() => {
    localStorage.setItem('ptb_chat_v2', JSON.stringify(chatFeed));
  }, [chatFeed]);
  useEffect(() => {
    localStorage.setItem('ptb_domain_v2', JSON.stringify(domainConfig));
  }, [domainConfig]);
  useEffect(() => {
    localStorage.setItem('ptb_action_alerts_v2', JSON.stringify(actionAlerts));
  }, [actionAlerts]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatFeed, isBotThinking]);

  const currentTimeStr = () => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const activeTask = tasks[selectedTaskIndex] || tasks[0];
  const latestUserMessage =
    [...chatFeed].reverse().find((m) => m.type === 'USER_MESSAGE')?.text ||
    'Autopublicar tendencias diarias de productos infantiles en X, Instagram, Pinterest, TikTok y Gumroad.';
  const latestAiResponse =
    [...chatFeed].reverse().find((m) => m.type === 'AI_THOUGHT_RESPONSE')?.text ||
    activeTask?.deliverable ||
    'Flujo completado. Catálogo infantil y portales sincronizados.';

  // --- SEND COMMAND TO AI AGENT ---
  const sendMessageToPolsiaBot = async (customPrompt?: string) => {
    const messageToSend = (customPrompt ?? chatInput).trim();
    if (!messageToSend || isBotThinking) return;

    if (!customPrompt) {
      setChatInput('');
    }

    const startMs = performance.now();
    const userMsg: ChatFeedItem = {
      id: `msg-${Date.now()}`,
      type: 'USER_MESSAGE',
      text: messageToSend,
      timestamp: currentTimeStr(),
    };
    setChatFeed((prev) => [...prev, userMsg]);
    setIsBotThinking(true);

    try {
      const response = await fetch(getApiUrl('/api/ptb/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          context: {
            brand: 'PaperTopBCN',
            domain: domainConfig.customDomain,
            autoMode,
            nightTaskMode,
            connectedPortals: portals.filter((p) => p.connected).map((p) => p.name),
            catalogProducts: catalog.map((c) => ({
              title: c.title,
              price: c.priceEur,
              portals: c.portals,
            })),
            crmTotalCustomers: crmCustomers.length,
            activeTrends: trends.map((t) => t.title),
          },
        }),
      });

      const data = await response.json();
      const elapsedMs = Math.round((performance.now() - startMs) * 100) / 100;
      setLastLatencyMs(elapsedMs);

      if (!response.ok) {
        throw new Error(data.error || 'Error en la comunicación con el Agente IA');
      }

      if (Array.isArray(data.actions)) {
        for (const action of data.actions) {
          const args = action.args || {};

          if (action.name === 'createTask') {
            const createdTask: PolsiaTask = {
              id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
              title: String(args.title || 'Nueva automatización PaperTopBCN'),
              description: String(args.description || 'Tarea ejecutada por el agente IA'),
              category: 'AUTOPUBLICACIÓN',
              credits: Number(args.credits) || 1,
              status: 'DESPLEGADO',
              createdAt: 'Ahora mismo',
              deliverable: data.reply,
            };
            setTasks((prev) => [createdTask, ...prev]);
            setSelectedTaskIndex(0);
          }

          if (action.name === 'publishOrScheduleSocialPost') {
            const pId = String(args.portalId || 'instagram').toLowerCase();
            const matchedPortal = portals.find((p) => p.id === pId) || portals[0];
            const newPost: SocialPostItem = {
              id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
              portalId: matchedPortal.id,
              portalName: matchedPortal.name,
              handle: matchedPortal.handle,
              content: String(args.content || ''),
              imageSuggestion: args.imageSuggestion
                ? String(args.imageSuggestion)
                : 'Fotografía cenital luminosa del recurso imprimible infantil en mesa de madera.',
              hashtags: Array.isArray(args.hashtags)
                ? args.hashtags.map(String)
                : ['#PaperTopBCN', '#Montessori', '#RecursosInfantiles'],
              timestamp: `${currentTimeStr()} · HOY`,
              status:
                args.status === 'PROGRAMADO'
                  ? 'PROGRAMADO'
                  : args.status === 'PENDIENTE_APROBACIÓN'
                  ? 'PENDIENTE_APROBACIÓN'
                  : 'PUBLICADO',
              trendSource: args.trendTopic ? String(args.trendTopic) : 'Agente Polsia IA',
              metrics: { impressions: 240, clicks: 28, ctrPct: 6.4, conversions: 3 },
            };
            setSocialPosts((prev) => [newPost, ...prev]);
          }

          if (action.name === 'addCatalogProduct') {
            const newProd: CatalogProduct = {
              id: `prod-${Date.now()}`,
              sku: `PTB-00${catalog.length + 1}`,
              title: String(args.title || 'Nuevo Recurso Infantil PaperTopBCN'),
              category: (args.category as CatalogProduct['category']) || 'Cuadernos Montessori',
              ageRange: String(args.ageRange || '3–6 años'),
              priceEur: Number(args.price) || 11.9,
              formats: ['PDF A4', 'US Letter', 'Plantilla Canva'],
              portals: Array.isArray(args.portals)
                ? args.portals.map(String)
                : ['Gumroad', 'Amazon KDP', 'Pinterest'],
              salesCount: 1,
              revenueEur: Number(args.price) || 11.9,
              status: 'TENDENCIA',
              previewColor: '#FEF3C7',
              previewIconType: 'montessori',
            };
            setCatalog((prev) => [newProd, ...prev]);
          }

          if (action.name === 'activatePortal') {
            const pId = String(args.portalId || 'tiktok').toLowerCase();
            setPortals((prev) =>
              prev.map((p) =>
                p.id === pId
                  ? { ...p, connected: true, autoPublish: true, lastSync: 'Activo ahora' }
                  : p
              )
            );
          }

          if (action.name === 'proposeBusinessImprovement') {
            const newSug: GrowthSuggestion = {
              id: `sug-${Date.now()}`,
              title: String(args.title || 'Mejora estratégica PaperTopBCN'),
              impact: String(args.impact || '+28% conversión'),
              channel: String(args.channel || 'Multicanal'),
              recommendation: String(args.recommendation || ''),
              automationPrompt: `Implementa la mejora: ${args.title}`,
              implemented: false,
            };
            setSuggestions((prev) => [newSug, ...prev]);
          }
        }
      }

      const aiMsg: ChatFeedItem = {
        id: `ai-${Date.now()}`,
        type: 'AI_THOUGHT_RESPONSE',
        thinkingSeconds: data.thinkingSeconds || 4,
        text: data.reply || 'Ejecución completada en el workspace PaperTopBCN.',
        timestamp: currentTimeStr(),
      };
      setChatFeed((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error de red';
      setChatFeed((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'AI_THOUGHT_RESPONSE',
          thinkingSeconds: 2,
          text: `Aviso del motor: ${errMsg}`,
          timestamp: currentTimeStr(),
        },
      ]);
    } finally {
      setIsBotThinking(false);
    }
  };

  // --- EXECUTE ACTIVE TASK IN FLOW ---
  const handleExecuteTaskWithAI = async (task: PolsiaTask) => {
    setIsExecutingTask(true);
    const startMs = performance.now();
    try {
      const response = await fetch(getApiUrl('/api/ptb/execute-task'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });
      const data = await response.json();
      setLastLatencyMs(Math.round((performance.now() - startMs) * 100) / 100);

      const updated: PolsiaTask = {
        ...task,
        status: 'DESPLEGADO',
        deliverable: data.deliverable || 'Tarea completada por el Agente.',
      };
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecutingTask(false);
    }
  };

  // --- DETECT DAILY TRENDS ---
  const handleDetectDailyTrends = async (focusTopic?: string) => {
    setIsDetectingTrends(true);
    try {
      const response = await fetch(getApiUrl('/api/ptb/detect-trends'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activePortals: portals.filter((p) => p.connected).map((p) => p.name),
          focusTopic,
        }),
      });
      const data = await response.json();
      if (data.trends && Array.isArray(data.trends) && data.trends.length > 0) {
        setTrends(data.trends);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDetectingTrends(false);
    }
  };

  // --- AUTO-PUBLISH TREND ---
  const handleAutoPublishTrend = (trend: TrendItem, targetPortals: string[]) => {
    const newPosts: SocialPostItem[] = targetPortals.map((platKey) => {
      const pConfig = portals.find((p) => p.id === platKey) || portals[0];
      const rich =
        trend.richDrafts?.[platKey as 'x' | 'instagram' | 'pinterest' | 'tiktok'];
      const fallbackText =
        trend.autoPosts[platKey as keyof TrendItem['autoPosts']] || trend.autoPosts.x;
      return {
        id: `autopost-${Date.now()}-${platKey}`,
        portalId: pConfig.id,
        portalName: pConfig.name,
        handle: pConfig.handle,
        content: rich?.postText || fallbackText,
        imageSuggestion:
          rich?.imageSuggestion ||
          'Composición cenital luminosa mostrando las láminas imprimibles infantiles en uso.',
        hashtags: rich?.hashtags || ['#PaperTopBCN', '#ImprimiblesNiños', '#Montessori'],
        timestamp: `${currentTimeStr()} · HOY`,
        status: 'PUBLICADO',
        trendSource: trend.title,
        metrics: { impressions: 390, clicks: 42, ctrPct: 6.8, conversions: 5 },
      };
    });

    setSocialPosts((prev) => [...newPosts, ...prev]);
    setVisitorsCount((v) => v + 95);
  };

  // --- SIMULATE LIVE ORDER (SYNCED WITH CRM & ANALYTICS) ---
  const handleSimulateNewOrder = () => {
    const randomProduct = catalog[Math.floor(Math.random() * catalog.length)] || catalog[0];
    const randomCustomer =
      crmCustomers[Math.floor(Math.random() * crmCustomers.length)] || crmCustomers[0];
    const samplePortals: OrderItem['portal'][] = [
      'Gumroad',
      'Amazon KDP',
      'Instagram Shop',
      'Pinterest',
      'TikTok',
      'Canva Hub',
    ];
    const chosenPortal = samplePortals[Math.floor(Math.random() * samplePortals.length)];

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `#PTB-${4893 + orders.length}`,
      customerId: randomCustomer.id,
      customerName: randomCustomer.name,
      customerEmail: randomCustomer.email,
      productTitle: randomProduct.title,
      portal: chosenPortal,
      amountEur: randomProduct.priceEur,
      status:
        chosenPortal === 'Amazon KDP'
          ? 'PROCESANDO_KDP'
          : chosenPortal === 'Canva Hub'
          ? 'PLANTILLA_CANVA_ENVIADA'
          : 'ENTREGADO_PDF',
      createdAt: 'Ahora mismo',
      dateIso: '2026-10-04',
      country: randomCustomer.country,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update Catalog metrics
    setCatalog((prev) =>
      prev.map((c) =>
        c.id === randomProduct.id
          ? {
              ...c,
              salesCount: c.salesCount + 1,
              revenueEur: c.revenueEur + randomProduct.priceEur,
            }
          : c
      )
    );

    // Update CRM Customer LTV & Interaction History automatically!
    setCrmCustomers((prev) =>
      prev.map((cust) =>
        cust.id === randomCustomer.id
          ? {
              ...cust,
              totalSpentEur: cust.totalSpentEur + randomProduct.priceEur,
              ordersCount: cust.ordersCount + 1,
              lastPurchaseDate: 'Hoy · En vivo',
              interactions: [
                {
                  id: `int-ord-${Date.now()}`,
                  type: 'SOPORTE_PDF',
                  channel: chosenPortal,
                  summary: `Nuevo pedido ${newOrder.orderNumber}: "${randomProduct.title}" (€${randomProduct.priceEur.toFixed(
                    2
                  )}) entregado automáticamente.`,
                  timestamp: `Hoy · ${currentTimeStr()}`,
                },
                ...cust.interactions,
              ],
            }
          : cust
      )
    );

    setVisitorsCount((v) => v + 24);
  };

  // --- GENERATE AI SUGGESTIONS ---
  const handleGenerateMoreSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    try {
      const response = await fetch(getApiUrl('/api/ptb/generate-suggestions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          catalogCount: catalog.length,
          portals: portals.filter((p) => p.connected).map((p) => p.name),
          recentRevenue: catalog.reduce((acc, c) => acc + c.revenueEur, 0),
        }),
      });
      const data = await response.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        const formatted: GrowthSuggestion[] = data.suggestions.map(
          (s: Omit<GrowthSuggestion, 'id' | 'implemented'>, i: number) => ({
            ...s,
            id: `sug-ai-${Date.now()}-${i}`,
            implemented: false,
          })
        );
        setSuggestions((prev) => [...formatted, ...prev]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const navItems: {
    id: WorkspaceSection;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'AGENT_FLOW',
      label: 'Agente & Activity Flow',
      shortLabel: 'Agent Flow',
      icon: <Bot className="w-4 h-4" />,
      badge: 'LIVE',
    },
    {
      id: 'CONTENT_FACTORY',
      label: 'Fábrica Contenido & OK (PDF/JPG)',
      shortLabel: 'Crear & OK',
      icon: <FileText className="w-4 h-4" />,
      badge: `${actionAlerts.filter((a) => a.approvalStatus === 'PENDIENTE_OK').length} OK`,
    },
    {
      id: 'CONTENT_STUDIO',
      label: 'Autopublicador & Tendencias IA',
      shortLabel: 'Contenido IA',
      icon: <Sparkles className="w-4 h-4" />,
      badge: `${portals.filter((p) => p.connected).length}`,
    },
    {
      id: 'ADVANCED_ANALYTICS',
      label: 'Analíticas Avanzadas',
      shortLabel: 'Analíticas',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'CRM_CUSTOMERS',
      label: 'CRM & Clientes',
      shortLabel: 'CRM',
      icon: <Users className="w-4 h-4" />,
      badge: `${crmCustomers.length}`,
    },
    {
      id: 'CATALOG_ORDERS',
      label: 'Catálogo & Pedidos',
      shortLabel: 'Catálogo',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: `${orders.length}`,
    },
    {
      id: 'INVESTMENTS_DOMAIN',
      label: 'Inversiones & Dominio',
      shortLabel: 'Inversión',
      icon: <Wallet className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col cortx-canvas">
      {/* =====================================================================
          TOP HEADER BAR (Matches CortX Dark Reference Screenshot)
      ===================================================================== */}
      <header className="h-14 bg-[#0B0F1A] border-b border-[#1E293B] px-4 flex items-center justify-between sticky top-0 z-40">
        {/* Zone 1: Brand Lockup (Single Clean Element like cortX logo) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('AGENT_FLOW');
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>PaperTop</span>
          <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-mono-code font-bold">
            BCN
          </span>
        </a>

        {/* Zone 2: Center Search / Command Input ("Search in workspace") */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!globalSearch.trim()) return;
            setActiveSection('AGENT_FLOW');
            sendMessageToPolsiaBot(globalSearch);
            setGlobalSearch('');
          }}
          className="hidden md:flex items-center flex-1 max-w-md mx-6"
        >
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search in PaperTopBCN workspace o escribe una orden al Agente IA..."
              className="w-full bg-[#111827] border border-[#24324B] rounded-full pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </form>

        {/* Zone 3: Right Status & Profile Controls */}
        <div className="flex items-center gap-2">
          <a
            href="/api/ptb/download-ftp-zip"
            download="PaperTopBCN_FTP_PTB.zip"
            className="hidden sm:inline-flex cortx-btn-emerald px-3 py-1.5 rounded-full font-mono-code text-[11px] items-center gap-1.5 font-bold"
            title="Descargar paquete ZIP compilado para subir por FileZilla a tu carpeta /PTB"
          >
            📦 ZIP FTP (/PTB)
          </a>

          <button
            onClick={() => setActiveSection('CONTENT_FACTORY')}
            className="cortx-btn-amber px-3 py-1.5 rounded-full font-mono-code text-[11px] flex items-center gap-1.5"
            title="Previsualizar contenido creado y dar el OK"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>
              {actionAlerts.filter((a) => a.approvalStatus === 'PENDIENTE_OK').length} Pendientes de OK
            </span>
          </button>

          <button
            onClick={() => setAutoMode((v) => !v)}
            className={`px-3 py-1.5 rounded-full font-mono-code text-[11px] flex items-center gap-1.5 border ${
              autoMode
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-[#151E31] border-[#24324B] text-slate-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Auto-Pilot:</span> {autoMode ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setNightTaskMode((v) => !v)}
            className={`p-2 rounded-full border ${
              nightTaskMode
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                : 'bg-[#151E31] border-[#24324B] text-slate-400'
            }`}
            title="Tarea Nocturna de Tendencias"
          >
            <Moon className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowNewCapabilityModal(true)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 text-white font-mono-code text-xs font-bold flex items-center justify-center border border-white/20"
            title="Añadir Portal o Capacidad"
          >
            PT
          </button>
        </div>
      </header>

      {/* =====================================================================
          MAIN WORKSPACE LAYOUT: LEFT SIDEBAR + MAIN VIEWPORT
      ===================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar (Matches CortX "Observability" dark sidebar) */}
        <aside className="w-16 lg:w-64 cortx-sidebar border-r flex flex-col justify-between shrink-0">
          <div className="p-3 space-y-4">
            <div className="hidden lg:flex items-center justify-between px-2 pt-1">
              <span className="text-sm font-semibold text-slate-200">Observability & IA</span>
              <span className="font-mono-code text-[10px] text-cyan-400">v2.6</span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#17233B] text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-400 hover:bg-[#131B2E] hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span className="hidden lg:inline truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="hidden lg:inline font-mono-code text-[10px] text-slate-400">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Connected Portals Quick List in Sidebar */}
            <div className="hidden lg:block pt-4 border-t border-[#1E293B] space-y-2">
              <div className="px-2 flex items-center justify-between font-mono-code text-[10px] text-slate-500 uppercase">
                <span>PORTALES ACTIVOS</span>
                <button
                  onClick={() => setShowNewCapabilityModal(true)}
                  className="text-cyan-400 hover:underline"
                >
                  + Añadir
                </button>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto px-1">
                {portals.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveSection('CONTENT_STUDIO')}
                    className="w-full px-2 py-1.5 rounded flex items-center justify-between text-xs text-slate-300 hover:bg-[#151E31]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          p.connected ? 'bg-emerald-400' : 'bg-slate-600'
                        }`}
                      />
                      <span className="truncate">{p.name}</span>
                    </span>
                    <span className="font-mono-code text-[10px] text-slate-500">
                      €{p.metrics.revenueEur.toFixed(0)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Domain Status */}
          <div className="hidden lg:block p-3 border-t border-[#1E293B]">
            <button
              onClick={() => setActiveSection('INVESTMENTS_DOMAIN')}
              className="w-full bg-[#111827] border border-[#24324B] rounded-lg p-2.5 text-left hover:border-cyan-400 transition-colors"
            >
              <div className="flex items-center justify-between font-mono-code text-[10px] text-emerald-400">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> DOMINIO ACTIVO
                </span>
                <span>SSL ✓</span>
              </div>
              <div className="font-mono-code text-xs text-white truncate mt-0.5">
                {domainConfig.customDomain}
              </div>
            </button>
          </div>
        </aside>

        {/* ===================================================================
            MAIN CONTENT VIEWPORT
        =================================================================== */}
        <main className="flex-1 overflow-y-auto">
          {/* 1. CORTX AGENT & ACTIVITY FLOW INSPECTOR (Exact match to new image.png) */}
          {activeSection === 'AGENT_FLOW' && (
            <div className="flex flex-col min-h-full">
              {/* Top Inspector Header Bar */}
              <div className="bg-[#0E1424] px-6 py-4 border-b border-[#1E293B] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="cortx-btn-emerald px-2.5 py-1 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isBotThinking || isExecutingTask ? 'Running' : 'Completed'}
                    </span>

                    <h1 className="text-xl font-bold text-white">
                      {activeTask?.title || 'PaperTopBCN Autonomous Trend & Sales Agent'}
                    </h1>

                    <button
                      onClick={() => handleExecuteTaskWithAI(activeTask)}
                      disabled={isExecutingTask}
                      className="cortx-btn px-2.5 py-1 text-cyan-400 flex items-center gap-1"
                    >
                      OPEN AGENT <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="font-mono-code text-xs text-slate-400 flex items-center gap-2">
                    <span>⚡ completed</span>
                    <span>·</span>
                    <span>04/10/2026 {currentTimeStr()}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{domainConfig.customDomain}</span>
                  </div>
                </div>

                {/* Right Task Switcher & Category Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/40 font-mono-code text-[11px] text-indigo-300">
                    {activeTask?.category || 'AUTOPUBLICACIÓN'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 font-mono-code text-[11px] text-amber-300">
                    PAPERTOPBCN_CORE
                  </span>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 font-mono-code text-[11px] text-cyan-300">
                    Multi-Portal Sync
                  </span>

                  <div className="flex items-center border border-[#2E3F5C] rounded bg-[#151E31]">
                    <button
                      onClick={() =>
                        setSelectedTaskIndex((i) => (i > 0 ? i - 1 : tasks.length - 1))
                      }
                      className="px-2 py-1 text-slate-300 hover:text-white"
                      title="Tarea anterior"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setSelectedTaskIndex((i) => (i + 1) % Math.max(1, tasks.length))
                      }
                      className="px-2 py-1 text-slate-300 hover:text-white border-l border-[#2E3F5C]"
                      title="Siguiente tarea"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>

              {/* Signature Multi-Color Spectrum Bar from CortX Screenshot */}
              <div className="cortx-spectrum-bar w-full" />

              {/* Sub-Navigation Tabs: Activity Flow | Raw I/O & Portals */}
              <div className="px-6 border-b border-[#1E293B] bg-[#0B0F1A] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setFlowSubTab('ACTIVITY_FLOW')}
                    className={`py-3 text-xs font-mono-code flex items-center gap-2 border-b-2 transition-colors ${
                      flowSubTab === 'ACTIVITY_FLOW'
                        ? 'border-cyan-400 text-cyan-400 font-semibold'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" /> Activity Flow
                  </button>
                  <button
                    onClick={() => setFlowSubTab('RAW_IO_PORTALS')}
                    className={`py-3 text-xs font-mono-code flex items-center gap-2 border-b-2 transition-colors ${
                      flowSubTab === 'RAW_IO_PORTALS'
                        ? 'border-cyan-400 text-cyan-400 font-semibold'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" /> Raw I/O & Tareas ({tasks.length})
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setShowNewTaskModal(true)}
                    className="cortx-btn px-3 py-1 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3 text-cyan-400" /> Nueva Tarea
                  </button>
                  <button
                    onClick={handleSimulateNewOrder}
                    className="cortx-btn-emerald px-3 py-1 flex items-center gap-1"
                  >
                    + Simular Pedido Live
                  </button>
                </div>
              </div>

              {/* Main 2-Column Split: Left Activity Flow Steps (7 cols) | Right Properties & Live Agent Bot (5 cols) */}
              <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start flex-1">
                {/* Left Column: 3-Step Pipeline Trace (7 cols) */}
                <div className="xl:col-span-7 space-y-5">
                  {flowSubTab === 'ACTIVITY_FLOW' ? (
                    <>
                      <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                        <span>3 steps · Pipeline de Automatización PaperTopBCN</span>
                        <div className="space-x-3">
                          <button
                            onClick={() =>
                              setExpandedSteps({ step1: true, step2: true, step3: true })
                            }
                            className="text-cyan-400 hover:underline"
                          >
                            Expand all
                          </button>
                          <span>|</span>
                          <button
                            onClick={() =>
                              setExpandedSteps({ step1: false, step2: false, step3: false })
                            }
                            className="text-cyan-400 hover:underline"
                          >
                            Collapse all
                          </button>
                        </div>
                      </div>

                      {/* Vertical Timeline Container */}
                      <div className="relative pl-6 border-l border-[#24324B] space-y-5 ml-2">
                        {/* STEP 1: Description / User Trigger */}
                        <div className="relative">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0B0F1A] border-2 border-slate-400 absolute -left-[31px] top-4" />
                          <div className="cortx-panel p-4 space-y-3">
                            <button
                              onClick={() =>
                                setExpandedSteps((p) => ({ ...p, step1: !p.step1 }))
                              }
                              className="w-full flex items-center justify-between text-left"
                            >
                              <div className="flex items-center gap-2.5">
                                {expandedSteps.step1 ? (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                )}
                                <span className="text-sm font-semibold text-white">
                                  Description & Trigger
                                </span>
                              </div>
                              <span className="font-mono-code text-[11px] text-slate-400">
                                Paso 1/3
                              </span>
                            </button>

                            {expandedSteps.step1 && (
                              <div className="pt-2 border-t border-[#1E293B] space-y-2 text-xs">
                                <div className="font-mono-code text-slate-300">
                                  workspace: <span className="text-cyan-400">PaperTopBCN</span>,
                                  instrucción activa: &quot;{latestUserMessage}&quot;
                                </div>
                                <div className="text-slate-400">{activeTask?.description}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* STEP 2: Action / Gemini Model & Multi-Portal Execution */}
                        <div className="relative">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0B0F1A] border-2 border-blue-400 absolute -left-[31px] top-4" />
                          <div className="cortx-panel p-4 space-y-3">
                            <button
                              onClick={() =>
                                setExpandedSteps((p) => ({ ...p, step2: !p.step2 }))
                              }
                              className="w-full flex items-center justify-between text-left"
                            >
                              <div className="flex items-center gap-2.5">
                                {expandedSteps.step2 ? (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                )}
                                <Play className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-sm font-semibold text-white">Action</span>
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 font-mono-code text-[11px] text-amber-300">
                                  google/gemini-3.8-flash
                                </span>
                              </div>
                              <span className="font-mono-code text-[11px] text-cyan-400">
                                Function Calling + Trends
                              </span>
                            </button>

                            {expandedSteps.step2 && (
                              <div className="bg-[#0E1424] border border-[#1E293B] rounded-lg p-3.5 font-mono-code text-xs space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                  <span className="text-slate-400">Label</span>
                                  <span className="col-span-2 text-white">
                                    {activeTask?.category || 'AUTOPUBLISH_PIPELINE'}
                                  </span>
                                  <span className="text-slate-400">Display Name</span>
                                  <span className="col-span-2 text-white">
                                    {activeTask?.title}
                                  </span>
                                  <span className="text-slate-400">Model</span>
                                  <span className="col-span-2 text-cyan-400">
                                    gemini-3.8-flash (Server-Side)
                                  </span>
                                  <span className="text-slate-400">Connected Portals</span>
                                  <span className="col-span-2 text-emerald-400">
                                    {portals
                                      .filter((p) => p.connected)
                                      .map((p) => p.name)
                                      .join(', ')}
                                  </span>
                                  <span className="text-slate-400">Timestamp</span>
                                  <span className="col-span-2 text-slate-300">
                                    04/10/2026 {currentTimeStr()}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* STEP 3: Result / Deliverable */}
                        <div className="relative">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#0B0F1A] border-2 border-purple-400 absolute -left-[31px] top-4" />
                          <div className="cortx-panel p-4 space-y-3">
                            <button
                              onClick={() =>
                                setExpandedSteps((p) => ({ ...p, step3: !p.step3 }))
                              }
                              className="w-full flex items-center justify-between text-left"
                            >
                              <div className="flex items-center gap-2.5">
                                {expandedSteps.step3 ? (
                                  <ChevronDown className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-400" />
                                )}
                                <span className="text-sm font-semibold text-white">Result</span>
                                <span className="cortx-btn-emerald px-2 py-0.5 text-[10px]">
                                  completed
                                </span>
                              </div>
                              <span className="font-mono-code text-[11px] text-emerald-400">
                                Code 200
                              </span>
                            </button>

                            {expandedSteps.step3 && (
                              <div className="bg-[#0E1424] border border-[#1E293B] rounded-lg p-3.5 space-y-2.5">
                                <div className="grid grid-cols-3 gap-2 font-mono-code text-xs border-b border-[#1E293B] pb-2">
                                  <span className="text-slate-400">Status</span>
                                  <span className="col-span-2 text-emerald-400">completed</span>
                                  <span className="text-slate-400">Code</span>
                                  <span className="col-span-2 text-white">200 OK</span>
                                </div>
                                <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                                  {latestAiResponse}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Raw I/O & All Tasks List */
                    <div className="space-y-3">
                      {tasks.map((t, index) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSelectedTaskIndex(index);
                            setFlowSubTab('ACTIVITY_FLOW');
                          }}
                          className="cortx-card p-4 cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="font-mono-code text-xs text-cyan-400">
                              {t.category} · {t.createdAt}
                            </div>
                            <div className="text-sm font-bold text-white mt-0.5">
                              {t.title}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {t.description}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExecuteTaskWithAI(t);
                            }}
                            className="cortx-btn-primary px-3 py-1.5 whitespace-nowrap"
                          >
                            EJECUTAR IA
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: CortX Properties Table + Interactive Polsia AI Bot (5 cols) */}
                <div className="xl:col-span-5 space-y-5">
                  {/* Properties & Latency Card (Exact match to right panel in CortX screenshot) */}
                  <div className="cortx-panel p-5 space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-[#1E293B] pb-3">
                      Properties & Workspace Telemetry
                    </h3>

                    <div className="divide-y divide-[#1E293B] font-mono-code text-xs">
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Agent ID</span>
                        <span className="text-white">PTB-AI-10005</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Agent</span>
                        <span className="text-cyan-400 font-semibold">
                          PaperTopBCN Autonomous Bot
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Active Portals</span>
                        <span className="text-white">
                          X, IG, Gumroad, KDP, Canva, Pinterest, Reddit, TikTok
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Status</span>
                        <span className="text-emerald-400 font-semibold">
                          {isBotThinking ? 'processing...' : 'completed'}
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Created By</span>
                        <span className="text-white flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-600 text-[10px] flex items-center justify-center">
                            PT
                          </span>
                          PaperTopBCN Admin
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-400">Live Revenue / Orders</span>
                        <span className="text-emerald-400 font-bold">
                          €{catalog.reduce((a, c) => a + c.revenueEur, 0).toFixed(2)} ({orders.length} pedidos)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1E293B] space-y-2 font-mono-code text-xs">
                      <div className="text-white font-semibold">Latency</div>
                      <div className="flex justify-between text-slate-400">
                        <span>Pre-processing (Trend & CRM Context)</span>
                        <span className="text-slate-200">12.40 ms</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Agent processing (Gemini 3.8 Flash)</span>
                        <span className="text-slate-200">{lastLatencyMs.toFixed(2)} ms</span>
                      </div>
                      <div className="flex justify-between text-white font-bold pt-1 border-t border-[#1E293B]">
                        <span>Total</span>
                        <span className="text-cyan-400">
                          {(lastLatencyMs + 12.4).toFixed(2)} ms
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive AI Bot Chat Console */}
                  <div className="cortx-panel p-4 flex flex-col h-[420px]">
                    <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-bold text-white">
                          Consola Directa del Bot IA — PaperTopBCN
                        </span>
                      </div>
                      <span className="font-mono-code text-[10px] text-emerald-400">
                        ● AUTOPILOT READY
                      </span>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {chatFeed
                        .filter((c) => c.type !== 'DIVIDER')
                        .slice(-6)
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-lg text-xs leading-relaxed ${
                              item.type === 'USER_MESSAGE'
                                ? 'bg-cyan-950/50 border border-cyan-500/40 text-white ml-6'
                                : 'bg-[#151E31] border border-[#24324B] text-slate-200 mr-4'
                            }`}
                          >
                            <div className="font-mono-code text-[10px] text-slate-400 mb-1 flex justify-between">
                              <span>
                                {item.type === 'USER_MESSAGE'
                                  ? 'TÚ (ADMIN)'
                                  : `AGENTE IA · ${item.thinkingSeconds || 4}S`}
                              </span>
                              <span>{item.timestamp}</span>
                            </div>
                            <div className="whitespace-pre-line">{item.text}</div>
                          </div>
                        ))}

                      {isBotThinking && (
                        <div className="bg-[#151E31] border border-cyan-500/40 rounded-lg p-3 text-xs text-cyan-300 animate-pulse font-mono-code">
                          Ejecutando herramientas del Agente IA en PaperTopBCN...
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Quick Prompts */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-2">
                      <button
                        type="button"
                        onClick={() =>
                          sendMessageToPolsiaBot(
                            'Detecta las tendencias infantiles de hoy y genera borradores con imagen y hashtags para X, Instagram, TikTok y Pinterest.'
                          )
                        }
                        className="cortx-btn px-2.5 py-1 text-[10px] whitespace-nowrap"
                      >
                        ⚡ Autopublicar tendencia hoy
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection('INVESTMENTS_DOMAIN')}
                        className="cortx-btn px-2.5 py-1 text-[10px] whitespace-nowrap text-emerald-400"
                      >
                        💰 Ver Inversiones y Dominio
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection('CRM_CUSTOMERS')}
                        className="cortx-btn px-2.5 py-1 text-[10px] whitespace-nowrap text-cyan-400"
                      >
                        👥 Abrir CRM Clientes
                      </button>
                    </div>

                    {/* Input Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessageToPolsiaBot();
                      }}
                      className="flex items-center gap-2 pt-2 border-t border-[#1E293B]"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Pídele al bot que autopublique, cree un producto o analice ventas..."
                        className="flex-1 bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isBotThinking || !chatInput.trim()}
                        className="cortx-btn-primary px-3.5 py-2 flex items-center gap-1 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" /> ENVIAR
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 1.5 AUTONOMOUS CONTENT FACTORY (PDF, EPUB, JPG + PREVIEW BEFORE OK + FILENAMES) */}
          {activeSection === 'CONTENT_FACTORY' && (
            <AutonomousContentFactoryView
              alerts={actionAlerts}
              onAddAlert={(newAlert) => setActionAlerts((prev) => [newAlert, ...prev])}
              onUpdateAlert={(updated) =>
                setActionAlerts((prev) =>
                  prev.map((a) => (a.id === updated.id ? updated : a))
                )
              }
              onApproveAlertOk={(approvedItem) => {
                // Automatically publish social launch posts across connected portals once user gives OK
                const launchPost: SocialPostItem = {
                  id: `post-ok-${Date.now()}`,
                  portalId: 'instagram',
                  portalName: 'Instagram & Pinterest',
                  handle: '@papertopbcn',
                  content: `¡Nuevo recurso validado y disponible en PaperTopBCN! ✨ "${approvedItem.assetTitle}" (${approvedItem.ageRange}). Descarga inmediata en PDF A4 y disponible en Amazon KDP.`,
                  imageSuggestion: `Lámina impresa de ${approvedItem.recommendedFileNameBase}_Lamina_300dpi.jpg sobre mesa infantil de madera.`,
                  hashtags: ['#PaperTopBCN', '#Montessori', '#RecursosInfantiles', '#ImprimiblesPDF'],
                  timestamp: `Aprobado con tu OK · ${currentTimeStr()}`,
                  status: 'PUBLICADO',
                  trendSource: 'Fábrica Autónoma (OK Usuario)',
                  metrics: { impressions: 320, clicks: 41, ctrPct: 6.9, conversions: 4 },
                };
                setSocialPosts((prev) => [launchPost, ...prev]);
                setChatFeed((prev) => [
                  ...prev,
                  {
                    id: `ok-log-${Date.now()}`,
                    type: 'AI_THOUGHT_RESPONSE',
                    thinkingSeconds: 2,
                    text: `✅ Has dado el OK a "${approvedItem.assetTitle}". Producto añadido al catálogo oficial y anuncios autopublicados en redes. Nombre de archivo listo para subir: ${approvedItem.recommendedFileNameBase}_Gumroad_A4.pdf`,
                    timestamp: currentTimeStr(),
                  },
                ]);
              }}
              onResolveAlert={(id) =>
                setActionAlerts((prev) =>
                  prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
                )
              }
              onAddCatalogProductFromFactory={(newProdData) => {
                const created: CatalogProduct = {
                  ...newProdData,
                  id: `prod-fac-${Date.now()}`,
                  sku: `PTB-00${catalog.length + 1}`,
                  salesCount: 1,
                  revenueEur: newProdData.priceEur,
                };
                setCatalog((prev) => [created, ...prev]);
              }}
            />
          )}

          {/* 2. AI CONTENT GENERATION, SCHEDULING & PORTALS STUDIO */}
          {activeSection === 'CONTENT_STUDIO' && (
            <PortalsTrendsView
              portals={portals}
              trends={trends}
              posts={socialPosts}
              catalog={catalog}
              isDetectingTrends={isDetectingTrends}
              onTogglePortalConnection={(id) =>
                setPortals((prev) =>
                  prev.map((p) =>
                    p.id === id ? { ...p, connected: !p.connected } : p
                  )
                )
              }
              onTogglePortalAutoPublish={(id) =>
                setPortals((prev) =>
                  prev.map((p) =>
                    p.id === id ? { ...p, autoPublish: !p.autoPublish } : p
                  )
                )
              }
              onUpdatePortalSchedule={(id, schedule, handle) =>
                setPortals((prev) =>
                  prev.map((p) =>
                    p.id === id ? { ...p, dailySchedule: schedule, handle } : p
                  )
                )
              }
              onDetectDailyTrends={handleDetectDailyTrends}
              onAutoPublishTrend={handleAutoPublishTrend}
              onCreateProductFromTrend={(trend) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(
                  `Añade al catálogo el recurso "${trend.recommendedProductIdea}" a €11.90 y autopublica su lanzamiento.`
                );
              }}
              onOpenNewCapabilityModal={() => setShowNewCapabilityModal(true)}
              onTriggerPortalInteraction={(portal, interactionName) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(
                  `Ejecuta "${interactionName}" en nuestro canal ${portal.name} (${portal.handle}).`
                );
              }}
              onAddDraftPosts={(newDrafts) =>
                setSocialPosts((prev) => [...newDrafts, ...prev])
              }
              onApproveAndPublishPost={(postId, mode, scheduledTime) => {
                setSocialPosts((prev) =>
                  prev.map((p) =>
                    p.id === postId
                      ? {
                          ...p,
                          status: mode === 'PUBLISH_NOW' ? 'PUBLICADO' : 'PROGRAMADO',
                          scheduledFor: scheduledTime || p.scheduledFor,
                          timestamp:
                            mode === 'PUBLISH_NOW'
                              ? `Publicado · ${currentTimeStr()}`
                              : `Programado · ${scheduledTime || p.scheduledFor}`,
                        }
                      : p
                  )
                );
              }}
              onDeletePost={(postId) =>
                setSocialPosts((prev) => prev.filter((p) => p.id !== postId))
              }
            />
          )}

          {/* 3. ADVANCED ANALYTICS DASHBOARD */}
          {activeSection === 'ADVANCED_ANALYTICS' && (
            <AnalyticsGrowthView
              catalog={catalog}
              orders={orders}
              portals={portals}
              suggestions={suggestions}
              visitorsCount={visitorsCount}
              isGeneratingSuggestions={isGeneratingSuggestions}
              onGenerateMoreSuggestions={handleGenerateMoreSuggestions}
              onImplementSuggestion={(sug) => {
                setSuggestions((prev) =>
                  prev.map((s) => (s.id === sug.id ? { ...s, implemented: true } : s))
                );
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(sug.automationPrompt);
              }}
              onSimulateLiveSale={handleSimulateNewOrder}
            />
          )}

          {/* 4. CRM SYSTEM INTEGRATED WITH ORDERS */}
          {activeSection === 'CRM_CUSTOMERS' && (
            <CrmManagerView
              customers={crmCustomers}
              orders={orders}
              catalog={catalog}
              onAddCustomer={(newCust) => {
                const created: CrmCustomer = {
                  ...newCust,
                  id: `cust-${Date.now()}`,
                  interactions: [
                    {
                      id: `int-init-${Date.now()}`,
                      type: 'NOTA_INTERNA',
                      channel: newCust.acquisitionChannel,
                      summary: 'Ficha de cliente creada en el CRM de PaperTopBCN.',
                      timestamp: `Hoy · ${currentTimeStr()}`,
                    },
                  ],
                };
                setCrmCustomers((prev) => [created, ...prev]);
              }}
              onLogInteraction={(customerId, interaction) => {
                setCrmCustomers((prev) =>
                  prev.map((c) =>
                    c.id === customerId
                      ? {
                          ...c,
                          interactions: [
                            {
                              ...interaction,
                              id: `int-${Date.now()}`,
                              timestamp: `Hoy · ${currentTimeStr()}`,
                            },
                            ...c.interactions,
                          ],
                        }
                      : c
                  )
                );
              }}
              onSendSegmentToAgent={(prompt) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(prompt);
              }}
            />
          )}

          {/* 5. CATALOG & LIVE ORDERS MANAGER */}
          {activeSection === 'CATALOG_ORDERS' && (
            <CatalogOrdersView
              catalog={catalog}
              orders={orders}
              onAddProduct={(newProdData) => {
                const created: CatalogProduct = {
                  ...newProdData,
                  id: `prod-${Date.now()}`,
                  sku: `PTB-00${catalog.length + 1}`,
                  salesCount: 1,
                  revenueEur: newProdData.priceEur,
                };
                setCatalog((prev) => [created, ...prev]);
              }}
              onDeleteProduct={(id) =>
                setCatalog((prev) => prev.filter((c) => c.id !== id))
              }
              onAutoPublishProduct={(prod) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(
                  `Autopublica en X, Instagram, TikTok y Pinterest una campaña para "${prod.title}" (€${prod.priceEur}).`
                );
              }}
              onAskPolsiaAboutProduct={(prod) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(
                  `Optimiza el SEO y las palabras clave de "${prod.title}" para Gumroad y Amazon KDP.`
                );
              }}
              onSimulateNewOrder={handleSimulateNewOrder}
              onResendOrderPdf={(order) => {
                setChatFeed((prev) => [
                  ...prev,
                  {
                    id: `resend-${Date.now()}`,
                    type: 'AI_THOUGHT_RESPONSE',
                    thinkingSeconds: 2,
                    text: `Enlace de descarga PDF reenviado automáticamente a ${order.customerEmail} (${order.orderNumber}) y registrado en el CRM.`,
                    timestamp: currentTimeStr(),
                  },
                ]);
              }}
            />
          )}

          {/* 6. INVESTMENTS, UNIFIER APPS & CUSTOM DOMAIN GUIDE */}
          {activeSection === 'INVESTMENTS_DOMAIN' && (
            <InvestmentsDomainView
              domainConfig={domainConfig}
              onUpdateDomainConfig={(updated) => setDomainConfig(updated)}
              onAskAgentAboutInvestment={(prompt) => {
                setActiveSection('AGENT_FLOW');
                sendMessageToPolsiaBot(prompt);
              }}
            />
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL: ADD NEW PORTAL / CAPABILITY
      ===================================================================== */}
      {showNewCapabilityModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="cortx-panel max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div>
                <span className="font-mono-code text-xs text-cyan-400 uppercase">
                  AMPLIAR ECOSISTEMA PAPERTOPBCN
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Conectar Nuevo Portal o Unificador de Automatización
                </h3>
              </div>
              <button
                onClick={() => setShowNewCapabilityModal(false)}
                className="cortx-btn px-2.5 py-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'tiktok',
                  name: 'TikTok Kids & Printables',
                  handle: '@papertopbcn.kids',
                  category: 'SOCIAL' as const,
                  desc: 'Autopublicación de vídeos cenitales cortos mostrando imprimibles y actividades en acción.',
                },
                {
                  id: 'amazon_kdp',
                  name: 'Amazon KDP (Tapa Blanda)',
                  handle: 'PaperTopBCN Publishing',
                  category: 'MARKETPLACE' as const,
                  desc: 'Conversión automática de PDFs infantiles a libros físicos 8.5x11" en Amazon sin stock.',
                },
                {
                  id: 'etsy',
                  name: 'Etsy Digital Printables',
                  handle: 'PaperTopBCNShop.etsy.com',
                  category: 'MARKETPLACE' as const,
                  desc: 'Sincronización de fichas infantiles, pósters y busy books en Etsy.',
                },
                {
                  id: 'teachers_pay_teachers',
                  name: 'Teachers Pay Teachers (TpT)',
                  handle: 'PaperTopBCN School',
                  category: 'MARKETPLACE' as const,
                  desc: 'Venta directa a maestros y colegios de recursos de aula en español, catalán e inglés.',
                },
              ].map((item) => {
                const existing = portals.find((p) => p.id === item.id);
                const isConnected = existing?.connected;
                return (
                  <div
                    key={item.id}
                    className="cortx-card p-4 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="font-mono-code text-[10px] text-cyan-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        setPortals((prev) => {
                          if (prev.some((p) => p.id === item.id)) {
                            return prev.map((p) =>
                              p.id === item.id
                                ? { ...p, connected: true, autoPublish: true }
                                : p
                            );
                          }
                          return [
                            ...prev,
                            {
                              id: item.id,
                              name: item.name,
                              handle: item.handle,
                              category: item.category,
                              connected: true,
                              autoPublish: true,
                              dailySchedule: '18:00 CET · Automático',
                              lastSync: 'Conectado ahora',
                              accentColor: '#38BDF8',
                              description: item.desc,
                              interactionCapabilities: [
                                'Autopublicar desde Tendencia',
                                'Sincronizar Catálogo PaperTopBCN',
                              ],
                              metrics: {
                                followersOrItems: 'Canal Conectado',
                                monthlyClicks: 420,
                                revenueEur: 145,
                                impressions: 12400,
                                ctrPct: 5.4,
                                avgTimeOnPageSec: 185,
                                conversionRatePct: 4.3,
                              },
                            },
                          ];
                        });
                        setShowNewCapabilityModal(false);
                      }}
                      className={`w-full py-1.5 ${
                        isConnected ? 'cortx-btn-emerald' : 'cortx-btn-primary'
                      }`}
                    >
                      {isConnected ? '✓ CONECTADO' : '+ ACTIVAR CANAL'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CREATE NEW TASK
      ===================================================================== */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTaskTitle.trim()) return;
              const created: PolsiaTask = {
                id: `task-${Date.now()}`,
                title: newTaskTitle.trim(),
                description: newTaskDesc.trim() || 'Automatización programada para PaperTopBCN',
                category: newTaskCategory,
                credits: 1,
                status: 'PENDIENTE',
                createdAt: 'Ahora mismo',
              };
              setTasks((prev) => [created, ...prev]);
              setSelectedTaskIndex(0);
              setNewTaskTitle('');
              setNewTaskDesc('');
              setShowNewTaskModal(false);
            }}
            className="cortx-panel max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <h3 className="text-lg font-bold text-white">
                Nueva Tarea en el Flujo del Agente (PaperTopBCN)
              </h3>
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="cortx-btn px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                Título de la Tarea
              </label>
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Ej. Lanzar colección Navidad Montessori en Gumroad y KDP"
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                Instrucciones para el Agente IA
              </label>
              <textarea
                rows={3}
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                Categoría
              </label>
              <select
                value={newTaskCategory}
                onChange={(e) =>
                  setNewTaskCategory(e.target.value as PolsiaTask['category'])
                }
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
              >
                <option value="AUTOPUBLICACIÓN">AUTOPUBLICACIÓN</option>
                <option value="CATÁLOGO">CATÁLOGO</option>
                <option value="FUNCIONALIDAD">FUNCIONALIDAD</option>
                <option value="INVESTIGACIÓN">INVESTIGACIÓN</option>
                <option value="CORRECCIÓN">CORRECCIÓN</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="cortx-btn px-3.5 py-2"
              >
                CANCELAR
              </button>
              <button type="submit" className="cortx-btn-primary px-4 py-2">
                AÑADIR AL ACTIVITY FLOW
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
