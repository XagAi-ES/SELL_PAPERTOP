import React, { useState } from 'react';
import {
  CatalogProduct,
  OrderItem,
  PortalConfig,
  GrowthSuggestion,
} from '../data/initialData';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Filter,
  Calendar,
  Clock,
  MousePointerClick,
  BarChart3,
  Download,
} from 'lucide-react';

interface AnalyticsGrowthViewProps {
  catalog: CatalogProduct[];
  orders: OrderItem[];
  portals: PortalConfig[];
  suggestions: GrowthSuggestion[];
  visitorsCount: number;
  isGeneratingSuggestions: boolean;
  onGenerateMoreSuggestions: () => void;
  onImplementSuggestion: (suggestion: GrowthSuggestion) => void;
  onSimulateLiveSale: () => void;
}

type DateRangePreset = 'TODAY' | '7D' | '30D' | '90D' | 'CUSTOM';

export const AnalyticsGrowthView: React.FC<AnalyticsGrowthViewProps> = ({
  catalog,
  orders,
  portals,
  suggestions,
  visitorsCount,
  isGeneratingSuggestions,
  onGenerateMoreSuggestions,
  onImplementSuggestion,
  onSimulateLiveSale,
}) => {
  const [dateRange, setDateRange] = useState<DateRangePreset>('30D');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-09-04');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-10-04');
  const [channelTypeFilter, setChannelTypeFilter] = useState<string>('TODOS');
  const [channelSearch, setChannelSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'revenue' | 'conversion' | 'ctr' | 'time'>('revenue');

  // Multiplier based on selected date range so metrics dynamically scale
  const rangeMultiplier =
    dateRange === 'TODAY'
      ? 0.08
      : dateRange === '7D'
      ? 0.28
      : dateRange === '30D'
      ? 1
      : dateRange === '90D'
      ? 2.75
      : 1.15;

  const filteredPortals = portals
    .filter((p) => {
      const matchesCat =
        channelTypeFilter === 'TODOS' || p.category === channelTypeFilter;
      const matchesQuery =
        p.name.toLowerCase().includes(channelSearch.toLowerCase()) ||
        p.handle.toLowerCase().includes(channelSearch.toLowerCase());
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'conversion') {
        return (b.metrics.conversionRatePct || 0) - (a.metrics.conversionRatePct || 0);
      }
      if (sortBy === 'ctr') {
        return (b.metrics.ctrPct || 0) - (a.metrics.ctrPct || 0);
      }
      if (sortBy === 'time') {
        return (b.metrics.avgTimeOnPageSec || 0) - (a.metrics.avgTimeOnPageSec || 0);
      }
      return b.metrics.revenueEur - a.metrics.revenueEur;
    });

  const totalRevenue = filteredPortals.reduce(
    (acc, p) => acc + p.metrics.revenueEur * rangeMultiplier,
    0
  );
  const totalClicks = filteredPortals.reduce(
    (acc, p) => acc + Math.round(p.metrics.monthlyClicks * rangeMultiplier),
    0
  );
  const totalImpressions = filteredPortals.reduce(
    (acc, p) => acc + Math.round((p.metrics.impressions || 35000) * rangeMultiplier),
    0
  );
  const avgCtr =
    filteredPortals.length > 0
      ? filteredPortals.reduce((acc, p) => acc + (p.metrics.ctrPct || 5.2), 0) /
        filteredPortals.length
      : 5.5;
  const avgConversionRate =
    filteredPortals.length > 0
      ? filteredPortals.reduce((acc, p) => acc + (p.metrics.conversionRatePct || 4.5), 0) /
        filteredPortals.length
      : 4.8;
  const avgTimeSeconds =
    filteredPortals.length > 0
      ? Math.round(
          filteredPortals.reduce((acc, p) => acc + (p.metrics.avgTimeOnPageSec || 195), 0) /
            filteredPortals.length
        )
      : 205;

  const formatSecondsToMinSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}m ${rem < 10 ? '0' : ''}${rem}s`;
  };

  const maxChannelRev = Math.max(
    ...filteredPortals.map((p) => p.metrics.revenueEur * rangeMultiplier),
    1
  );

  const handleExportCsv = () => {
    const headers = 'Canal,Handle,Impresiones,Clics,CTR %,Tiempo en Pagina (s),Conversion %,Ingresos EUR\n';
    const rows = filteredPortals
      .map(
        (p) =>
          `"${p.name}","${p.handle}",${Math.round(
            (p.metrics.impressions || 30000) * rangeMultiplier
          )},${Math.round(p.metrics.monthlyClicks * rangeMultiplier)},${
            p.metrics.ctrPct || 5.1
          },${p.metrics.avgTimeOnPageSec || 190},${p.metrics.conversionRatePct || 4.5},${(
            p.metrics.revenueEur * rangeMultiplier
          ).toFixed(2)}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `papertopbcn_analytics_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6 text-slate-200">
      {/* Header & Date Range Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" /> OBSERVABILIDAD COMERCIAL & MÉTRICAS DE ENGAGEMENT EN TIEMPO REAL
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Dashboard Analítico Avanzado Multicanal — PaperTopBCN
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ventas en tiempo real, CTR, tiempo medio en página y tasa de conversión para X, Instagram, Gumroad, Reddit, Pinterest, TikTok, Amazon KDP y Canva.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onSimulateLiveSale}
            className="cortx-btn-emerald px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap"
          >
            + SIMULAR VENTA EN TIEMPO REAL
          </button>
          <button
            onClick={handleExportCsv}
            className="cortx-btn px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" /> EXPORTAR CSV
          </button>
        </div>
      </div>

      {/* Date Range & Channel Filter Bar */}
      <div className="cortx-panel p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Date Presets + Custom Picker */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-code text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> RANGO:
          </span>
          {(
            [
              { id: 'TODAY', label: 'Hoy (En Vivo)' },
              { id: '7D', label: 'Últimos 7 Días' },
              { id: '30D', label: 'Últimos 30 Días' },
              { id: '90D', label: 'Trimestre (90D)' },
              { id: 'CUSTOM', label: 'Personalizado' },
            ] as const
          ).map((preset) => (
            <button
              key={preset.id}
              onClick={() => setDateRange(preset.id)}
              className={`px-3 py-1.5 font-mono-code text-xs rounded whitespace-nowrap ${
                dateRange === preset.id ? 'cortx-btn-primary' : 'cortx-btn'
              }`}
            >
              {preset.label}
            </button>
          ))}

          {dateRange === 'CUSTOM' && (
            <div className="flex items-center gap-1.5 font-mono-code text-xs ml-1">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2 py-1 text-white"
              />
              <span className="text-slate-500">→</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2 py-1 text-white"
              />
            </div>
          )}
        </div>

        {/* Channel Category & Sort Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-code text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> FILTRAR CANAL:
          </span>
          {['TODOS', 'SOCIAL', 'MARKETPLACE', 'DISEÑO'].map((cat) => (
            <button
              key={cat}
              onClick={() => setChannelTypeFilter(cat)}
              className={`px-2.5 py-1.5 font-mono-code text-xs rounded ${
                channelTypeFilter === cat ? 'cortx-btn-primary' : 'cortx-btn'
              }`}
            >
              {cat}
            </button>
          ))}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'revenue' | 'conversion' | 'ctr' | 'time')
            }
            className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2.5 py-1.5 font-mono-code text-xs text-white"
          >
            <option value="revenue">Ordenar: Ingresos (€)</option>
            <option value="conversion">Ordenar: Conversión (%)</option>
            <option value="ctr">Ordenar: CTR (%)</option>
            <option value="time">Ordenar: Tiempo en Página</option>
          </select>
        </div>
      </div>

      {/* 4 Primary Engagement & Revenue KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cortx-panel p-4 space-y-1">
          <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400">
            <span>INGRESOS EN TIEMPO REAL</span>
            <span className="text-emerald-400">● LIVE</span>
          </div>
          <div className="font-mono-code text-3xl font-bold text-white">
            €{totalRevenue.toFixed(2)}
          </div>
          <div className="font-mono-code text-xs text-emerald-400">
            +34.2% vs periodo anterior · {orders.length} pedidos recientes
          </div>
        </div>

        <div className="cortx-panel p-4 space-y-1">
          <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400">
            <span>CLICK-THROUGH RATE (CTR MEDIO)</span>
            <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-cyan-400">
            {avgCtr.toFixed(2)}%
          </div>
          <div className="font-mono-code text-xs text-slate-400">
            {totalClicks.toLocaleString('es-ES')} clics de {totalImpressions.toLocaleString('es-ES')} impresiones
          </div>
        </div>

        <div className="cortx-panel p-4 space-y-1">
          <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400">
            <span>TIEMPO MEDIO EN PÁGINA</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-white">
            {formatSecondsToMinSec(avgTimeSeconds)}
          </div>
          <div className="font-mono-code text-xs text-purple-300">
            Alta retención en fichas con vista previa PDF
          </div>
        </div>

        <div className="cortx-panel p-4 space-y-1">
          <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400">
            <span>TASA DE CONVERSIÓN MULTICANAL</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-mono-code text-3xl font-bold text-emerald-400">
            {avgConversionRate.toFixed(2)}%
          </div>
          <div className="font-mono-code text-xs text-slate-400">
            Líderes: Gumroad (6.42%) y Amazon KDP (5.90%)
          </div>
        </div>
      </div>

      {/* Main Channel Attribution & Engagement Matrix Table */}
      <div className="cortx-panel overflow-hidden">
        <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              Rendimiento Detallado por Canal Integrado (X, Instagram, Gumroad, Reddit, Pinterest, TikTok, Amazon KDP, Canva)
            </h2>
            <p className="text-xs text-slate-400">
              Comparativa en vivo de impresiones, CTR, tiempo en página, tasa de conversión e ingresos atribuidos.
            </p>
          </div>
          <input
            type="text"
            value={channelSearch}
            onChange={(e) => setChannelSearch(e.target.value)}
            placeholder="Filtrar canal por nombre..."
            className="bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-1.5 text-xs font-mono-code text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E1322] font-mono-code text-[11px] text-slate-400 uppercase">
                <th className="py-3 px-4">CANAL / PORTAL</th>
                <th className="py-3 px-4 text-right">IMPRESIONES</th>
                <th className="py-3 px-4 text-right">CLICS</th>
                <th className="py-3 px-4 text-right">CTR (%)</th>
                <th className="py-3 px-4 text-right">TIEMPO EN PÁGINA</th>
                <th className="py-3 px-4 text-right">CONVERSIÓN (%)</th>
                <th className="py-3 px-4 text-right">INGRESOS (€)</th>
                <th className="py-3 px-4 w-44">CUOTA CANAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] font-mono-code text-xs">
              {filteredPortals.map((portal) => {
                const scaledImpressions = Math.round(
                  (portal.metrics.impressions || 32000) * rangeMultiplier
                );
                const scaledClicks = Math.round(
                  portal.metrics.monthlyClicks * rangeMultiplier
                );
                const scaledRev = portal.metrics.revenueEur * rangeMultiplier;
                const ctr = portal.metrics.ctrPct || 5.1;
                const conv = portal.metrics.conversionRatePct || 4.4;
                const timeSec = portal.metrics.avgTimeOnPageSec || 185;
                const barPct = Math.max(5, Math.round((scaledRev / maxChannelRev) * 100));

                return (
                  <tr key={portal.id} className="hover:bg-[#151E31] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-white text-sm">
                        {portal.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {portal.handle} · {portal.category}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-300">
                      {scaledImpressions.toLocaleString('es-ES')}
                    </td>
                    <td className="py-3.5 px-4 text-right text-white font-semibold">
                      {scaledClicks.toLocaleString('es-ES')}
                    </td>
                    <td className="py-3.5 px-4 text-right text-cyan-400 font-semibold">
                      {ctr.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-right text-purple-300">
                      {formatSecondsToMinSec(timeSec)}
                    </td>
                    <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">
                      {conv.toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-4 text-right text-white font-bold">
                      €{scaledRev.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-full h-2 bg-[#0B0F1A] rounded-full overflow-hidden border border-[#24324B]">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Split: Top Performing Digital Products + AI Business Growth Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Products (5 cols) */}
        <div className="lg:col-span-5 cortx-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <h3 className="text-base font-bold text-white">
              Top Recursos Infantiles por Conversión
            </h3>
            <span className="font-mono-code text-xs text-cyan-400">CATÁLOGO ACTIVO</span>
          </div>

          <div className="divide-y divide-[#1E293B]">
            {[...catalog]
              .sort((a, b) => b.revenueEur - a.revenueEur)
              .map((prod, idx) => (
                <div
                  key={prod.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      0{idx + 1}. {prod.title}
                    </div>
                    <div className="font-mono-code text-[11px] text-slate-400 mt-0.5">
                      {prod.category} · {prod.portals.join(' / ')}
                    </div>
                  </div>
                  <div className="text-right font-mono-code shrink-0">
                    <div className="text-sm font-bold text-emerald-400">
                      €{(prod.revenueEur * rangeMultiplier).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {Math.max(1, Math.round(prod.salesCount * rangeMultiplier))} uds.
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* AI Growth Recommendations (7 cols) */}
        <div className="lg:col-span-7 cortx-panel p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
            <div>
              <h3 className="text-base font-bold text-white">
                Motor de Mejoras y Optimización de Conversión con Polsia IA
              </h3>
              <p className="text-xs text-slate-400">
                Recomendaciones basadas en el CTR y conversión actual de tus canales.
              </p>
            </div>
            <button
              onClick={onGenerateMoreSuggestions}
              disabled={isGeneratingSuggestions}
              className="cortx-btn-primary px-3 py-1.5 flex items-center gap-1.5 whitespace-nowrap self-start"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isGeneratingSuggestions ? 'animate-spin' : ''}`}
              />
              {isGeneratingSuggestions ? 'ANALIZANDO...' : 'NUEVAS MEJORAS IA'}
            </button>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {suggestions.map((sug) => (
              <div key={sug.id} className="cortx-card p-4 space-y-2.5">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="text-cyan-400 font-semibold">{sug.channel}</span>
                  <span className="text-emerald-400 font-bold">{sug.impact}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{sug.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sug.recommendation}
                </p>
                <div className="pt-1">
                  {sug.implemented ? (
                    <span className="font-mono-code text-xs text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> IMPLEMENTADO EN EL FLUJO DEL AGENTE
                    </span>
                  ) : (
                    <button
                      onClick={() => onImplementSuggestion(sug)}
                      className="cortx-btn-emerald px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> APROBAR Y AUTOMATIZAR MEJORA
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
