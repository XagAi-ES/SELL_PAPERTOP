import React, { useState } from 'react';
import { DomainConfig } from '../data/initialData';
import {
  Wallet,
  Calculator,
  Layers,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Server,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface InvestmentsDomainViewProps {
  domainConfig: DomainConfig;
  onUpdateDomainConfig: (updated: DomainConfig) => void;
  onAskAgentAboutInvestment: (prompt: string) => void;
}

interface UnifierTool {
  id: string;
  name: string;
  category: 'AUTOMATIZACIÓN & IA' | 'UNIFICADOR REDES SOCIALES' | 'VENTA DIGITAL & KDP' | 'HOSTING & DOMINIO';
  cheapestPlan: string;
  monthlyCostEur: number;
  unifies: string[];
  verdictForPaperTop: string;
  recommended: boolean;
}

const UNIFIER_TOOLS: UnifierTool[] = [
  {
    id: 'n8n',
    name: 'n8n (Self-Hosted en VPS / Railway)',
    category: 'AUTOMATIZACIÓN & IA',
    cheapestPlan: '€0 (Open Source) o €4.50/mes en VPS Hetzner/Railway',
    monthlyCostEur: 4.5,
    unifies: ['Gemini IA', 'X (Twitter)', 'Instagram', 'Pinterest', 'Reddit', 'Gumroad Webhooks', 'Telegram/Email'],
    verdictForPaperTop:
      'LA OPCIÓN MÁS ECONÓMICA Y POTENTE. A diferencia de Zapier, no te cobra por cada mensaje o post. Unifica el bot de IA con todas tus redes y Gumroad sin límites.',
    recommended: true,
  },
  {
    id: 'make',
    name: 'Make.com (antes Integromat)',
    category: 'AUTOMATIZACIÓN & IA',
    cheapestPlan: 'Gratis (1.000 ops/mes) · Plan Core €9/mes',
    monthlyCostEur: 0,
    unifies: ['Gumroad', 'Instagram', 'Pinterest', 'Canva', 'Google Sheets', 'Gemini API', 'Reddit'],
    verdictForPaperTop:
      'Ideal si no quieres configurar un servidor. Su plan gratuito de 1.000 operaciones/mes te permite autopublicar 2–3 veces al día en todas tus redes a coste €0.',
    recommended: true,
  },
  {
    id: 'metricool',
    name: 'Metricool (Unificador Social Todo-en-Uno)',
    category: 'UNIFICADOR REDES SOCIALES',
    cheapestPlan: 'Gratis (hasta 50 posts/mes) · Starter €14/mes',
    monthlyCostEur: 0,
    unifies: ['Instagram', 'X', 'Pinterest', 'TikTok', 'YouTube Shorts', 'Meta Ads', 'Canva'],
    verdictForPaperTop:
      'La plataforma más cómoda en español para unificar calendario visual, mejores horas de publicación, inbox unificado y analíticas de Instagram, Pinterest, TikTok y X.',
    recommended: true,
  },
  {
    id: 'publer',
    name: 'Publer.io / Buffer',
    category: 'UNIFICADOR REDES SOCIALES',
    cheapestPlan: 'Gratis (3 canales) · Pro €12/mes',
    monthlyCostEur: 12,
    unifies: ['X', 'Instagram Reels', 'Pinterest', 'TikTok', 'Reddit', 'Canva Directo'],
    verdictForPaperTop:
      'Permite diseñar directamente con el botón de Canva integrado y autopublicar en masa mediante CSV o RSS.',
    recommended: false,
  },
  {
    id: 'gumroad_kdp',
    name: 'Gumroad + Amazon KDP + Payhip',
    category: 'VENTA DIGITAL & KDP',
    cheapestPlan: '€0/mes fijo (solo comisión si vendes)',
    monthlyCostEur: 0,
    unifies: ['Entrega PDF Automática', 'Libros Físicos Bajo Demanda Amazon', 'Impuestos IVA Europeo'],
    verdictForPaperTop:
      'Cero riesgo mensual: Gumroad cobra 10% por venta (o Payhip solo 5% por venta con €0 fijo) y Amazon KDP imprime y envía tus cuadernos infantiles sin pagar stock.',
    recommended: true,
  },
  {
    id: 'cloudflare_railway',
    name: 'Cloudflare Registrar + Cloud Run / Railway',
    category: 'HOSTING & DOMINIO',
    cheapestPlan: 'Dominio €0.95/mes (€11/año) + Hosting €0–€5/mes',
    monthlyCostEur: 5,
    unifies: ['Dominio papertopbcn.com', 'Certificado SSL Gratis', 'Servidor Node.js + Gemini Bot'],
    verdictForPaperTop:
      'Cloudflare vende dominios a precio de coste sin subidas el segundo año. Cloud Run o Railway alojan este portal completo por céntimos o en capa gratuita.',
    recommended: true,
  },
];

export const InvestmentsDomainView: React.FC<InvestmentsDomainViewProps> = ({
  domainConfig,
  onUpdateDomainConfig,
  onAskAgentAboutInvestment,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'LEAN' | 'PRO_AUTO' | 'SCALE_ADS'>('LEAN');
  const [avgProductPrice, setAvgProductPrice] = useState<number>(11.9);
  const [expectedMonthlySales, setExpectedMonthlySales] = useState<number>(45);
  const [monthlyAdsBudget, setMonthlyAdsBudget] = useState<number>(0);
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  // Domain edit form
  const [customDomain, setCustomDomain] = useState(domainConfig.customDomain);
  const [supportEmail, setSupportEmail] = useState(domainConfig.supportEmail);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSelectPreset = (preset: 'LEAN' | 'PRO_AUTO' | 'SCALE_ADS') => {
    setSelectedPreset(preset);
    if (preset === 'LEAN') {
      setMonthlyAdsBudget(0);
      setExpectedMonthlySales(35);
    } else if (preset === 'PRO_AUTO') {
      setMonthlyAdsBudget(0);
      setExpectedMonthlySales(75);
    } else {
      setMonthlyAdsBudget(120);
      setExpectedMonthlySales(160);
    }
  };

  // Financial math
  const baseSoftwareCost =
    selectedPreset === 'LEAN' ? 1.5 : selectedPreset === 'PRO_AUTO' ? 25.5 : 37.5;
  const totalFixedInvestment = baseSoftwareCost + monthlyAdsBudget;
  const grossRevenue = expectedMonthlySales * avgProductPrice;
  const marketplaceFees = grossRevenue * 0.08; // Avg between Gumroad/Payhip/Stripe/KDP
  const netProfit = grossRevenue - marketplaceFees - totalFixedInvestment;
  const netPricePerUnitAfterFee = avgProductPrice * 0.92;
  const breakEvenUnits = Math.ceil(totalFixedInvestment / Math.max(1, netPricePerUnitAfterFee));
  const roiPct =
    totalFixedInvestment > 0
      ? Math.round((netProfit / totalFixedInvestment) * 100)
      : 999;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(label);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDomainConfig({
      ...domainConfig,
      customDomain: customDomain.trim() || 'https://papertopbcn.com',
      supportEmail: supportEmail.trim(),
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8 text-slate-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <Wallet className="w-4 h-4" /> PLAN FINANCIERO, UNIFICADORES ECONÓMICOS Y DESPLIEGUE WEB
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Inversiones de Automatización, Herramientas Todo-en-Uno y Guía de Dominio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Descubre cómo automatizar PaperTopBCN desde casi €0/mes, qué plataformas unifican todas tus redes y cómo colgar este portal en tu propio dominio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start">
          <a
            href="/api/ptb/download-ftp-zip"
            download="PaperTopBCN_FTP_PTB.zip"
            className="cortx-btn-emerald px-4 py-2.5 flex items-center gap-2 whitespace-nowrap font-bold"
          >
            <Server className="w-4 h-4" /> 📦 DESCARGAR .ZIP LISTO PARA SUBIR A /PTB (FILEZILLA)
          </a>

          <button
            onClick={() =>
              onAskAgentAboutInvestment(
                'Diseña un plan de inversión mínimo mensual para PaperTopBCN combinando n8n/Make gratis, Metricool, Gumroad y Amazon KDP para alcanzar €1.500/mes.'
              )
            }
            className="cortx-btn-primary px-4 py-2.5 flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" /> CONSULTAR PLAN FINANCIERO AL AGENTE IA
          </button>
        </div>
      </div>

      {/* =====================================================================
          SECTION 0: DIRECT FTP UPLOAD GUIDE FOR YOUR "/PTB" DIRECTORY (FILEZILLA)
      ===================================================================== */}
      <section className="cortx-panel p-6 space-y-5 border-emerald-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
          <div>
            <div className="font-mono-code text-xs text-emerald-400 font-bold uppercase">
              SUBIDA DIRECTA POR FTP (FILEZILLA) · CARPETA /PTB
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              ¿Cómo Subir Este Portal a tu Directorio <code className="text-cyan-400">/PTB</code> en FileZilla?
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              El proyecto ya está compilado con rutas relativas (<code className="text-amber-300">./assets/...</code>) y archivo <code className="text-amber-300">.htaccess</code> incluido para que funcione directamente dentro de tu subcarpeta <strong>/PTB</strong> sin tocar tu WordPress principal.
            </p>
          </div>

          <a
            href="/api/ptb/download-ftp-zip"
            download="PaperTopBCN_FTP_PTB.zip"
            className="cortx-btn-emerald px-5 py-2.5 flex items-center gap-2 whitespace-nowrap self-start font-bold"
          >
            📦 DESCARGAR PaperTopBCN_FTP_PTB.zip
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="cortx-card p-4 space-y-1.5">
            <div className="font-mono-code text-cyan-400 font-bold">
              PASO 1 · DESCARGAR Y DESCOMPRIMIR EL .ZIP
            </div>
            <p className="text-slate-300 leading-relaxed">
              Haz clic en el botón verde <strong>Descargar PaperTopBCN_FTP_PTB.zip</strong> y descomprímelo en una carpeta de tu ordenador. Verás dentro: <code className="text-white">index.html</code>, <code className="text-white">.htaccess</code> y la carpeta <code className="text-white">assets/</code>.
            </p>
          </div>

          <div className="cortx-card p-4 space-y-1.5">
            <div className="font-mono-code text-cyan-400 font-bold">
              PASO 2 · ARRASTRAR EN FILEZILLA A /PTB
            </div>
            <p className="text-slate-300 leading-relaxed">
              En FileZilla (panel derecho <em>Sitio remoto</em>), haz doble clic para entrar dentro de tu carpeta <strong>/PTB</strong> (que ahora dice <em>&ldquo;Directorio vacío&rdquo;</em>) y arrastra ahí dentro los archivos descomprimidos (<code className="text-white">index.html</code>, <code className="text-white">.htaccess</code> y <code className="text-white">assets/</code>).
            </p>
          </div>

          <div className="cortx-card p-4 space-y-1.5">
            <div className="font-mono-code text-cyan-400 font-bold">
              PASO 3 · ENTRAR DESDE TU NAVEGADOR
            </div>
            <p className="text-slate-300 leading-relaxed">
              En cuanto termine la transferencia en FileZilla, abre tu navegador y entra en <strong>https://tudominio.com/PTB/</strong>. El centro de mando cargará al instante conectado automáticamente al motor de IA.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 1: INTERACTIVE INVESTMENT & ROI CALCULATOR
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stack Presets & Sliders (7 cols) */}
        <div className="lg:col-span-7 cortx-panel p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-semibold text-white">
                1. Calculadora de Inversión Mensual y Punto de Equilibrio
              </h2>
            </div>
            <span className="font-mono-code text-xs text-emerald-400">SIMULADOR EN VIVO</span>
          </div>

          {/* 3 Stack Tier Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSelectPreset('LEAN')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedPreset === 'LEAN'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white'
                  : 'bg-[#151E31] border-[#24324B] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="font-mono-code text-[11px] text-emerald-400 font-semibold">
                OPCIÓN A · MÁS ECONÓMICA
              </div>
              <div className="text-lg font-bold text-white mt-0.5">€1.50 / mes</div>
              <div className="text-xs text-slate-400 mt-1">
                Dominio (.com) + Make Free + Metricool Free + Gumroad (€0 fijo) + KDP (€0 fijo)
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('PRO_AUTO')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedPreset === 'PRO_AUTO'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white'
                  : 'bg-[#151E31] border-[#24324B] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="font-mono-code text-[11px] text-cyan-400 font-semibold">
                OPCIÓN B · 100% AUTOMATIZADO
              </div>
              <div className="text-lg font-bold text-white mt-0.5">€25.50 / mes</div>
              <div className="text-xs text-slate-400 mt-1">
                VPS n8n o Make Core (€9) + Metricool/Publer Pro (€12) + Hosting Portal (€4.50)
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('SCALE_ADS')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedPreset === 'SCALE_ADS'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white'
                  : 'bg-[#151E31] border-[#24324B] text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="font-mono-code text-[11px] text-purple-400 font-semibold">
                OPCIÓN C · ESCALA + ADS
              </div>
              <div className="text-lg font-bold text-white mt-0.5">€157.50 / mes</div>
              <div className="text-xs text-slate-400 mt-1">
                Stack Automatizado + Canva Pro (€12) + Meta & Pinterest Ads (€4/día)
              </div>
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono-code mb-1">
                <span className="text-slate-300">PRECIO MEDIO POR CUADERNO / PACK INFANTIL:</span>
                <span className="text-cyan-400 font-bold">€{avgProductPrice.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={4.9}
                max={29.9}
                step={0.5}
                value={avgProductPrice}
                onChange={(e) => setAvgProductPrice(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-code mb-1">
                <span className="text-slate-300">PEDIDOS ESTIMADOS AL MES (GUMROAD + KDP + WEB):</span>
                <span className="text-cyan-400 font-bold">{expectedMonthlySales} ventas/mes</span>
              </div>
              <input
                type="range"
                min={5}
                max={300}
                step={5}
                value={expectedMonthlySales}
                onChange={(e) => setExpectedMonthlySales(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-code mb-1">
                <span className="text-slate-300">PRESUPUESTO OPCIONAL EN META / PINTEREST ADS:</span>
                <span className="text-amber-400 font-bold">€{monthlyAdsBudget}/mes</span>
              </div>
              <input
                type="range"
                min={0}
                max={400}
                step={10}
                value={monthlyAdsBudget}
                onChange={(e) => setMonthlyAdsBudget(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right: Financial Output Properties Card (5 cols - CortX Properties style) */}
        <div className="lg:col-span-5 cortx-panel p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white border-b border-[#1E293B] pb-3">
              Desglose de Inversión vs. Beneficio Neto
            </h3>

            <div className="divide-y divide-[#1E293B] font-mono-code text-xs mt-2">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Software + Dominio + IA</span>
                <span className="text-white">€{baseSoftwareCost.toFixed(2)} / mes</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Inversión Publicitaria (Ads)</span>
                <span className="text-white">€{monthlyAdsBudget.toFixed(2)} / mes</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Inversión Fija Total</span>
                <span className="text-amber-400 font-bold">
                  €{totalFixedInvestment.toFixed(2)} / mes
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Facturación Bruta Estimada</span>
                <span className="text-cyan-400 font-bold">€{grossRevenue.toFixed(2)} / mes</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Comisiones Pasarela (~8% solo si vendes)</span>
                <span className="text-slate-300">-€{marketplaceFees.toFixed(2)}</span>
              </div>
              <div className="py-3 flex justify-between text-sm">
                <span className="text-white font-semibold">Beneficio Neto Mensual</span>
                <span className="text-emerald-400 font-bold">
                  +€{netProfit.toFixed(2)} / mes
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#151E31] border border-emerald-500/30 rounded-lg p-3.5 space-y-1">
            <div className="font-mono-code text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> PUNTO DE EQUILIBRIO (BREAK-EVEN):
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Con este plan solo necesitas vender{' '}
              <strong className="text-white underline">
                {breakEvenUnits} {breakEvenUnits === 1 ? 'cuaderno infantil' : 'cuadernos infantiles'} al mes
              </strong>{' '}
              para pagar el 100% de las herramientas y el dominio. Todo lo demás es beneficio limpio (ROI estimado: {roiPct}%).
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 2: COMPARADOR DE APLICACIONES UNIFICADORAS MÁS ECONÓMICAS
      ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              2. ¿Qué Aplicaciones Unifican Todas las Opciones y Cuáles son las Más Económicas?
            </h2>
          </div>
          <span className="font-mono-code text-xs text-slate-400">
            COMPARATIVA REAL DE MERCADO 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UNIFIER_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="cortx-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 font-mono-code text-[11px]">
                  <span className="text-cyan-400">{tool.category}</span>
                  {tool.recommended && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> RECOMENDADO
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{tool.name}</h3>

                <div className="font-mono-code text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded px-2.5 py-1.5">
                  Coste: {tool.cheapestPlan}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {tool.verdictForPaperTop}
                </p>
              </div>

              <div className="border-t border-[#24324B] pt-3">
                <span className="font-mono-code text-[10px] text-slate-400 uppercase block mb-1">
                  PORTALES QUE UNIFICA:
                </span>
                <div className="text-xs font-mono-code text-slate-200">
                  {tool.unifies.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: STEP-BY-STEP GUIDE — HOW TO HOST THIS PORTAL ON YOUR DOMAIN
      ===================================================================== */}
      <section className="cortx-panel p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">
                3. Cómo Colgar Este Portal en tu Propio Dominio ({domainConfig.customDomain})
              </h2>
              <p className="text-xs text-slate-400">
                Guía práctica paso a paso para publicar esta aplicación Full-Stack (React + Express + Bot IA Gemini) en tu dominio personalizado.
              </p>
            </div>
          </div>
          <span className="font-mono-code text-xs text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> PREPARADO PARA PRODUCCIÓN
          </span>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="cortx-card p-4 space-y-2">
            <div className="font-mono-code text-xs text-cyan-400 font-bold">
              PASO 01 · REGISTRAR DOMINIO
            </div>
            <h3 className="text-sm font-bold text-white">
              Compra papertopbcn.com (~€10/año)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Regístralo en <strong>Cloudflare Registrar</strong>, <strong>Namecheap</strong> o <strong>Porkbun</strong>. Son los más económicos porque no inflan el precio al renovar el segundo año e incluyen privacidad WHOIS y SSL gratis.
            </p>
          </div>

          <div className="cortx-card p-4 space-y-2">
            <div className="font-mono-code text-xs text-cyan-400 font-bold">
              PASO 02 · SUBIR EL SERVIDOR
            </div>
            <h3 className="text-sm font-bold text-white">
              Google Cloud Run o Railway.app
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tienes 2 vías: usar el botón <strong>Deploy / Share</strong> de Google AI Studio (que lo aloja en Cloud Run automáticamente) o exportar el código a GitHub y conectarlo en <strong>Railway.app</strong> o <strong>Render.com</strong>.
            </p>
          </div>

          <div className="cortx-card p-4 space-y-2">
            <div className="font-mono-code text-xs text-cyan-400 font-bold">
              PASO 03 · VARIABLES DE ENTORNO
            </div>
            <h3 className="text-sm font-bold text-white">
              Configurar GEMINI_API_KEY
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              En el panel de tu hosting (Cloud Run / Railway), añade en <em>Variables</em> tu clave <code>GEMINI_API_KEY</code>. El comando de arranque ya está configurado en <code>package.json</code> como <code>npm run build && npm start</code>.
            </p>
          </div>

          <div className="cortx-card p-4 space-y-2">
            <div className="font-mono-code text-xs text-cyan-400 font-bold">
              PASO 04 · APUNTAR LOS DNS
            </div>
            <h3 className="text-sm font-bold text-white">
              Conectar Registro A y CNAME
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              En el panel DNS de tu dominio añade los registros de abajo. En menos de 15 minutos tendrás <code>https://papertopbcn.com</code> funcionando con certificado seguro HTTPS.
            </p>
          </div>
        </div>

        {/* Copyable DNS Table + Live Domain Config Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-7 bg-[#0B0F1A] border border-[#24324B] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between font-mono-code text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-400" /> REGISTROS DNS PARA COPIAR EN TU PROVEEDOR
              </span>
              <span className="text-emerald-400">SSL / HTTPS AUTOMÁTICO</span>
            </div>

            <div className="divide-y divide-[#1E293B] font-mono-code text-xs">
              {[
                { type: 'A', name: '@', value: '216.239.32.21', note: 'Dominio raíz (Cloud Run)' },
                { type: 'CNAME', name: 'www', value: 'ghs.googlehosted.com', note: 'Subdominio www' },
                { type: 'CNAME', name: 'tienda', value: 'domains.gumroad.com', note: 'Tienda Gumroad en subdominio' },
              ].map((rec) => (
                <div
                  key={rec.name}
                  className="py-2.5 flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-cyan-400 font-bold mr-2">{rec.type}</span>
                    <span className="text-white font-semibold mr-2">{rec.name}</span>
                    <span className="text-slate-400">→ {rec.value}</span>
                    <span className="text-[10px] text-slate-500 ml-2">({rec.note})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(rec.value, rec.name)}
                    className="cortx-btn px-2.5 py-1 flex items-center gap-1"
                  >
                    {copiedRecord === rec.name ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> COPIADO
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> COPIAR
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSaveDomain}
            className="lg:col-span-5 bg-[#151E31] border border-[#24324B] rounded-lg p-4 space-y-3"
          >
            <div className="font-mono-code text-xs text-cyan-400 font-semibold uppercase">
              VINCULAR DOMINIO ACTIVO EN EL WORKSPACE
            </div>

            <div>
              <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                URL del Dominio Principal
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
              />
            </div>

            <div>
              <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                Correo de Pedidos y Notificaciones
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {savedBanner ? (
                <span className="font-mono-code text-xs text-emerald-400">
                  ✓ Dominio guardado en PaperTopBCN
                </span>
              ) : (
                <span className="font-mono-code text-[11px] text-slate-400">
                  Estado: Conectado
                </span>
              )}
              <button type="submit" className="cortx-btn-primary px-4 py-2">
                GUARDAR DOMINIO
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
