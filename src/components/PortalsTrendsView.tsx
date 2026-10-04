import React, { useState } from 'react';
import {
  PortalConfig,
  TrendItem,
  SocialPostItem,
  CatalogProduct,
} from '../data/initialData';
import {
  Sparkles,
  Send,
  Plus,
  RefreshCw,
  Check,
  Power,
  Layers,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  Hash,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface PortalsTrendsViewProps {
  portals: PortalConfig[];
  trends: TrendItem[];
  posts: SocialPostItem[];
  catalog: CatalogProduct[];
  isDetectingTrends: boolean;
  onTogglePortalConnection: (id: string) => void;
  onTogglePortalAutoPublish: (id: string) => void;
  onUpdatePortalSchedule: (id: string, schedule: string, handle: string) => void;
  onDetectDailyTrends: (focusTopic?: string) => void;
  onAutoPublishTrend: (trend: TrendItem, selectedPortals: string[]) => void;
  onCreateProductFromTrend: (trend: TrendItem) => void;
  onOpenNewCapabilityModal: () => void;
  onTriggerPortalInteraction: (portal: PortalConfig, interactionName: string) => void;
  onAddDraftPosts: (drafts: SocialPostItem[]) => void;
  onApproveAndPublishPost: (postId: string, mode: 'PUBLISH_NOW' | 'SCHEDULE', scheduledTime?: string) => void;
  onDeletePost: (postId: string) => void;
}

export const PortalsTrendsView: React.FC<PortalsTrendsViewProps> = ({
  portals,
  trends,
  posts,
  catalog,
  isDetectingTrends,
  onTogglePortalConnection,
  onTogglePortalAutoPublish,
  onUpdatePortalSchedule,
  onDetectDailyTrends,
  onAutoPublishTrend,
  onCreateProductFromTrend,
  onOpenNewCapabilityModal,
  onTriggerPortalInteraction,
  onAddDraftPosts,
  onApproveAndPublishPost,
  onDeletePost,
}) => {
  const [focusTopic, setFocusTopic] = useState('');
  const [selectedTrendPlatformTab, setSelectedTrendPlatformTab] = useState<
    Record<string, 'x' | 'instagram' | 'pinterest' | 'tiktok'>
  >({});

  // AI Content Studio Generator State
  const [studioTopic, setStudioTopic] = useState(
    'Actividades Montessori de Otoño y Halloween sin sustos para niños de 3 a 6 años'
  );
  const [studioProduct, setStudioProduct] = useState(
    catalog[0]?.title || 'Pack Mega Montessori Otoño & Bosque'
  );
  const [studioPlatforms, setStudioPlatforms] = useState<string[]>([
    'x',
    'instagram',
    'tiktok',
    'pinterest',
  ]);
  const [isGeneratingStudioDrafts, setIsGeneratingStudioDrafts] = useState(false);
  const [queueFilter, setQueueFilter] = useState<string>('TODOS');
  const [customScheduleMap, setCustomScheduleMap] = useState<Record<string, string>>({});

  // Portal Edit State
  const [editingPortalId, setEditingPortalId] = useState<string | null>(null);
  const [editHandle, setEditHandle] = useState('');
  const [editSchedule, setEditSchedule] = useState('');

  const handleToggleStudioPlatform = (plat: string) => {
    setStudioPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  const handleGenerateAiDrafts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingStudioDrafts(true);
    try {
      const response = await fetch('/api/polsia/generate-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: studioTopic,
          targetProduct: studioProduct,
          platforms: studioPlatforms.length > 0 ? studioPlatforms : ['x', 'instagram', 'tiktok', 'pinterest'],
        }),
      });
      const data = await response.json();
      if (data.drafts && Array.isArray(data.drafts)) {
        const createdDrafts: SocialPostItem[] = data.drafts.map(
          (
            d: {
              portalId: string;
              portalName: string;
              content: string;
              imageSuggestion: string;
              hashtags: string[];
              recommendedSchedule: string;
            },
            idx: number
          ) => {
            const matched =
              portals.find((p) => p.id === d.portalId.toLowerCase()) || portals[0];
            return {
              id: `draft-${Date.now()}-${idx}`,
              portalId: matched.id,
              portalName: d.portalName || matched.name,
              handle: matched.handle,
              content: d.content,
              imageSuggestion: d.imageSuggestion,
              hashtags: d.hashtags,
              scheduledFor: d.recommendedSchedule || '2026-10-05 12:30',
              timestamp: d.recommendedSchedule || 'Pendiente de aprobación',
              status: 'PENDIENTE_APROBACIÓN',
              trendSource: studioTopic,
              metrics: { impressions: 0, clicks: 0, ctrPct: 0, conversions: 0 },
            };
          }
        );
        onAddDraftPosts(createdDrafts);
        setQueueFilter('PENDIENTE_APROBACIÓN');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingStudioDrafts(false);
    }
  };

  const handleStartEditPortal = (portal: PortalConfig) => {
    setEditingPortalId(portal.id);
    setEditHandle(portal.handle);
    setEditSchedule(portal.dailySchedule);
  };

  const handleSavePortalEdit = (id: string) => {
    onUpdatePortalSchedule(id, editSchedule, editHandle);
    setEditingPortalId(null);
  };

  const filteredPosts = posts.filter(
    (p) => queueFilter === 'TODOS' || p.status === queueFilter
  );

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 text-slate-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> ESTUDIO DE GENERACIÓN IA, PROGRAMACIÓN Y PORTALES CONECTADOS
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Generador IA de Contenido Social, Aprobación y Tendencias Diarias
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analiza tendencias infantiles del día, genera borradores con sugerencia visual y hashtags para X, Instagram, TikTok y Pinterest, y aprueba su programación o autopublicación.
          </p>
        </div>

        <button
          onClick={onOpenNewCapabilityModal}
          className="cortx-btn-primary px-4 py-2.5 flex items-center gap-1.5 whitespace-nowrap self-start"
        >
          <Plus className="w-4 h-4" /> AÑADIR PORTAL (TIKTOK, KDP, ETSY...)
        </button>
      </div>

      {/* =====================================================================
          SECTION 1: AI CONTENT GENERATION & SCHEDULING STUDIO
      ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: AI Campaign Draft Composer (5 cols) */}
        <form
          onSubmit={handleGenerateAiDrafts}
          className="lg:col-span-5 cortx-panel p-5 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">
                Estudio IA: Generar Borradores Multicanal
              </h2>
            </div>
            <span className="font-mono-code text-[11px] text-emerald-400">
              TEXTO + IMAGEN + HASHTAGS
            </span>
          </div>

          <div>
            <label className="block font-mono-code text-[11px] text-slate-400 uppercase mb-1">
              Tendencia o Tema Infantil del Día
            </label>
            <textarea
              rows={2}
              value={studioTopic}
              onChange={(e) => setStudioTopic(e.target.value)}
              placeholder="Ej. Rutinas visuales de mañana sin rabietas o dibujos Bold & Easy..."
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block font-mono-code text-[11px] text-slate-400 uppercase mb-1">
              Producto del Catálogo PaperTopBCN a Promocionar
            </label>
            <select
              value={studioProduct}
              onChange={(e) => setStudioProduct(e.target.value)}
              className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
            >
              {catalog.map((prod) => (
                <option key={prod.id} value={prod.title}>
                  {prod.title} (€{prod.priceEur.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono-code text-[11px] text-slate-400 uppercase mb-1.5">
              Plataformas Objetivo:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'x', label: 'X (Twitter)' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'tiktok', label: 'TikTok' },
                { id: 'pinterest', label: 'Pinterest' },
                { id: 'reddit', label: 'Reddit' },
              ].map((plat) => (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => handleToggleStudioPlatform(plat.id)}
                  className={`px-3 py-1.5 font-mono-code text-xs rounded ${
                    studioPlatforms.includes(plat.id)
                      ? 'cortx-btn-primary'
                      : 'cortx-btn'
                  }`}
                >
                  {studioPlatforms.includes(plat.id) ? '✓ ' : '+ '}
                  {plat.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGeneratingStudioDrafts}
            className="cortx-btn-primary w-full py-2.5 px-4 flex items-center justify-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isGeneratingStudioDrafts ? 'animate-spin' : ''}`}
            />
            {isGeneratingStudioDrafts
              ? 'GENERANDO TEXTO, SUGERENCIA DE IMAGEN Y HASHTAGS...'
              : 'GENERAR BORRADORES PARA APROBACIÓN'}
          </button>
        </form>

        {/* Right: Approval Queue & Scheduler Calendar (7 cols) */}
        <div className="lg:col-span-7 cortx-panel p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-3">
            <div>
              <h2 className="text-base font-bold text-white">
                Cola de Aprobación, Programación y Autopublicación ({filteredPosts.length})
              </h2>
              <p className="text-xs text-slate-400">
                Revisa el texto, la dirección de arte sugerida y los hashtags antes de programar o autopublicar.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'TODOS', label: 'Todos' },
                { id: 'PENDIENTE_APROBACIÓN', label: 'Por Aprobar' },
                { id: 'PROGRAMADO', label: 'Programados' },
                { id: 'PUBLICADO', label: 'Publicados' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setQueueFilter(tab.id)}
                  className={`px-2.5 py-1 font-mono-code text-[11px] rounded ${
                    queueFilter === tab.id ? 'cortx-btn-primary' : 'cortx-btn'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPosts.map((post) => {
              const scheduleVal =
                customScheduleMap[post.id] || post.scheduledFor || '2026-10-05T12:30';
              return (
                <div key={post.id} className="cortx-card p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono-code text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{post.portalName}</span>
                      <span className="text-slate-400">{post.handle}</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        post.status === 'PUBLICADO'
                          ? 'text-emerald-400'
                          : post.status === 'PROGRAMADO'
                          ? 'text-cyan-400'
                          : 'text-amber-400'
                      }`}
                    >
                      ● {post.status} · {post.timestamp}
                    </span>
                  </div>

                  {/* Post Copy */}
                  <p className="text-sm text-white leading-relaxed">{post.content}</p>

                  {/* AI Visual / Image Suggestion */}
                  {post.imageSuggestion && (
                    <div className="bg-[#0B0F1A] border border-[#24324B] rounded p-2.5 text-xs text-slate-300 flex items-start gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-300 font-mono-code text-[11px] block">
                          SUGERENCIA DE IMAGEN / VÍDEO IA:
                        </strong>
                        {post.imageSuggestion}
                      </div>
                    </div>
                  )}

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 flex-wrap">
                      <Hash className="w-3.5 h-3.5 text-slate-500" />
                      {post.hashtags.join('  ')}
                    </div>
                  )}

                  {/* Approval & Scheduling Controls */}
                  <div className="border-t border-[#24324B] pt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono-code text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="datetime-local"
                        value={scheduleVal.replace(' ', 'T').slice(0, 16)}
                        onChange={(e) =>
                          setCustomScheduleMap((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2 py-1 text-xs text-white"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {post.status !== 'PUBLICADO' && (
                        <>
                          <button
                            onClick={() =>
                              onApproveAndPublishPost(post.id, 'SCHEDULE', scheduleVal)
                            }
                            className="cortx-btn px-3 py-1.5 flex items-center gap-1"
                          >
                            <Clock className="w-3 h-3 text-cyan-400" /> APROBAR Y PROGRAMAR
                          </button>
                          <button
                            onClick={() =>
                              onApproveAndPublishPost(post.id, 'PUBLISH_NOW')
                            }
                            className="cortx-btn-emerald px-3 py-1.5 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> APROBAR Y AUTOPUBLICAR AHORA
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="cortx-btn px-2.5 py-1.5 text-rose-400"
                      >
                        DESCARTAR
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: DAILY TREND RADAR FOR CHILDREN'S DIGITAL PRODUCTS
      ===================================================================== */}
      <section className="space-y-4">
        <div className="cortx-panel p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">
                Radar Diario de Tendencias Infantiles Detectadas
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Cada tendencia incluye texto adaptado, sugerencia de imagen/vídeo y hashtags para X, Instagram, Pinterest y TikTok.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={focusTopic}
              onChange={(e) => setFocusTopic(e.target.value)}
              placeholder="Filtrar temática (ej. Montessori, KDP, dislexia, emociones)..."
              className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white min-w-[260px]"
            />
            <button
              onClick={() => onDetectDailyTrends(focusTopic)}
              disabled={isDetectingTrends}
              className="cortx-btn-primary px-4 py-2 flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isDetectingTrends ? 'animate-spin' : ''}`}
              />
              {isDetectingTrends ? 'ANALIZANDO TENDENCIAS...' : 'ESCANEAR TENDENCIAS HOY'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {trends.map((trend) => {
            const activePlat = selectedTrendPlatformTab[trend.id] || 'instagram';
            const richDraft = trend.richDrafts?.[activePlat];
            return (
              <div
                key={trend.id}
                className="cortx-card p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono-code text-xs border-b border-[#24324B] pb-2">
                    <span className="text-cyan-400">{trend.sourcePlatform}</span>
                    <span className="text-emerald-400 font-bold">{trend.growthBadge}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {trend.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {trend.whyItWorks}
                  </p>

                  {/* Platform Draft Tabs */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1 border-b border-[#24324B] pb-1.5">
                      {(['instagram', 'x', 'pinterest', 'tiktok'] as const).map((plat) => (
                        <button
                          key={plat}
                          onClick={() =>
                            setSelectedTrendPlatformTab((prev) => ({
                              ...prev,
                              [trend.id]: plat,
                            }))
                          }
                          className={`px-2.5 py-1 font-mono-code text-[10px] uppercase rounded ${
                            activePlat === plat
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-semibold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {plat}
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-3 space-y-2 text-xs">
                      <p className="text-slate-200 leading-relaxed">
                        “{richDraft?.postText || trend.autoPosts[activePlat]}”
                      </p>
                      {richDraft?.imageSuggestion && (
                        <div className="text-[11px] text-purple-300 border-t border-[#1E293B] pt-1.5">
                          <strong>Imagen sugerida:</strong> {richDraft.imageSuggestion}
                        </div>
                      )}
                      {richDraft?.hashtags && (
                        <div className="font-mono-code text-[10px] text-cyan-400">
                          {richDraft.hashtags.join(' ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#24324B]">
                  <button
                    onClick={() =>
                      onAutoPublishTrend(trend, ['x', 'instagram', 'pinterest', 'tiktok'])
                    }
                    className="cortx-btn-primary w-full py-2 px-3 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> APROBAR Y AUTOPUBLICAR EN REDES
                  </button>
                  <button
                    onClick={() => onCreateProductFromTrend(trend)}
                    className="cortx-btn w-full py-1.5 px-3 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> CREAR PRODUCTO DESDE TENDENCIA
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTEGRATED PORTALS CONFIGURATION MATRIX
      ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <h2 className="text-lg font-bold text-white">
            Portales Conectados y Reglas de Autopublicación ({portals.filter((p) => p.connected).length} Activos)
          </h2>
          <span className="font-mono-code text-xs text-slate-400">
            X · INSTAGRAM · GUMROAD · PINTEREST · REDDIT · CANVA · AMAZON KDP · TIKTOK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portals.map((portal) => {
            const isEditing = editingPortalId === portal.id;
            return (
              <div
                key={portal.id}
                className="cortx-card p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            portal.connected ? 'bg-emerald-400' : 'bg-slate-500'
                          }`}
                        />
                        <h3 className="text-lg font-bold text-white">{portal.name}</h3>
                        <span className="font-mono-code text-xs text-cyan-400">
                          · {portal.category}
                        </span>
                      </div>
                      <p className="font-mono-code text-xs text-slate-400 mt-0.5">
                        {portal.handle} · Horario: {portal.dailySchedule}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onTogglePortalConnection(portal.id)}
                        className={`px-2.5 py-1 ${
                          portal.connected ? 'cortx-btn-emerald' : 'cortx-btn'
                        }`}
                      >
                        <Power className="w-3 h-3 inline mr-1" />
                        {portal.connected ? 'ACTIVO' : 'CONECTAR'}
                      </button>
                      <button
                        onClick={() =>
                          isEditing
                            ? handleSavePortalEdit(portal.id)
                            : handleStartEditPortal(portal)
                        }
                        className="cortx-btn px-2.5 py-1"
                      >
                        {isEditing ? 'GUARDAR' : 'EDITAR'}
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="bg-[#0B0F1A] border border-[#2E3F5C] rounded p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono-code text-[10px] text-slate-400 uppercase mb-1">
                          Handle / URL
                        </label>
                        <input
                          type="text"
                          value={editHandle}
                          onChange={(e) => setEditHandle(e.target.value)}
                          className="w-full bg-[#151E31] border border-[#2E3F5C] rounded px-2.5 py-1 text-xs font-mono-code text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono-code text-[10px] text-slate-400 uppercase mb-1">
                          Horario Autopublicación
                        </label>
                        <input
                          type="text"
                          value={editSchedule}
                          onChange={(e) => setEditSchedule(e.target.value)}
                          className="w-full bg-[#151E31] border border-[#2E3F5C] rounded px-2.5 py-1 text-xs font-mono-code text-white"
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-300">{portal.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {portal.interactionCapabilities.map((cap) => (
                      <button
                        key={cap}
                        onClick={() => onTriggerPortalInteraction(portal, cap)}
                        className="cortx-btn px-2.5 py-1 text-[10px] flex items-center gap-1"
                      >
                        <Layers className="w-3 h-3 text-cyan-400" /> {cap}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#24324B] pt-3 flex items-center justify-between font-mono-code text-xs">
                  <span className="text-slate-400">
                    CTR: <strong className="text-cyan-400">{portal.metrics.ctrPct || 5.5}%</strong> · Conv:{' '}
                    <strong className="text-emerald-400">
                      {portal.metrics.conversionRatePct || 4.8}%
                    </strong>
                  </span>
                  <button
                    onClick={() => onTogglePortalAutoPublish(portal.id)}
                    className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1 ${
                      portal.autoPublish ? 'cortx-btn-emerald' : 'cortx-btn'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {portal.autoPublish ? 'AUTOPUBLICACIÓN: ON' : 'AUTOPUBLICACIÓN: OFF'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
