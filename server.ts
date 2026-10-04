import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import type { FunctionDeclaration } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGenAI() {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Pure Node.js ZIP Archive Builder (Zero external dependencies)
function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZipBuffer(files: { name: string; data: Buffer }[]): Buffer {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBuf = Buffer.from(file.name, 'utf8');
    const uncompressedSize = file.data.length;
    const crc = crc32(file.data);
    const compressed = zlib.deflateRawSync(file.data);
    const compressedSize = compressed.length;

    // Local file header (30 bytes + filename)
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // signature
    localHeader.writeUInt16LE(20, 4); // version needed
    localHeader.writeUInt16LE(0, 6); // flags
    localHeader.writeUInt16LE(8, 8); // compression method: deflate
    localHeader.writeUInt16LE(0, 10); // mod time
    localHeader.writeUInt16LE(0, 12); // mod date
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28); // extra len

    localParts.push(localHeader, nameBuf, compressed);

    // Central directory header (46 bytes + filename)
    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(compressedSize, 20);
    centralHeader.writeUInt32LE(uncompressedSize, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, nameBuf);
    offset += 30 + nameBuf.length + compressedSize;
  }

  const centralBuffer = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(files.length, 8);
  endRecord.writeUInt16LE(files.length, 10);
  endRecord.writeUInt32LE(centralBuffer.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralBuffer, endRecord]);
}

function collectFilesRecursively(dir: string, baseDir: string = dir): { name: string; data: Buffer }[] {
  const results: { name: string; data: Buffer }[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursively(fullPath, baseDir));
    } else {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ name: relPath, data: fs.readFileSync(fullPath) });
    }
  }
  return results;
}

const ptbFunctions: FunctionDeclaration[] = [
  {
    name: 'createTask',
    description: 'Crea una nueva tarea en la cola de automatización de PaperTopBCN (corrección, funcionalidad, investigación, autopublicación o catálogo).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'Título claro y conciso de la tarea.',
        },
        description: {
          type: Type.STRING,
          description: 'Descripción detallada de los pasos o entregables de la tarea.',
        },
        category: {
          type: Type.STRING,
          description: 'Categoría en mayúsculas: CORRECCIÓN, FUNCIONALIDAD, INVESTIGACIÓN, AUTOPUBLICACIÓN, o CATÁLOGO.',
        },
        credits: {
          type: Type.NUMBER,
          description: 'Prioridad (1 o 2).',
        },
      },
      required: ['title', 'description', 'category'],
    },
  },
  {
    name: 'publishOrScheduleSocialPost',
    description: 'Crea, autopublica o programa una publicación en las redes sociales o portales de PaperTopBCN (X, Instagram, Pinterest, Reddit, TikTok, Gumroad, Amazon KDP, Canva).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        portalId: {
          type: Type.STRING,
          description: 'ID del portal: x, instagram, pinterest, reddit, tiktok, gumroad, amazon_kdp, o canva.',
        },
        content: {
          type: Type.STRING,
          description: 'Texto completo optimizado del post, hilo, descripción de pin o anuncio de producto para niños.',
        },
        imageSuggestion: {
          type: Type.STRING,
          description: 'Sugerencia visual detallada (foto, carrusel, vídeo cenital o mockup Canva).',
        },
        hashtags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Lista de hashtags relevantes para el post.',
        },
        trendTopic: {
          type: Type.STRING,
          description: 'Tendencia diaria en la que se basa esta publicación.',
        },
        status: {
          type: Type.STRING,
          description: 'Estado: "PUBLICADO", "PROGRAMADO" o "PENDIENTE_APROBACIÓN".',
        },
      },
      required: ['portalId', 'content', 'status'],
    },
  },
  {
    name: 'addCatalogProduct',
    description: 'Añade un nuevo producto digital infantil al catálogo maestro de PaperTopBCN y lo sincroniza con Gumroad, Amazon KDP o Canva.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'Nombre del recurso o producto digital para niños.',
        },
        category: {
          type: Type.STRING,
          description: 'Categoría: Cuadernos Montessori, Colorear KDP, Flashcards Imprimibles, Juegos de Aula, o Plantillas Canva.',
        },
        ageRange: {
          type: Type.STRING,
          description: 'Rango de edad recomendado, ej. "3-6 años", "6-9 años".',
        },
        price: {
          type: Type.NUMBER,
          description: 'Precio en EUR, ej. 7.90, 12.50.',
        },
        portals: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'Lista de portales donde se vende/publica: ["Gumroad", "Amazon KDP", "Canva", "Instagram", "Pinterest"].',
        },
      },
      required: ['title', 'category', 'ageRange', 'price'],
    },
  },
  {
    name: 'activatePortal',
    description: 'Activa o añade un nuevo portal/canal al ecosistema de PaperTopBCN (ej. TikTok, Amazon KDP, Canva, Etsy, YouTube Shorts).',
    parameters: {
      type: Type.OBJECT,
      properties: {
        portalId: {
          type: Type.STRING,
          description: 'Identificador en minúsculas: tiktok, amazon_kdp, canva, etsy, youtube_shorts, teachers_pay_teachers.',
        },
        name: {
          type: Type.STRING,
          description: 'Nombre visible del portal, ej. "TikTok Kids & Printables", "Amazon KDP".',
        },
        handle: {
          type: Type.STRING,
          description: 'Usuario o identificador del canal, ej. "@papertopbcn".',
        },
        autoPublishRule: {
          type: Type.STRING,
          description: 'Regla de autopublicación configurada para este portal.',
        },
      },
      required: ['portalId', 'name', 'handle'],
    },
  },
  {
    name: 'proposeBusinessImprovement',
    description: 'Registra una sugerencia estratégica o mejora accionable para hacer prosperar el negocio PaperTopBCN.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'Título de la mejora o sugerencia de crecimiento.',
        },
        impact: {
          type: Type.STRING,
          description: 'Impacto estimado en ventas/conversión.',
        },
        channel: {
          type: Type.STRING,
          description: 'Canal principal: Multicanal, Amazon KDP, Gumroad, Instagram/TikTok, Pinterest, o Catálogo.',
        },
        recommendation: {
          type: Type.STRING,
          description: 'Explicación concreta de qué hacer y cómo el Agente IA de PaperTopBCN lo automatiza.',
        },
      },
      required: ['title', 'impact', 'channel', 'recommendation'],
    },
  },
];

const platformDraftSchema = {
  type: Type.OBJECT,
  properties: {
    postText: { type: Type.STRING },
    imageSuggestion: { type: Type.STRING },
    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
    bestTime: { type: Type.STRING },
  },
  required: ['postText', 'imageSuggestion', 'hashtags', 'bestTime'],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS so static FTP deployments on /PTB can call the backend API seamlessly
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  app.use(express.json({ limit: '5mb' }));

  // 0. Download Ready-to-Upload FTP ZIP Bundle (/PTB)
  app.get(['/api/ptb/download-ftp-zip', '/api/polsia/download-ftp-zip'], (_req, res) => {
    try {
      const distDir = path.join(__dirname, 'dist');
      const files = collectFilesRecursively(distDir);

      // Ensure .htaccess is included inside the ZIP root for Apache / FileZilla /PTB
      const htaccessPath = path.join(__dirname, 'public', '.htaccess');
      if (fs.existsSync(htaccessPath) && !files.some((f) => f.name === '.htaccess')) {
        files.push({
          name: '.htaccess',
          data: fs.readFileSync(htaccessPath),
        });
      }

      // Add a LEEME_FTP_PTB.txt guide right inside the ZIP
      const readmeText = `===================================================================
PAPERTOPBCN (PTB) — PAQUETE WEB COMPILADO LISTO PARA SUBIR POR FTP
===================================================================

INSTRUCCIONES PARA FILEZILLA (CARPETA /PTB):
1. Descomprime este archivo ZIP en tu ordenador.
2. Abre FileZilla y entra en tu carpeta "/PTB" (la que aparece junto a wp-admin y wp-content).
3. Arrastra TODOS los archivos descomprimidos (index.html, .htaccess y la carpeta assets/) dentro de "/PTB".
4. Abre en tu navegador: https://tudominio.com/PTB/

Nota: Todas las rutas de CSS y JS están compiladas de forma relativa ("./assets/...") para que funcionen inmediatamente dentro de /PTB/ sin necesidad de configuración adicional.
`;
      files.push({
        name: 'LEEME_FTP_PTB.txt',
        data: Buffer.from(readmeText, 'utf8'),
      });

      const zipBuf = createZipBuffer(files);
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="PaperTopBCN_FTP_PTB.zip"'
      );
      res.send(zipBuf);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Error al generar el ZIP para FTP';
      res.status(500).json({ error: msg });
    }
  });

  // 1. PaperTopBCN AI Agent Chat + Automation Function Calling
  app.post(['/api/ptb/chat', '/api/polsia/chat'], async (req, res) => {
    const startTime = Date.now();
    try {
      const { message, context } = req.body;
      const ai = getGenAI();

      const systemPrompt = `Eres el Agente Autónomo de Inteligencia Artificial y centro de mando oficial de "PaperTopBCN (PTB)" (https://papertopbcn.com/PTB).
PaperTopBCN es una marca de productos digitales educativos, creativos e imprimibles para niños (cuadernos de actividades Montessori, libros para colorear en Amazon KDP, flashcards bilingües, busy books, plantillas editables en Canva, recursos para docentes y familias).

Reglas estrictas:
- Hablas en español claro, ejecutivo y directo.
- NUNCA uses nombres externos antiguos (toda referencia es exclusivamente "PaperTopBCN" o "Agente PTB").
- Ejecutas acciones reales usando tus herramientas (crear tareas, autopublicar o programar posts basados en tendencias en X, Instagram, Pinterest, Reddit, TikTok, añadir productos al catálogo de Gumroad/Amazon KDP/Canva, activar nuevos portales o proponer mejoras de negocio).

Contexto actual de PaperTopBCN:
${JSON.stringify(context || {}, null, 2)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: systemPrompt,
          tools: [{ functionDeclarations: ptbFunctions }],
          temperature: 0.7,
        },
      });

      const functionCalls = response.functionCalls || [];
      let replyText = response.text || '';

      if (!replyText && functionCalls.length > 0) {
        const actionSummaries = functionCalls.map((fc) => {
          const args = fc.args as Record<string, unknown>;
          if (fc.name === 'createTask') return `tarea creada: "${args.title}"`;
          if (fc.name === 'publishOrScheduleSocialPost') return `publicación en ${String(args.portalId).toUpperCase()} (${args.status})`;
          if (fc.name === 'addCatalogProduct') return `producto añadido al catálogo: "${args.title}" (€${args.price})`;
          if (fc.name === 'activatePortal') return `portal conectado: ${args.name}`;
          if (fc.name === 'proposeBusinessImprovement') return `mejora estratégica registrada: "${args.title}"`;
          return fc.name;
        });
        replyText = `He ejecutado automáticamente los cambios solicitados para **PaperTopBCN**: ${actionSummaries.join(', ')}. Todo ha quedado sincronizado en tu panel en tiempo real.`;
      }

      const thinkingSeconds = Math.max(2, Math.round((Date.now() - startTime) / 1000));
      res.json({
        reply: replyText,
        actions: functionCalls.map((fc) => ({
          name: fc.name,
          args: fc.args,
        })),
        thinkingSeconds,
      });
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al conectar con el Agente IA de PaperTopBCN';
      console.error('Error in /api/ptb/chat:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 2. Daily Trends Detection + Rich Drafts
  app.post(['/api/ptb/detect-trends', '/api/polsia/detect-trends'], async (req, res) => {
    try {
      const { activePortals, focusTopic } = req.body;
      const ai = getGenAI();

      const prompt = `Detecta 3 tendencias de alto potencial para HOY en el sector de productos digitales para niños, imprimibles educativos, Montessori en casa, libros de actividades en Amazon KDP, plantillas infantiles en Canva y recursos para maestros/familias (PaperTopBCN).
${focusTopic ? `Enfoque especial solicitado por el usuario: "${focusTopic}".` : ''}
Portales activos: ${(activePortals || ['X', 'Instagram', 'Gumroad', 'Reddit', 'Pinterest', 'Amazon KDP', 'Canva', 'TikTok']).join(', ')}.

Devuelve un JSON con 3 tendencias accionables. Para cada tendencia incluye tanto "autoPosts" como "richDrafts" completos (postText, imageSuggestion descriptiva, array de hashtags relevantes y bestTime) para X, Instagram, Pinterest y TikTok.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trends: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    growthBadge: { type: Type.STRING },
                    sourcePlatform: { type: Type.STRING },
                    whyItWorks: { type: Type.STRING },
                    recommendedProductIdea: { type: Type.STRING },
                    autoPosts: {
                      type: Type.OBJECT,
                      properties: {
                        x: { type: Type.STRING },
                        instagram: { type: Type.STRING },
                        pinterest: { type: Type.STRING },
                        reddit: { type: Type.STRING },
                        tiktok: { type: Type.STRING },
                      },
                      required: ['x', 'instagram', 'pinterest', 'reddit', 'tiktok'],
                    },
                    richDrafts: {
                      type: Type.OBJECT,
                      properties: {
                        x: platformDraftSchema,
                        instagram: platformDraftSchema,
                        pinterest: platformDraftSchema,
                        tiktok: platformDraftSchema,
                      },
                      required: ['x', 'instagram', 'pinterest', 'tiktok'],
                    },
                  },
                  required: [
                    'id',
                    'title',
                    'growthBadge',
                    'sourcePlatform',
                    'whyItWorks',
                    'recommendedProductIdea',
                    'autoPosts',
                    'richDrafts',
                  ],
                },
              },
            },
            required: ['trends'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{"trends":[]}');
      res.json(parsed);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al detectar tendencias diarias';
      console.error('Error in /api/ptb/detect-trends:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 3. Dedicated AI Content Generator & Scheduler Studio Endpoint
  app.post(['/api/ptb/generate-drafts', '/api/polsia/generate-drafts'], async (req, res) => {
    try {
      const { topic, targetProduct, platforms, tone } = req.body;
      const ai = getGenAI();

      const prompt = `Genera borradores de publicaciones para redes sociales de "PaperTopBCN" (productos digitales educativos y creativos para niños).
Tema / Tendencia: "${topic || 'Aprendizaje sin pantallas con cuadernos imprimibles Montessori'}"
Producto destacado: "${targetProduct || 'Catálogo completo PaperTopBCN (Gumroad + Amazon KDP + Canva)'}"
Tono: "${tone || 'Inspirador, práctico para padres y riguroso para docentes'}"
Plataformas solicitadas: ${(platforms || ['x', 'instagram', 'tiktok', 'pinterest']).join(', ')}.

Para cada plataforma incluye:
- portalId ('x', 'instagram', 'tiktok', 'pinterest', o 'reddit')
- portalName
- content (texto persuasivo adaptado a la red social)
- imageSuggestion (dirección de arte detallada para foto, carrusel Canva o vídeo cenital de 15s)
- hashtags (array de 5 hashtags de alta conversión)
- recommendedSchedule (fecha/hora óptima sugerida ej. "2026-10-05 12:30")`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              drafts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    portalId: { type: Type.STRING },
                    portalName: { type: Type.STRING },
                    content: { type: Type.STRING },
                    imageSuggestion: { type: Type.STRING },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendedSchedule: { type: Type.STRING },
                  },
                  required: [
                    'portalId',
                    'portalName',
                    'content',
                    'imageSuggestion',
                    'hashtags',
                    'recommendedSchedule',
                  ],
                },
              },
            },
            required: ['drafts'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{"drafts":[]}');
      res.json(parsed);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al generar borradores con IA';
      console.error('Error in /api/ptb/generate-drafts:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 4. CRM Targeted Segment Marketing Generator
  app.post(['/api/ptb/crm-campaign', '/api/polsia/crm-campaign'], async (req, res) => {
    try {
      const { segment, customerCount, sampleCustomers, featuredProduct } = req.body;
      const ai = getGenAI();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Redacta una campaña de marketing personalizada para el CRM de PaperTopBCN (productos digitales infantiles).
Segmento objetivo: ${segment} (${customerCount} clientes activos, ej. ${(sampleCustomers || []).join(', ')}).
Producto u oferta destacada: ${featuredProduct || 'Pack Mega Montessori & Licencias Escolares'}.

Devuelve un JSON con:
- subject: Asunto del email / mensaje directo de alta apertura
- body: Cuerpo del mensaje cálido, personalizado y con código de descuento exclusivo
- followUpAction: Acción automática sugerida en el CRM`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              body: { type: Type.STRING },
              followUpAction: { type: Type.STRING },
            },
            required: ['subject', 'body', 'followUpAction'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al generar campaña CRM';
      console.error('Error in /api/ptb/crm-campaign:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 5. Execute Task with AI
  app.post(['/api/ptb/execute-task', '/api/polsia/execute-task'], async (req, res) => {
    try {
      const { task } = req.body;
      const ai = getGenAI();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Ejecuta esta tarea de PaperTopBCN y genera el resultado completo listo para usar en producción:
Título: ${task?.title}
Descripción: ${task?.description}
Categoría: ${task?.category}

Estructura tu entrega con:
1. Resumen ejecutivo de cambios aplicados en PaperTopBCN
2. Entregable completo (copys, estructura de catálogo, keywords KDP/Gumroad o plan de acción concreto)
3. Próximo paso automatizable sugerido`,
        config: {
          systemInstruction: 'Eres el Agente IA oficial de PaperTopBCN. Entregas trabajo terminado, riguroso y accionable para un negocio de productos digitales infantiles.',
        },
      });

      res.json({
        deliverable: response.text || 'Tarea completada y desplegada en PaperTopBCN.',
      });
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al ejecutar la tarea';
      console.error('Error in /api/ptb/execute-task:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 6. Generate Business Growth Suggestions
  app.post(['/api/ptb/generate-suggestions', '/api/polsia/generate-suggestions'], async (req, res) => {
    try {
      const { catalogCount, portals, recentRevenue } = req.body;
      const ai = getGenAI();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analiza el estado actual de PaperTopBCN (productos digitales para niños):
- Productos en catálogo: ${catalogCount || 8}
- Portales conectados: ${(portals || ['X', 'Instagram', 'Gumroad', 'Reddit', 'Pinterest', 'Canva', 'Amazon KDP']).join(', ')}
- Ingresos recientes: €${recentRevenue || 1480}

Genera 3 nuevas sugerencias estratégicas de alto retorno para escalar ventas, automatizar embudos y aprovechar sinergias entre Canva, Gumroad, Amazon KDP, Pinterest, TikTok, Instagram, Reddit y X.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    impact: { type: Type.STRING },
                    channel: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                    automationPrompt: {
                      type: Type.STRING,
                      description: 'Orden exacta para pedirle al Agente IA de PaperTopBCN que ejecute esta mejora en 1 clic.',
                    },
                  },
                  required: ['title', 'impact', 'channel', 'recommendation', 'automationPrompt'],
                },
              },
            },
            required: ['suggestions'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{"suggestions":[]}');
      res.json(parsed);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al generar sugerencias de crecimiento';
      console.error('Error in /api/ptb/generate-suggestions:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  // 7. Autonomous Digital Content & Printable File Generator (PDF, EPUB, JPG/SVG) + Action Notification
  app.post('/api/ptb/generate-digital-asset', async (req, res) => {
    try {
      const { title, formatType, ageRange, targetPortals, topic } = req.body;
      const ai = getGenAI();

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Crea de manera 100% autónoma el contenido completo de un producto digital infantil para PaperTopBCN:
Título / Idea: "${title || 'Cuaderno de Actividades Montessori y Cuento Interactivo'}"
Formato solicitado: "${formatType || 'PDF_IMPRIMIBLE'}" (Opciones: PDF_IMPRIMIBLE, EPUB_CUENTO, JPG_FLASHCARDS)
Edad recomendada: "${ageRange || '3–6 años'}"
Portales de destino: ${(targetPortals || ['Gumroad', 'Amazon KDP', 'Pinterest']).join(', ')}
Temática / Tendencia: "${topic || 'Aprendizaje creativo sin pantallas'}"

Devuelve un JSON con:
- assetTitle: Título comercial optimizado
- recommendedFileNameBase: Nombre base exacto sin espacios ni tildes (ej. "PTB_Cuaderno_Montessori_Dinosaurios_3_6_Anos")
- autonomousSummary: Qué ha montado y creado el portal automáticamente ahora mismo (páginas, ejercicios, textos, láminas)
- pages: Array de 4 páginas/láminas completas con { pageNumber, heading, activityInstruction, childContent, illustrationTheme }
- canAutoPublishPortals: Array de portales donde el anuncio/post se autopublicará en cuanto el usuario dé el OK (ej. ["X (Twitter)", "Instagram", "Pinterest", "Reddit", "TikTok"])
- manualActionRequired: Boolean indicando si algún marketplace requiere subir el archivo descargado
- notificationAlert: {
    whatToDo: Qué debe hacer exactamente el usuario con el archivo tras darle el OK (paso a paso claro),
    whereToPublish: En qué URL y pestaña exacta de Gumroad, Amazon KDP, Canva o FTP (/PTB/descargas/) subirlo,
    whatWeNeedFromUser: Qué validación necesitamos del usuario (dar el OK en la previsualización, confirmar precio y arrastrar el archivo con el nombre exacto),
    seoKeywords: 7 palabras clave listas para copiar y pegar en Amazon KDP y Gumroad
  }`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              assetTitle: { type: Type.STRING },
              recommendedFileNameBase: { type: Type.STRING },
              autonomousSummary: { type: Type.STRING },
              pages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    pageNumber: { type: Type.NUMBER },
                    heading: { type: Type.STRING },
                    activityInstruction: { type: Type.STRING },
                    childContent: { type: Type.STRING },
                    illustrationTheme: { type: Type.STRING },
                  },
                  required: ['pageNumber', 'heading', 'activityInstruction', 'childContent', 'illustrationTheme'],
                },
              },
              canAutoPublishPortals: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              manualActionRequired: { type: Type.BOOLEAN },
              notificationAlert: {
                type: Type.OBJECT,
                properties: {
                  whatToDo: { type: Type.STRING },
                  whereToPublish: { type: Type.STRING },
                  whatWeNeedFromUser: { type: Type.STRING },
                  seoKeywords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['whatToDo', 'whereToPublish', 'whatWeNeedFromUser', 'seoKeywords'],
              },
            },
            required: [
              'assetTitle',
              'recommendedFileNameBase',
              'autonomousSummary',
              'pages',
              'canAutoPublishPortals',
              'manualActionRequired',
              'notificationAlert',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Error al generar el archivo digital autónomo';
      console.error('Error in /api/ptb/generate-digital-asset:', errMessage);
      res.status(500).json({ error: errMessage });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PaperTopBCN Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
