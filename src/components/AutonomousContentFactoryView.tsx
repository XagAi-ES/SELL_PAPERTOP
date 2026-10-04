import React, { useState } from 'react';
import { getApiUrl } from '../utils/api';
import { CatalogProduct } from '../data/initialData';
import {
  BookOpen,
  Image as ImageIcon,
  Sparkles,
  BellRing,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  Printer,
  Eye,
  Edit3,
  ThumbsUp,
  FolderUp,
  FileCheck2,
  Layers,
} from 'lucide-react';
import {
  GeneratedAssetPage,
  renderWorksheetPageSvg,
  ensureCoverAndMin20ExercisePages,
} from '../utils/worksheetSvgEngine';

export type { GeneratedAssetPage };

export interface ActionAlertItem {
  id: string;
  assetTitle: string;
  recommendedFileNameBase: string;
  formatType: 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS';
  ageRange: string;
  suggestedPriceEur: number;
  createdAt: string;
  approvalStatus: 'PENDIENTE_OK' | 'APROBADO_OK';
  autonomousSummary: string;
  canAutoPublishPortals: string[];
  manualActionRequired: boolean;
  whatToDo: string;
  whereToPublish: string;
  whatWeNeedFromUser: string;
  seoKeywords: string[];
  pages: GeneratedAssetPage[];
  resolved: boolean;
}

interface AutonomousContentFactoryViewProps {
  alerts: ActionAlertItem[];
  onAddAlert: (alert: ActionAlertItem) => void;
  onUpdateAlert: (updated: ActionAlertItem) => void;
  onApproveAlertOk: (alertItem: ActionAlertItem) => void;
  onResolveAlert: (id: string) => void;
  onAddCatalogProductFromFactory: (
    product: Omit<CatalogProduct, 'id' | 'sku' | 'salesCount' | 'revenueEur'>
  ) => void;
}

export const AutonomousContentFactoryView: React.FC<AutonomousContentFactoryViewProps> = ({
  alerts,
  onAddAlert,
  onUpdateAlert,
  onApproveAlertOk,
  onResolveAlert,
  onAddCatalogProductFromFactory,
}) => {
  const [titleInput, setTitleInput] = useState(
    'Cuaderno Montessori de Dinosaurios: Grafomotricidad, Sumas Visuales y Recortables'
  );
  const [formatType, setFormatType] = useState<
    'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS'
  >('PDF_IMPRIMIBLE');
  const [ageRange, setAgeRange] = useState('3–6 años');
  const [suggestedPrice, setSuggestedPrice] = useState<number>(11.9);
  const [targetPortals, setTargetPortals] = useState<string[]>([
    'Gumroad',
    'Amazon KDP',
    'Canva',
    'Instagram',
    'Pinterest',
    'TikTok',
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Preview & Edit State before giving OK
  const [activePreviewAlertId, setActivePreviewAlertId] = useState<string>(
    alerts[0]?.id || ''
  );
  const [selectedPageIdx, setSelectedPageIdx] = useState<number>(0);
  const [editingPageMode, setEditingPageMode] = useState<boolean>(false);
  const [viewAllPagesGrid, setViewAllPagesGrid] = useState<boolean>(false);

  const togglePortal = (p: string) => {
    setTargetPortals((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const sanitizeFileNameBase = (raw: string, indexNum: number = alerts.length + 1) => {
    const clean = raw
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 42);
    const prefix = String(indexNum).padStart(2, '0');
    return clean.startsWith('PTB_') ? clean : `PTB_${prefix}_${clean}`;
  };

  const handleGenerateAutonomousAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const response = await fetch(getApiUrl('/api/ptb/generate-digital-asset'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput,
          formatType,
          ageRange,
          targetPortals,
        }),
      });
      const data = await response.json();

      const fileBase = data.recommendedFileNameBase
        ? sanitizeFileNameBase(data.recommendedFileNameBase, alerts.length + 1)
        : sanitizeFileNameBase(data.assetTitle || titleInput, alerts.length + 1);

      const completePages = ensureCoverAndMin20ExercisePages(
        data.assetTitle || titleInput,
        ageRange,
        formatType,
        Array.isArray(data.pages) ? data.pages : []
      );

      const newAlert: ActionAlertItem = {
        id: `alert-${Date.now()}`,
        assetTitle: data.assetTitle || titleInput,
        recommendedFileNameBase: fileBase,
        formatType,
        ageRange,
        suggestedPriceEur: suggestedPrice,
        createdAt: new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        approvalStatus: 'PENDIENTE_OK',
        autonomousSummary:
          data.autonomousSummary ||
          'El Agente IA y el Motor Gráfico Vectorial de PaperTopBCN han montado la Página 0 (Portada Principal) + 20 páginas completas de ejercicios infantiles listas en A4 y KDP 8.5x11".',
        canAutoPublishPortals: Array.isArray(data.canAutoPublishPortals)
          ? data.canAutoPublishPortals
          : ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit', 'TikTok'],
        manualActionRequired: true,
        whatToDo:
          data.notificationAlert?.whatToDo ||
          `1. Revisa la Portada (Página 0) y las 20 páginas de ejercicios arriba y pulsa "DAR EL OK". 2. Descarga el archivo ya nombrado (${fileBase}_Gumroad_A4.pdf o ${fileBase}_KDP_85x11.pdf). 3. Súbelo en Gumroad y Amazon KDP.`,
        whereToPublish:
          data.notificationAlert?.whereToPublish ||
          'Gumroad (app.gumroad.com/products > New Product) · Amazon KDP (kdp.amazon.com > Crear libro de tapa blanda 8.5x11") · FTP (/PTB/descargas/)',
        whatWeNeedFromUser:
          data.notificationAlert?.whatWeNeedFromUser ||
          `1) Que previsualices la Portada (Pág. 0) y las 20 páginas de ejercicios abajo y nos des el "OK". 2) Que confirmes el precio (€${suggestedPrice.toFixed(2)}). 3) Que subas el archivo descargado con el nombre exacto "${fileBase}_Gumroad_A4.pdf" en tu cuenta de Gumroad/KDP.`,
        seoKeywords: Array.isArray(data.notificationAlert?.seoKeywords)
          ? data.notificationAlert.seoKeywords
          : [
              'actividades montessori niños 3 a 6 años',
              'cuaderno imprimible infantil 20 paginas pdf',
              'trazos y preescritura preescolar',
              'educacion emocional infantil',
              'busy book imprimible español',
              'libro colorear trazo grueso kdp',
              'recursos docentes infantil',
            ],
        pages: completePages,
        resolved: false,
      };

      onAddAlert(newAlert);
      setActivePreviewAlertId(newAlert.id);
      setSelectedPageIdx(0);
    } catch (err) {
      console.error(err);
      // Fallback autonomo sin cuota para no bloquear nunca la creacion de Portada + 20 paginas
      const fallbackBase = sanitizeFileNameBase(titleInput, alerts.length + 1);
      const fallbackAlert: ActionAlertItem = {
        id: `alert-${Date.now()}`,
        assetTitle: titleInput,
        recommendedFileNameBase: fallbackBase,
        formatType,
        ageRange,
        suggestedPriceEur: suggestedPrice,
        createdAt: new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        approvalStatus: 'PENDIENTE_OK',
        autonomousSummary:
          'Creado autónomamente con el Motor Gráfico Vectorial Local (0 cuota API): incluye Página 0 (Portada Principal) + 20 páginas completas de ejercicios infantiles.',
        canAutoPublishPortals: ['X (Twitter)', 'Instagram', 'Pinterest', 'Reddit', 'TikTok'],
        manualActionRequired: true,
        whatToDo: `Revisa la Portada (Página 0) y las 20 páginas de ejercicios en el visor, pulsa "DAR EL OK" y descarga ${fallbackBase}_Gumroad_A4.html.`,
        whereToPublish: 'Gumroad · Amazon KDP (8.5x11") · Carpeta FTP /PTB/descargas/',
        whatWeNeedFromUser: 'Tu OK tras previsualizar la Portada (Página 0) y las 20 láminas de ejercicios.',
        seoKeywords: [
          'cuaderno montessori 20 paginas pdf',
          'actividades infantiles imprimir',
          'grafomotricidad y trazos preescolar',
          'recortables tijeras ninos',
          'sumas visuales montessori',
          'libro actividades kdp espanol',
          'papertopbcn recursos educativos',
        ],
        pages: ensureCoverAndMin20ExercisePages(titleInput, ageRange, formatType, []),
        resolved: false,
      };
      onAddAlert(fallbackAlert);
      setActivePreviewAlertId(fallbackAlert.id);
      setSelectedPageIdx(0);
    } finally {
      setIsGenerating(false);
    }
  };

  // Give the user's "OK" to approve the previewed content, push to Catalog, and trigger Social Autopublish
  const handleGiveOkToContent = (item: ActionAlertItem) => {
    const updated: ActionAlertItem = {
      ...item,
      approvalStatus: 'APROBADO_OK',
    };
    onUpdateAlert(updated);
    onApproveAlertOk(updated);

    onAddCatalogProductFromFactory({
      title: item.assetTitle,
      category:
        item.formatType === 'JPG_FLASHCARDS'
          ? 'Flashcards Imprimibles'
          : item.formatType === 'EPUB_CUENTO'
          ? 'Juegos de Aula'
          : 'Cuadernos Montessori',
      ageRange: item.ageRange || '3–6 años',
      priceEur: item.suggestedPriceEur || 11.9,
      formats: [
        item.formatType === 'PDF_IMPRIMIBLE'
          ? 'PDF A4 + KDP 8.5x11"'
          : item.formatType === 'EPUB_CUENTO'
          ? 'EPUB + PDF Interactivo'
          : 'JPG Alta Resolución 300 DPI',
      ],
      portals: ['Gumroad', 'Amazon KDP', 'Canva', ...item.canAutoPublishPortals],
      status: 'TENDENCIA',
      previewColor: '#FEF3C7',
      previewIconType: 'montessori',
    });
  };

  const handleUpdatePageField = (
    alertItem: ActionAlertItem,
    pageIndex: number,
    field: keyof GeneratedAssetPage,
    value: string
  ) => {
    const updatedPages = alertItem.pages.map((p, idx) =>
      idx === pageIndex ? { ...p, [field]: value } : p
    );
    onUpdateAlert({
      ...alertItem,
      pages: updatedPages,
    });
  };

  // --- REAL CLIENT-SIDE FILE GENERATORS WITH EXACT RECOMMENDED FILENAMES ---
  const handleDownloadPrintablePdf = (
    alertItem: ActionAlertItem,
    variant: 'GUMROAD_A4' | 'KDP_85X11'
  ) => {
    const exactFileName =
      variant === 'GUMROAD_A4'
        ? `${alertItem.recommendedFileNameBase}_Gumroad_A4.html`
        : `${alertItem.recommendedFileNameBase}_KDP_Interior_85x11.html`;

    const pageSizeCss = variant === 'GUMROAD_A4' ? 'A4' : '8.5in 11in';

    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${alertItem.recommendedFileNameBase}</title>
  <style>
    @page { size: ${pageSizeCss}; margin: 15mm; }
    body { font-family: 'Georgia', serif; color: #141414; margin: 0; padding: 20px; background: #fff; }
    .print-bar { background: #0B0F1A; color: #fff; padding: 16px 22px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; border-radius: 8px; font-family: sans-serif; border: 2px solid #06B6D4; }
    .print-btn { background: #10B981; color: #000; font-weight: bold; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    .page-sheet { border: 3px solid #141414; border-radius: 12px; padding: 28px; margin-bottom: 28px; page-break-after: always; min-height: 235mm; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; }
    .brand-header { display: flex; justify-content: space-between; border-bottom: 2px dashed #141414; padding-bottom: 10px; font-family: monospace; font-size: 12px; }
    h1 { font-size: 26px; margin: 16px 0 8px 0; }
    .instruction-box { background: #FEF3C7; border: 2px solid #141414; padding: 14px; border-radius: 8px; font-size: 16px; margin: 12px 0; }
    .activity-canvas { border: 2px dashed #64748B; border-radius: 10px; padding: 30px; text-align: center; margin: 18px 0; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .tracing-line { width: 85%; border-bottom: 3px dotted #141414; margin: 18px 0; height: 24px; }
    @media print { .print-bar { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <strong>PaperTopBCN — Maqueta Oficial Lista para Guardar como PDF (${variant === 'GUMROAD_A4' ? 'Formato A4 Gumroad' : 'Formato 8.5x11" Amazon KDP'})</strong><br/>
      <span style="font-size:12px;color:#94A3B8;">Pulsa el botón verde y elige "Guardar como PDF" con el nombre: <strong>${alertItem.recommendedFileNameBase}_${variant === 'GUMROAD_A4' ? 'Gumroad_A4.pdf' : 'KDP_Interior_85x11.pdf'}</strong></span>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ GUARDAR COMO .PDF OFICIAL AHORA</button>
  </div>
  ${alertItem.pages
    .map(
      (p) => `
    <div class="page-sheet">
      <div>
        <div class="brand-header">
          <span>PAPERTOPBCN · RECURSOS INFANTILES (${alertItem.ageRange})</span>
          <span>${p.pageNumber === 0 ? '★ PORTADA PRINCIPAL (PÁGINA 00)' : `EJERCICIO PÁGINA ${String(p.pageNumber).padStart(2, '0')} DE ${alertItem.pages.filter((x) => x.pageNumber > 0).length}`} · ${alertItem.recommendedFileNameBase}</span>
        </div>
        <h1>${p.heading}</h1>
        <div class="instruction-box">
          <strong>Guía Pedagógica (Padres / Docentes):</strong> ${p.activityInstruction}
        </div>
      </div>
      <div class="activity-canvas">
        <p style="font-size:19px;font-weight:bold;max-width:580px;line-height:1.45;margin-bottom:12px;">${p.childContent}</p>
        <div style="width:100%;max-width:640px;margin:0 auto;">
          ${renderWorksheetPageSvg(p, alertItem.assetTitle)}
        </div>
      </div>
      <div class="brand-header" style="border-top:2px solid #141414;border-bottom:none;padding-top:10px;">
        <span>Nombre del peque: ___________________________</span>
        <span>https://papertopbcn.com/PTB</span>
      </div>
    </div>`
    )
    .join('')}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exactFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadEpubFile = (alertItem: ActionAlertItem) => {
    const epubXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <title>${alertItem.assetTitle}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 680px; margin: 40px auto; padding: 0 20px; line-height: 1.7; color: #1E293B; }
    h1, h2 { color: #0F172A; }
    .chapter { border-top: 2px solid #E2E8F0; padding-top: 24px; margin-top: 32px; }
    .activity { background: #F8FAFC; border-left: 4px solid #0284C7; padding: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <h1>${alertItem.assetTitle}</h1>
  <p><em>Creado por PaperTopBCN — Recursos Digitales Educativos (${alertItem.ageRange})</em></p>
  ${alertItem.pages
    .map(
      (p) => `
    <div class="chapter">
      <h2>Capítulo ${p.pageNumber}: ${p.heading}</h2>
      <p>${p.childContent}</p>
      <div style="margin:16px 0;border:2px solid #CBD5E1;border-radius:10px;padding:10px;background:#FFF;">
        ${renderWorksheetPageSvg(p, alertItem.assetTitle)}
      </div>
      <div class="activity">
        <strong>Actividad Interactiva:</strong> ${p.activityInstruction}
      </div>
    </div>`
    )
    .join('')}
</body>
</html>`;

    const blob = new Blob([epubXhtml], { type: 'application/xhtml+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${alertItem.recommendedFileNameBase}_Cuento_Interactivo.epub.xhtml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJpgWorksheet = (alertItem: ActionAlertItem) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, 1200, 1600);

    ctx.strokeStyle = '#141414';
    ctx.lineWidth = 8;
    ctx.strokeRect(48, 48, 1104, 1504);

    ctx.fillStyle = '#FEF3C7';
    ctx.fillRect(52, 52, 1096, 150);
    ctx.strokeRect(52, 52, 1096, 150);

    ctx.fillStyle = '#141414';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(
      `PAPERTOPBCN · ${alertItem.recommendedFileNameBase} (300 DPI)`,
      85,
      108
    );

    ctx.font = 'bold 34px Georgia, serif';
    ctx.fillText(alertItem.assetTitle.slice(0, 50), 85, 165);

    alertItem.pages.slice(0, 3).forEach((page, index) => {
      const topY = 250 + index * 410;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(90, topY, 1020, 370);
      ctx.strokeStyle = '#141414';
      ctx.lineWidth = 4;
      ctx.strokeRect(90, topY, 1020, 370);

      ctx.fillStyle = '#0284C7';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`0${page.pageNumber}. ${page.heading}`, 125, topY + 55);

      ctx.fillStyle = '#334155';
      ctx.font = '22px sans-serif';
      ctx.fillText(
        `Guía: ${page.activityInstruction.slice(0, 74)}`,
        125,
        topY + 110
      );

      ctx.fillStyle = '#141414';
      ctx.font = 'italic 24px Georgia, serif';
      ctx.fillText(`"${page.childContent.slice(0, 68)}"`, 125, topY + 175);

      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(125, topY + 260);
      ctx.lineTo(1050, topY + 260);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(125, topY + 325);
      ctx.lineTo(1050, topY + 325);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    ctx.fillStyle = '#141414';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('https://papertopbcn.com/PTB — Imprime, recorta y aprende jugando', 90, 1520);

    const jpgUrl = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.href = jpgUrl;
    link.download = `${alertItem.recommendedFileNameBase}_Lamina_300dpi.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pendingOkCount = alerts.filter((a) => a.approvalStatus === 'PENDIENTE_OK').length;
  const unresolvedCount = alerts.filter((a) => !a.resolved).length;
  const activePreviewAlert =
    alerts.find((a) => a.id === activePreviewAlertId) || alerts[0];
  const currentPage =
    activePreviewAlert?.pages[selectedPageIdx] || activePreviewAlert?.pages[0];

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 text-slate-200">
      {/* =====================================================================
          HEADER + EXPLANATION OF WHO & HOW CONTENT IS CREATED & ASSEMBLED
      ===================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> FÁBRICA AUTÓNOMA DE CONTENIDO DIGITAL · PREVISUALIZACIÓN Y CONTROL DE OK
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Creación, Previsualización antes del &ldquo;OK&rdquo; y Guía Exacta de Archivos y Subida
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Aquí ves quién monta el contenido, lo previsualizas lámina por lámina antes de dar tu OK, y obtienes el nombre exacto de archivo y dónde colgarlo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start">
          <div className="cortx-btn-amber px-3.5 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{pendingOkCount} PENDIENTES DE TU OK</span>
          </div>
          <div className="cortx-btn px-3.5 py-2 flex items-center gap-2 text-cyan-400">
            <BellRing className="w-4 h-4" />
            <span>{unresolvedCount} POR SUBIR A TIENDAS</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          HOW IT WORKS: WHO CREATES & ASSEMBLES THE CONTENT? (3-STAGE ARCHITECTURE)
      ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cortx-card p-4 border-l-4 border-l-cyan-400 space-y-1.5">
          <div className="font-mono-code text-xs text-cyan-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> PASO 1 · ¿QUIÉN CREA EL CONTENIDO?
          </div>
          <h3 className="text-sm font-bold text-white">
            Agente Pedagógico IA (Gemini 3.8 Flash)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Redacta autónomamente los ejercicios Montessori, cuentos infantiles, instrucciones para padres/maestros, copys para redes sociales y las 7 palabras clave SEO de Amazon KDP y Gumroad.
          </p>
        </div>

        <div className="cortx-card p-4 border-l-4 border-l-purple-400 space-y-1.5">
          <div className="font-mono-code text-xs text-purple-400 font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> PASO 2 · ¿QUIÉN MONTA LAS LÁMINAS Y ARCHIVOS?
          </div>
          <h3 className="text-sm font-bold text-white">
            Motor de Maquetación Nativo de PaperTopBCN
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            El propio portal ensambla automáticamente cada página con cabeceras infantiles, cajas pedagógicas, líneas punteadas de caligrafía y márgenes en <strong>PDF A4</strong>, <strong>Interior KDP 8.5x11&quot;</strong>, <strong>.JPG 300 DPI</strong> y <strong>.EPUB</strong>.
          </p>
        </div>

        <div className="cortx-card p-4 border-l-4 border-l-emerald-400 space-y-1.5">
          <div className="font-mono-code text-xs text-emerald-400 font-bold flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5" /> PASO 3 · PREVISUALIZAR ANTES DE DAR EL &ldquo;OK&rdquo;
          </div>
          <h3 className="text-sm font-bold text-white">
            Tú Revisas, Editas en Vivo y Apruebas en 1 Clic
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Nada se publica a ciegas:</strong> abajo puedes inspeccionar cada lámina como un folio real, corregir cualquier texto y pulsar <strong>&ldquo;DAR EL OK&rdquo;</strong> para publicarlo y descargar el archivo con el nombre exacto.
          </p>
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE FOLIO PREVIEWER & "DAR EL OK" STUDIO
      ===================================================================== */}
      {activePreviewAlert && (
        <section className="cortx-panel p-6 space-y-6 border-cyan-500/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono-code text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Eye className="w-4 h-4" /> VISOR DE PREVISUALIZACIÓN ANTES DE DAR EL OK
                </span>
                <span>·</span>
                {activePreviewAlert.approvalStatus === 'PENDIENTE_OK' ? (
                  <span className="cortx-btn-amber px-2 py-0.5 text-[11px]">
                    ⏳ ESPERANDO TU OK PARA PUBLICAR
                  </span>
                ) : (
                  <span className="cortx-btn-emerald px-2 py-0.5 text-[11px]">
                    ✅ APROBADO CON TU OK · PUBLICADO EN CATÁLOGO Y REDES
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {activePreviewAlert.assetTitle}
              </h2>
            </div>

            {/* Product Switcher + Give OK Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={activePreviewAlert.id}
                onChange={(e) => {
                  setActivePreviewAlertId(e.target.value);
                  setSelectedPageIdx(0);
                }}
                className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
              >
                {alerts.map((a, idx) => (
                  <option key={a.id} value={a.id}>
                    #{idx + 1} · {a.assetTitle.slice(0, 48)} (
                    {a.approvalStatus === 'PENDIENTE_OK' ? 'Pendiente OK' : 'Aprobado ✓'})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setEditingPageMode((v) => !v)}
                className="cortx-btn px-3.5 py-2 flex items-center gap-1.5 text-cyan-300"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {editingPageMode ? 'CERRAR EDICIÓN' : 'EDITAR TEXTOS DE LA LÁMINA'}
              </button>

              {activePreviewAlert.approvalStatus === 'PENDIENTE_OK' ? (
                <button
                  type="button"
                  onClick={() => handleGiveOkToContent(activePreviewAlert)}
                  className="cortx-btn-emerald px-4 py-2 flex items-center gap-2 font-bold shadow-lg"
                >
                  <ThumbsUp className="w-4 h-4" /> ✅ DAR EL OK: APROBAR Y PUBLICAR AHORA
                </button>
              ) : (
                <span className="cortx-btn-emerald px-3.5 py-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> CONTENIDO VALIDADO POR TI
                </span>
              )}
            </div>
          </div>

          {/* Split View: Left Real Paper Folio Preview (7 cols) | Right Exact Filenames & Where to Upload (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Visual A4 Printable Sheet Mockup + Page Tabs (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Top Banner: Who Creates the Graphics & Zero-Quota Guarantee */}
              <div className="bg-[#0B0F1A] border border-emerald-500/40 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="cortx-btn-emerald px-2 py-0.5 font-mono-code text-[10px]">
                    🎨 PORTADA (PÁG. 0) + {activePreviewAlert.pages.filter((p) => p.pageNumber > 0).length} PÁGINAS DE EJERCICIOS
                  </span>
                  <span className="text-slate-300">
                    Solución gráfica vectorial creada e incrustada en las <strong>{activePreviewAlert.pages.length} láminas</strong> (0 cuota API).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewAllPagesGrid((v) => !v)}
                  className="cortx-btn-primary px-3 py-1 font-mono-code text-xs"
                >
                  {viewAllPagesGrid
                    ? '📄 VER LÁMINA INDIVIDUAL EN GRANDE'
                    : `👁️ VER PORTADA + ${activePreviewAlert.pages.filter((p) => p.pageNumber > 0).length} PÁGINAS A LA VEZ`}
                </button>
              </div>

              {/* Page Selector Tabs (Page 0 Cover + 20 Exercise Pages!) */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0B0F1A] p-2.5 rounded-lg border border-[#1E293B]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activePreviewAlert.pages.map((pg, idx) => (
                    <button
                      key={pg.pageNumber}
                      type="button"
                      onClick={() => {
                        setSelectedPageIdx(idx);
                        setViewAllPagesGrid(false);
                      }}
                      className={`px-2.5 py-1.5 rounded font-mono-code text-xs transition-all ${
                        !viewAllPagesGrid && selectedPageIdx === idx
                          ? pg.pageNumber === 0
                            ? 'cortx-btn-amber font-bold'
                            : 'cortx-btn-primary font-bold'
                          : pg.pageNumber === 0
                          ? 'cortx-btn text-amber-300 border-amber-500/50'
                          : 'cortx-btn text-slate-300'
                      }`}
                    >
                      {pg.pageNumber === 0
                        ? '🌟 Pág. 00 · PORTADA'
                        : `Pág. ${String(pg.pageNumber).padStart(2, '0')}`}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setViewAllPagesGrid(false);
                      setSelectedPageIdx((prev) =>
                        prev > 0 ? prev - 1 : activePreviewAlert.pages.length - 1
                      );
                    }}
                    className="cortx-btn px-2.5 py-1 text-xs font-mono-code"
                  >
                    ◀ Ant.
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewAllPagesGrid(false);
                      setSelectedPageIdx((prev) =>
                        prev < activePreviewAlert.pages.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="cortx-btn px-2.5 py-1 text-xs font-mono-code"
                  >
                    Sig. ▶
                  </button>
                </div>
              </div>

              {/* ALL SHEETS GRID MODE OR SINGLE SHEET FOLIO PREVIEW */}
              {viewAllPagesGrid ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[820px] overflow-y-auto pr-1">
                  {activePreviewAlert.pages.map((pg, idx) => (
                    <div
                      key={pg.pageNumber}
                      onClick={() => {
                        setSelectedPageIdx(idx);
                        setViewAllPagesGrid(false);
                      }}
                      className="cursor-pointer bg-[#FFFDF9] text-[#141414] border-2 border-[#141414] rounded-xl p-3.5 shadow-lg hover:border-cyan-500 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-dashed border-[#141414] pb-1 font-mono-code text-[10px] text-slate-700">
                        <span>
                          {pg.pageNumber === 0
                            ? '🌟 PÁGINA 00 · PORTADA PRINCIPAL'
                            : `EJERCICIO PÁGINA ${String(pg.pageNumber).padStart(2, '0')} DE ${activePreviewAlert.pages.filter((p) => p.pageNumber > 0).length}`}
                        </span>
                        <span className="text-sky-700 font-bold">Clic para ampliar ↗</span>
                      </div>
                      <h4 className="text-sm font-bold font-serif text-[#141414] line-clamp-1">
                        {pg.heading}
                      </h4>
                      <div
                        className="w-full overflow-hidden rounded border border-slate-300 bg-white"
                        dangerouslySetInnerHTML={{
                          __html: renderWorksheetPageSvg(pg, activePreviewAlert.assetTitle),
                        }}
                      />
                      <p className="text-[11px] text-slate-700 line-clamp-2 font-serif">
                        {pg.childContent}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                currentPage && (
                  <div className="bg-[#FFFDF9] text-[#141414] border-4 border-[#141414] rounded-xl p-5 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-dashed border-[#141414] pb-2.5 font-mono-code text-xs text-slate-700">
                      <span>PAPERTOPBCN · EDAD: {activePreviewAlert.ageRange}</span>
                      <span className="font-bold text-slate-900">
                        {currentPage.pageNumber === 0
                          ? '🌟 PÁGINA 00 · PORTADA PRINCIPAL OFICIAL'
                          : `EJERCICIO PÁGINA ${String(currentPage.pageNumber).padStart(2, '0')} DE ${activePreviewAlert.pages.filter((p) => p.pageNumber > 0).length} (+ PORTADA PÁG. 0)`}
                      </span>
                    </div>

                    {editingPageMode ? (
                      <div className="space-y-3 bg-slate-100 p-4 rounded-lg border border-slate-300">
                        <div>
                          <label className="block font-mono-code text-[11px] text-slate-700 font-bold mb-1">
                            TÍTULO DE LA LÁMINA:
                          </label>
                          <input
                            type="text"
                            value={currentPage.heading}
                            onChange={(e) =>
                              handleUpdatePageField(
                                activePreviewAlert,
                                selectedPageIdx,
                                'heading',
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-slate-400 rounded px-3 py-1.5 text-sm text-black font-bold"
                          />
                        </div>
                        <div>
                          <label className="block font-mono-code text-[11px] text-slate-700 font-bold mb-1">
                            INSTRUCCIÓN PARA PADRES / MAESTROS:
                          </label>
                          <textarea
                            rows={2}
                            value={currentPage.activityInstruction}
                            onChange={(e) =>
                              handleUpdatePageField(
                                activePreviewAlert,
                                selectedPageIdx,
                                'activityInstruction',
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-slate-400 rounded px-3 py-1.5 text-xs text-black"
                          />
                        </div>
                        <div>
                          <label className="block font-mono-code text-[11px] text-slate-700 font-bold mb-1">
                            CONTENIDO / EJERCICIO PARA EL NIÑO:
                          </label>
                          <textarea
                            rows={2}
                            value={currentPage.childContent}
                            onChange={(e) =>
                              handleUpdatePageField(
                                activePreviewAlert,
                                selectedPageIdx,
                                'childContent',
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-slate-400 rounded px-3 py-1.5 text-xs text-black"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl md:text-2xl font-bold font-serif text-[#141414]">
                          {currentPage.heading}
                        </h3>

                        <div className="bg-[#FEF3C7] border-2 border-[#141414] rounded-lg p-3 text-xs leading-relaxed">
                          <strong className="uppercase font-mono-code block text-[11px] text-amber-900 mb-0.5">
                            Guía Pedagógica para Padres y Maestros:
                          </strong>
                          {currentPage.activityInstruction}
                        </div>

                        <div className="border-2 border-[#141414] rounded-xl p-4 text-center bg-white space-y-3">
                          <p className="text-sm md:text-base font-bold font-serif text-slate-900 max-w-xl mx-auto leading-relaxed">
                            &ldquo;{currentPage.childContent}&rdquo;
                          </p>

                          {/* REAL GRAPHIC SOLUTION CREATED BY PAPERTOPBCN SVG ENGINE */}
                          <div
                            className="w-full overflow-hidden rounded-lg border border-slate-300"
                            dangerouslySetInnerHTML={{
                              __html: renderWorksheetPageSvg(
                                currentPage,
                                activePreviewAlert.assetTitle
                              ),
                            }}
                          />

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono-code text-slate-600">
                            <span>✅ Solución Gráfica Vectorial Creada: {currentPage.illustrationTheme}</span>
                            <span className="text-emerald-700 font-bold">Listo para Imprimir A4 / KDP</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between border-t-2 border-[#141414] pt-2.5 font-mono-code text-[11px] text-slate-700">
                      <span>Nombre: ________________________</span>
                      <span>Archivo: {activePreviewAlert.recommendedFileNameBase}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Right: Exact File Names to Use, Where to Upload & What We Need From You (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B0F1A] border border-[#24324B] rounded-xl p-5 space-y-4">
              <div className="font-mono-code text-xs text-cyan-400 font-bold flex items-center gap-1.5 border-b border-[#1E293B] pb-3">
                <FileCheck2 className="w-4 h-4" /> FICHA EXACTA: QUÉ NOMBRE DE ARCHIVO PONER Y DÓNDE COLGARLO
              </div>

              {/* Exact File Names Table */}
              <div className="space-y-2.5">
                <div className="font-mono-code text-[11px] text-slate-400 uppercase">
                  1. NOMBRES DE ARCHIVO OFICIALES (HAZ CLIC PARA COPIAR O DESCARGAR):
                </div>

                {[
                  {
                    portal: 'Gumroad / Web (/PTB)',
                    filename: `${activePreviewAlert.recommendedFileNameBase}_Gumroad_A4.pdf`,
                    actionLabel: 'Descargar Maqueta A4',
                    onDownload: () =>
                      handleDownloadPrintablePdf(activePreviewAlert, 'GUMROAD_A4'),
                  },
                  {
                    portal: 'Amazon KDP (Interior 8.5x11")',
                    filename: `${activePreviewAlert.recommendedFileNameBase}_KDP_Interior_85x11.pdf`,
                    actionLabel: 'Descargar KDP 8.5x11"',
                    onDownload: () =>
                      handleDownloadPrintablePdf(activePreviewAlert, 'KDP_85X11'),
                  },
                  {
                    portal: 'Pinterest / Instagram / Muestra',
                    filename: `${activePreviewAlert.recommendedFileNameBase}_Lamina_300dpi.jpg`,
                    actionLabel: 'Descargar .JPG 300 DPI',
                    onDownload: () => handleDownloadJpgWorksheet(activePreviewAlert),
                  },
                  {
                    portal: 'Apple Books / Kindle KDP',
                    filename: `${activePreviewAlert.recommendedFileNameBase}_Cuento_Interactivo.epub`,
                    actionLabel: 'Descargar .EPUB',
                    onDownload: () => handleDownloadEpubFile(activePreviewAlert),
                  },
                ].map((fileRow) => (
                  <div
                    key={fileRow.portal}
                    className="bg-[#151E31] border border-[#24324B] rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{fileRow.portal}</span>
                      <button
                        type="button"
                        onClick={() => copyText(fileRow.filename, fileRow.filename)}
                        className="cortx-btn px-2 py-0.5 text-[10px] flex items-center gap-1"
                      >
                        {copiedId === fileRow.filename ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Nombre copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-cyan-400" /> Copiar nombre
                          </>
                        )}
                      </button>
                    </div>

                    <div className="font-mono-code text-[11px] text-emerald-300 bg-[#0B0F1A] px-2.5 py-1.5 rounded border border-[#1E293B] break-all">
                      {fileRow.filename}
                    </div>

                    <button
                      type="button"
                      onClick={fileRow.onDownload}
                      className="w-full cortx-btn-primary py-1.5 text-xs flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" /> {fileRow.actionLabel} con este nombre
                    </button>
                  </div>
                ))}
              </div>

              {/* What we need from user & Where to upload */}
              <div className="bg-[#151E31] border border-amber-500/40 rounded-lg p-3.5 space-y-2 text-xs">
                <div className="font-mono-code text-amber-400 font-bold flex items-center gap-1.5">
                  <FolderUp className="w-4 h-4" /> 2. ¿QUÉ NECESITAMOS DE TI Y DÓNDE SUBIRLO?
                </div>
                <p className="text-slate-200 leading-relaxed">
                  <strong>Lo que necesitamos de ti:</strong> {activePreviewAlert.whatWeNeedFromUser}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Dónde colgarlo exactamente:</strong> {activePreviewAlert.whereToPublish}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 1: AUTONOMOUS DIGITAL CONTENT GENERATOR FORM
      ===================================================================== */}
      <form
        onSubmit={handleGenerateAutonomousAsset}
        className="cortx-panel p-6 space-y-5 border-cyan-500/40"
      >
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              Ordenar al Portal que Monte un Nuevo Producto Digital Infantil (Con Previsualización Previa)
            </h2>
          </div>
          <span className="font-mono-code text-xs text-emerald-400">
            CREA PDF + EPUB + JPG Y NOMBRES DE ARCHIVO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
              Tema o Producto Infantil que el Portal Montará
            </label>
            <input
              type="text"
              required
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Ej. Cuaderno de Caligrafía y Laberintos de Dinosaurios (3-6 años)"
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
              Formato Principal de Salida
            </label>
            <select
              value={formatType}
              onChange={(e) =>
                setFormatType(
                  e.target.value as 'PDF_IMPRIMIBLE' | 'EPUB_CUENTO' | 'JPG_FLASHCARDS'
                )
              }
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2.5 text-xs font-mono-code text-white"
            >
              <option value="PDF_IMPRIMIBLE">📄 PDF Imprimible A4 / KDP</option>
              <option value="EPUB_CUENTO">📖 EPUB Cuento Interactivo</option>
              <option value="JPG_FLASHCARDS">🖼️ JPG Láminas y Flashcards 300 DPI</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
              Edad
            </label>
            <input
              type="text"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2.5 text-xs text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
              Precio (€)
            </label>
            <input
              type="number"
              step="0.10"
              value={suggestedPrice}
              onChange={(e) => setSuggestedPrice(parseFloat(e.target.value) || 9.9)}
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2.5 text-xs font-mono-code text-white"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono-code text-xs text-slate-400 mr-1">
              CANALES DESTINO:
            </span>
            {[
              'Gumroad',
              'Amazon KDP',
              'Canva',
              'Instagram',
              'Pinterest',
              'X (Twitter)',
              'TikTok',
              'Reddit',
            ].map((portal) => (
              <button
                type="button"
                key={portal}
                onClick={() => togglePortal(portal)}
                className={`px-2.5 py-1 font-mono-code text-xs rounded ${
                  targetPortals.includes(portal) ? 'cortx-btn-primary' : 'cortx-btn'
                }`}
              >
                {targetPortals.includes(portal) ? '✓ ' : '+ '}
                {portal}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="cortx-btn-primary px-5 py-2.5 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating
              ? 'MONTANDO LÁMINAS Y NOMBRES DE ARCHIVO...'
              : 'CREAR Y PREVISUALIZAR ANTES DE DAR EL OK'}
          </button>
        </div>
      </form>

      {/* =====================================================================
          SECTION 2: ALL CREATED ASSETS & STEP-BY-STEP UPLOAD NOTIFICATIONS
      ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">
              Cola de Contenidos Creados, Nombres de Archivo y Dónde Colgarlos ({alerts.length})
            </h2>
          </div>
          <span className="font-mono-code text-xs text-slate-400">
            HAZ CLIC EN &ldquo;PREVISUALIZAR&rdquo; O &ldquo;DAR EL OK&rdquo;
          </span>
        </div>

        <div className="space-y-5">
          {alerts.map((item) => (
            <div
              key={item.id}
              className={`cortx-panel p-6 space-y-5 ${
                item.resolved ? 'opacity-75' : 'border-amber-500/50'
              }`}
            >
              {/* Top Row: Status + Title + Preview & Approval Buttons */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
                    {item.approvalStatus === 'PENDIENTE_OK' ? (
                      <span className="cortx-btn-amber px-2.5 py-0.5 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> 1º PASO: PENDIENTE DE TU OK
                      </span>
                    ) : item.resolved ? (
                      <span className="cortx-btn-emerald px-2.5 py-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> SUBIDO Y PUBLICADO EN TODOS LOS PORTALES
                      </span>
                    ) : (
                      <span className="cortx-btn-primary px-2.5 py-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> OK DADO · LISTO PARA SUBIR ARCHIVO
                      </span>
                    )}
                    <span className="text-cyan-400">{item.recommendedFileNameBase}</span>
                    <span className="text-slate-400">· {item.createdAt}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-1.5">
                    {item.assetTitle}
                  </h3>
                </div>

                {/* Action Buttons: Preview, Give OK, Download PDF/JPG/EPUB */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreviewAlertId(item.id);
                      setSelectedPageIdx(0);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="cortx-btn px-3.5 py-2 flex items-center gap-1.5 text-cyan-300"
                  >
                    <Eye className="w-3.5 h-3.5" /> PREVISUALIZAR LÁMINAS
                  </button>

                  {item.approvalStatus === 'PENDIENTE_OK' && (
                    <button
                      type="button"
                      onClick={() => handleGiveOkToContent(item)}
                      className="cortx-btn-emerald px-3.5 py-2 flex items-center gap-1.5 font-bold"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> ✅ DAR EL OK Y APROBAR
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDownloadPrintablePdf(item, 'GUMROAD_A4')}
                    className="cortx-btn-primary px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Printer className="w-3.5 h-3.5" /> PDF ({item.recommendedFileNameBase}.pdf)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadJpgWorksheet(item)}
                    className="cortx-btn px-3 py-2 flex items-center gap-1.5 whitespace-nowrap text-emerald-300"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> .JPG 300 DPI
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadEpubFile(item)}
                    className="cortx-btn px-3 py-2 flex items-center gap-1.5 whitespace-nowrap text-purple-300"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> .EPUB
                  </button>
                </div>
              </div>

              {/* 2-Column Split: Left What Portal Mounted vs Right Exact Instructions & Filenames */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 bg-[#0B0F1A] border border-[#1E293B] rounded-lg p-4 space-y-3">
                  <div className="font-mono-code text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> LO QUE EL PORTAL HA MONTADO PARA TI:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.autonomousSummary}
                  </p>
                  <div className="pt-1">
                    <span className="font-mono-code text-[10px] text-slate-400 uppercase block mb-1">
                      NOMBRE EXACTO DE ARCHIVO RECOMENDADO:
                    </span>
                    <div className="font-mono-code text-xs text-amber-300 bg-[#151E31] px-2.5 py-1.5 rounded border border-amber-500/30 flex items-center justify-between">
                      <span className="truncate">{item.recommendedFileNameBase}_Gumroad_A4.pdf</span>
                      <button
                        type="button"
                        onClick={() =>
                          copyText(
                            `fn-${item.id}`,
                            `${item.recommendedFileNameBase}_Gumroad_A4.pdf`
                          )
                        }
                        className="text-cyan-400 hover:underline ml-2 shrink-0"
                      >
                        {copiedId === `fn-${item.id}` ? '✓ Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#151E31] border border-amber-500/40 rounded-lg p-4 space-y-3">
                  <div className="font-mono-code text-xs text-amber-400 font-bold flex items-center gap-1.5">
                    <BellRing className="w-4 h-4" /> QUÉ NECESITAMOS DE TI, DÓNDE Y CÓMO COLGARLO:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                    <div className="bg-[#0B0F1A] border border-[#24324B] rounded p-3">
                      <strong className="text-cyan-400 font-mono-code block mb-1">
                        1. QUÉ NECESITAMOS:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {item.whatWeNeedFromUser}
                      </p>
                    </div>

                    <div className="bg-[#0B0F1A] border border-[#24324B] rounded p-3">
                      <strong className="text-emerald-400 font-mono-code block mb-1">
                        2. CÓMO SUBIRLO:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">{item.whatToDo}</p>
                    </div>

                    <div className="bg-[#0B0F1A] border border-[#24324B] rounded p-3">
                      <strong className="text-purple-400 font-mono-code block mb-1">
                        3. DÓNDE COLGARLO:
                      </strong>
                      <p className="text-slate-200 leading-relaxed">
                        {item.whereToPublish}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#24324B]">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://app.gumroad.com/products"
                        target="_blank"
                        rel="noreferrer"
                        className="cortx-btn px-2.5 py-1 inline-flex items-center gap-1 text-cyan-300"
                      >
                        Subir a Gumroad <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://kdp.amazon.com/es_ES/bookshelf"
                        target="_blank"
                        rel="noreferrer"
                        className="cortx-btn px-2.5 py-1 inline-flex items-center gap-1 text-amber-300"
                      >
                        Subir a Amazon KDP <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => copyText(item.id, item.seoKeywords.join(', '))}
                        className="cortx-btn px-2.5 py-1 flex items-center gap-1"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> 7 Keywords Copiadas
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-cyan-400" /> Copiar 7 Keywords SEO
                          </>
                        )}
                      </button>
                    </div>

                    {!item.resolved && (
                      <button
                        type="button"
                        onClick={() => onResolveAlert(item.id)}
                        className="cortx-btn-emerald px-3.5 py-1.5 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> MARCAR COMO COLGADO
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
