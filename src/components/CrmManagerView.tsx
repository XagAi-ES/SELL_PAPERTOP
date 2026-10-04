import React, { useState } from 'react';
import {
  CrmCustomer,
  CrmSegment,
  CrmInteraction,
  OrderItem,
  CatalogProduct,
} from '../data/initialData';
import {
  Users,
  Search,
  Plus,
  Mail,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  Send,
  RefreshCw,
  CheckCircle2,
  UserPlus,
} from 'lucide-react';

interface CrmManagerViewProps {
  customers: CrmCustomer[];
  orders: OrderItem[];
  catalog: CatalogProduct[];
  onAddCustomer: (customer: Omit<CrmCustomer, 'id' | 'interactions'>) => void;
  onLogInteraction: (customerId: string, interaction: Omit<CrmInteraction, 'id' | 'timestamp'>) => void;
  onSendSegmentToAgent: (prompt: string) => void;
}

const SEGMENT_LABELS: Record<CrmSegment, string> = {
  VIP_RECURRENTE: 'VIP / Recurrentes',
  COLEGIOS_DOCENTES: 'Colegios y Docentes',
  FAMILIAS_MONTESSORI: 'Familias Montessori',
  COMPRADORES_KDP_GUMROAD: 'Compradores KDP & Gumroad',
  NUEVOS_LEADS: 'Nuevos Leads',
};

export const CrmManagerView: React.FC<CrmManagerViewProps> = ({
  customers,
  orders,
  catalog,
  onAddCustomer,
  onLogInteraction,
  onSendSegmentToAgent,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    customers[0]?.id || ''
  );
  const [showNewCustomerModal, setShowNewCustomerModal] = useState<boolean>(false);

  // Interaction logger state
  const [newIntType, setNewIntType] = useState<CrmInteraction['type']>('EMAIL');
  const [newIntChannel, setNewIntChannel] = useState<string>('Email Directo');
  const [newIntSummary, setNewIntSummary] = useState<string>('');

  // AI Segment Campaign Generator state
  const [isGeneratingCampaign, setIsGeneratingCampaign] = useState<boolean>(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<{
    subject: string;
    body: string;
    followUpAction: string;
  } | null>(null);

  // New Customer Form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('Docente de Primaria / Infantil');
  const [newCountry, setNewCountry] = useState('ES');
  const [newSegment, setNewSegment] = useState<CrmSegment>('COLEGIOS_DOCENTES');
  const [newChannel, setNewChannel] = useState('Gumroad');
  const [newNotes, setNewNotes] = useState('');

  const filteredCustomers = customers.filter((c) => {
    const matchesSeg = selectedSegment === 'TODOS' || c.segment === selectedSegment;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organizationOrRole.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeg && matchesSearch;
  });

  const activeCustomer =
    customers.find((c) => c.id === selectedCustomerId) ||
    filteredCustomers[0] ||
    customers[0];

  // Match orders from Order Management System for this customer
  const customerOrders = orders.filter(
    (o) =>
      o.customerId === activeCustomer?.id ||
      o.customerEmail.toLowerCase() === activeCustomer?.email.toLowerCase()
  );

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCustomer || !newIntSummary.trim()) return;
    onLogInteraction(activeCustomer.id, {
      type: newIntType,
      channel: newIntChannel,
      summary: newIntSummary.trim(),
    });
    setNewIntSummary('');
  };

  const handleGenerateAiSegmentCampaign = async () => {
    setIsGeneratingCampaign(true);
    try {
      const targetSeg =
        selectedSegment === 'TODOS'
          ? activeCustomer?.segment || 'COLEGIOS_DOCENTES'
          : (selectedSegment as CrmSegment);
      const segCustomers = customers.filter((c) => c.segment === targetSeg);
      const response = await fetch('/api/polsia/crm-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          segment: SEGMENT_LABELS[targetSeg] || targetSeg,
          customerCount: Math.max(1, segCustomers.length),
          sampleCustomers: segCustomers.slice(0, 3).map((c) => c.name),
          featuredProduct: catalog[0]?.title || 'Pack Mega Montessori Otoño',
        }),
      });
      const data = await response.json();
      if (data.subject) {
        setGeneratedCampaign(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingCampaign(false);
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    onAddCustomer({
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+34 600 000 000',
      organizationOrRole: newRole.trim(),
      country: newCountry,
      segment: newSegment,
      acquisitionChannel: newChannel,
      totalSpentEur: 0,
      ordersCount: 0,
      lastPurchaseDate: 'Nuevo Lead',
      favoriteCategory: 'Cuadernos Montessori',
      tags: [newChannel, SEGMENT_LABELS[newSegment]],
      notes: newNotes.trim() || 'Contacto registrado en CRM PaperTopBCN.',
    });
    setNewName('');
    setNewEmail('');
    setNewNotes('');
    setShowNewCustomerModal(false);
  };

  const totalLtv = customers.reduce((acc, c) => acc + c.totalSpentEur, 0);

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <Users className="w-4 h-4" /> CRM INTEGRADO CON GESTIÓN DE PEDIDOS Y MARKETING SEGMENTADO
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            CRM de Clientes, Escuelas y Familias — PaperTopBCN
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona contactos, historial de compras digitales en Gumroad/KDP/Canva, segmentación inteligente y registro de todas las interacciones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleGenerateAiSegmentCampaign}
            disabled={isGeneratingCampaign}
            className="cortx-btn-emerald px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingCampaign ? 'animate-spin' : ''}`} />
            {isGeneratingCampaign ? 'REDACTANDO CAMPAÑA...' : 'GENERAR CAMPAÑA IA POR SEGMENTO'}
          </button>

          <button
            onClick={() => setShowNewCustomerModal(true)}
            className="cortx-btn-primary px-4 py-2 flex items-center gap-1.5 whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" /> NUEVO CONTACTO / ESCUELA
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="cortx-panel p-4">
          <span className="font-mono-code text-[11px] text-slate-400 uppercase">
            CLIENTES Y COLEGIOS EN CRM
          </span>
          <div className="font-mono-code text-2xl font-bold text-white mt-1">
            {customers.length} contactos
          </div>
          <span className="text-xs text-emerald-400">Sincronizados con Pedidos</span>
        </div>

        <div className="cortx-panel p-4">
          <span className="font-mono-code text-[11px] text-slate-400 uppercase">
            VALOR TOTAL DE VIDA (LTV)
          </span>
          <div className="font-mono-code text-2xl font-bold text-cyan-400 mt-1">
            €{totalLtv.toFixed(2)}
          </div>
          <span className="text-xs text-slate-400">
            Media: €{(totalLtv / Math.max(1, customers.length)).toFixed(2)} / cliente
          </span>
        </div>

        <div className="cortx-panel p-4">
          <span className="font-mono-code text-[11px] text-slate-400 uppercase">
            SEGMENTO COLEGIOS / DOCENTES
          </span>
          <div className="font-mono-code text-2xl font-bold text-white mt-1">
            {customers.filter((c) => c.segment === 'COLEGIOS_DOCENTES').length} centros
          </div>
          <span className="text-xs text-amber-400">Alto potencial Licencias Aula</span>
        </div>

        <div className="cortx-panel p-4">
          <span className="font-mono-code text-[11px] text-slate-400 uppercase">
            INTERACCIONES REGISTRADAS
          </span>
          <div className="font-mono-code text-2xl font-bold text-white mt-1">
            {customers.reduce((acc, c) => acc + c.interactions.length, 0)} eventos
          </div>
          <span className="text-xs text-emerald-400">Email, Soporte PDF y Redes</span>
        </div>
      </div>

      {/* AI Generated Targeted Marketing Campaign Banner */}
      {generatedCampaign && (
        <div className="cortx-panel border-cyan-500/50 p-5 space-y-3 bg-[#131C31]">
          <div className="flex items-center justify-between border-b border-[#24324B] pb-2">
            <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" /> CAMPAÑA SEGMENTADA GENERADA POR POLSIA IA
            </div>
            <button
              onClick={() => setGeneratedCampaign(null)}
              className="font-mono-code text-xs text-slate-400 hover:text-white"
            >
              CERRAR [X]
            </button>
          </div>

          <div className="text-sm font-bold text-white">
            Asunto: <span className="text-cyan-300">{generatedCampaign.subject}</span>
          </div>
          <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-[#0B0F1A] p-3.5 rounded border border-[#1E293B]">
            {generatedCampaign.body}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="font-mono-code text-xs text-emerald-400">
              Seguimiento sugerido: {generatedCampaign.followUpAction}
            </span>
            <button
              onClick={() => {
                if (activeCustomer) {
                  onLogInteraction(activeCustomer.id, {
                    type: 'CAMPANA_IA',
                    channel: 'Email Segmentado IA',
                    summary: `Campaña enviada: "${generatedCampaign.subject}"`,
                  });
                }
                onSendSegmentToAgent(
                  `Envía y automatiza la campaña de CRM "${generatedCampaign.subject}" para el segmento seleccionado.`
                );
                setGeneratedCampaign(null);
              }}
              className="cortx-btn-primary px-4 py-1.5 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> ENVIAR CAMPAÑA Y REGISTRAR EN CRM
            </button>
          </div>
        </div>
      )}

      {/* Segment Filter Bar + Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedSegment('TODOS')}
            className={`px-3 py-1.5 font-mono-code text-xs rounded ${
              selectedSegment === 'TODOS' ? 'cortx-btn-primary' : 'cortx-btn'
            }`}
          >
            Todos ({customers.length})
          </button>
          {(Object.keys(SEGMENT_LABELS) as CrmSegment[]).map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 font-mono-code text-xs rounded whitespace-nowrap ${
                selectedSegment === seg ? 'cortx-btn-primary' : 'cortx-btn'
              }`}
            >
              {SEGMENT_LABELS[seg]} ({customers.filter((c) => c.segment === seg).length})
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cliente, colegio o email..."
            className="w-full pl-9 pr-3 py-2 bg-[#111827] border border-[#24324B] rounded text-xs text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Master-Detail Split Layout: Left Customer Directory | Right 360° Profile, Orders & Interactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Directory (5 cols) */}
        <div className="lg:col-span-5 cortx-panel overflow-hidden">
          <div className="p-3.5 border-b border-[#1E293B] flex items-center justify-between font-mono-code text-xs text-slate-400">
            <span>DIRECTORIO DE CLIENTES ({filteredCustomers.length})</span>
            <span>LTV / PEDIDOS</span>
          </div>

          <div className="divide-y divide-[#1E293B] max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((cust) => {
              const isSelected = activeCustomer?.id === cust.id;
              return (
                <button
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`w-full p-4 text-left flex items-start justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/30 border-l-2 border-l-cyan-400'
                      : 'hover:bg-[#151E31]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white truncate">
                        {cust.name}
                      </span>
                      <span className="font-mono-code text-[10px] text-cyan-400">
                        · {cust.country}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">
                      {cust.organizationOrRole}
                    </div>
                    <div className="font-mono-code text-[11px] text-slate-500 mt-1">
                      {SEGMENT_LABELS[cust.segment]} · Origen: {cust.acquisitionChannel}
                    </div>
                  </div>

                  <div className="text-right font-mono-code shrink-0">
                    <div className="text-sm font-bold text-emerald-400">
                      €{cust.totalSpentEur.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {cust.ordersCount} compras
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 360° Customer Inspector (7 cols — CortX Activity Flow + Properties style) */}
        {activeCustomer && (
          <div className="lg:col-span-7 space-y-5">
            {/* Customer Header & Properties Card */}
            <div className="cortx-panel p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h2 className="text-xl font-bold text-white">{activeCustomer.name}</h2>
                    <span className="font-mono-code text-xs text-cyan-400">
                      ({SEGMENT_LABELS[activeCustomer.segment]})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeCustomer.organizationOrRole} · {activeCustomer.email} ·{' '}
                    {activeCustomer.phone}
                  </p>
                </div>

                <button
                  onClick={() =>
                    onSendSegmentToAgent(
                      `Prepara un email personalizado para ${activeCustomer.name} (${activeCustomer.organizationOrRole}) ofreciéndole un pack complementario basado en su categoría favorita (${activeCustomer.favoriteCategory}).`
                    )
                  }
                  className="cortx-btn-primary px-3 py-2 flex items-center gap-1.5 whitespace-nowrap self-start"
                >
                  <Sparkles className="w-3.5 h-3.5" /> ACCIÓN IA PERSONALIZADA
                </button>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code text-xs">
                <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2.5">
                  <span className="text-slate-500 block text-[10px]">GASTO ACUMULADO</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    €{activeCustomer.totalSpentEur.toFixed(2)}
                  </span>
                </div>
                <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2.5">
                  <span className="text-slate-500 block text-[10px]">CANAL CAPTACIÓN</span>
                  <span className="text-white font-semibold text-sm">
                    {activeCustomer.acquisitionChannel}
                  </span>
                </div>
                <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2.5">
                  <span className="text-slate-500 block text-[10px]">ÚLTIMA COMPRA</span>
                  <span className="text-white font-semibold text-sm">
                    {activeCustomer.lastPurchaseDate}
                  </span>
                </div>
                <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2.5">
                  <span className="text-slate-500 block text-[10px]">FAVORITO</span>
                  <span className="text-cyan-400 font-semibold text-xs truncate block">
                    {activeCustomer.favoriteCategory}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-[#151E31] border border-[#24324B] rounded p-3">
                <strong className="text-white font-mono-code">Notas CRM:</strong>{' '}
                {activeCustomer.notes}
                <div className="font-mono-code text-[11px] text-cyan-400 mt-1">
                  Etiquetas: {activeCustomer.tags.join(' · ')}
                </div>
              </div>
            </div>

            {/* Integrated Purchase History (Connected to Order Management) */}
            <div className="cortx-panel p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase font-mono-code">
                    Historial de Compras Digitales Sincronizado ({customerOrders.length})
                  </h3>
                </div>
                <span className="font-mono-code text-[11px] text-slate-400">
                  INTEGRADO CON PEDIDOS
                </span>
              </div>

              {customerOrders.length > 0 ? (
                <div className="divide-y divide-[#1E293B] font-mono-code text-xs">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="py-2.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-cyan-400 font-bold mr-2">{ord.orderNumber}</span>
                        <span className="text-white font-sans font-medium">
                          {ord.productTitle}
                        </span>
                        <span className="block text-[11px] text-slate-400">
                          Portal: {ord.portal} · {ord.createdAt} · Estado: {ord.status}
                        </span>
                      </div>
                      <div className="text-emerald-400 font-bold shrink-0">
                        €{ord.amountEur.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 py-2">
                  Este contacto aún no tiene pedidos asociados en la tabla en tiempo real.
                </div>
              )}
            </div>

            {/* Interaction History Timeline & Logger */}
            <div className="cortx-panel p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase font-mono-code">
                    Registro de Interacciones y Comunicaciones ({activeCustomer.interactions.length})
                  </h3>
                </div>
              </div>

              {/* Log New Interaction Form */}
              <form onSubmit={handleLogSubmit} className="space-y-2.5 bg-[#0B0F1A] p-3.5 rounded border border-[#1E293B]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newIntType}
                    onChange={(e) => setNewIntType(e.target.value as CrmInteraction['type'])}
                    className="bg-[#151E31] border border-[#2E3F5C] rounded px-2.5 py-1.5 text-xs font-mono-code text-white"
                  >
                    <option value="EMAIL">EMAIL ENVIADO / RECIBIDO</option>
                    <option value="SOPORTE_PDF">SOPORTE DESCARGA PDF / CANVA</option>
                    <option value="REDES_SOCIALES">MENSAJE INSTAGRAM / X / REDDIT</option>
                    <option value="NOTA_INTERNA">NOTA DE SEGUIMIENTO COMERCIAL</option>
                  </select>

                  <input
                    type="text"
                    value={newIntChannel}
                    onChange={(e) => setNewIntChannel(e.target.value)}
                    placeholder="Canal (ej. Gumroad, Instagram DM, Email...)"
                    className="bg-[#151E31] border border-[#2E3F5C] rounded px-2.5 py-1.5 text-xs font-mono-code text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newIntSummary}
                    onChange={(e) => setNewIntSummary(e.target.value)}
                    placeholder="Registrar nueva interacción, acuerdo escolar o envío de cupón..."
                    className="flex-1 bg-[#151E31] border border-[#2E3F5C] rounded px-3 py-1.5 text-xs text-white"
                  />
                  <button type="submit" className="cortx-btn-primary px-3.5 py-1.5 whitespace-nowrap">
                    + REGISTRAR
                  </button>
                </div>
              </form>

              {/* CortX-style Step-by-Step Timeline */}
              <div className="space-y-3 pl-2 border-l border-[#2E3F5C] ml-2">
                {activeCustomer.interactions.map((inter) => (
                  <div key={inter.id} className="relative pl-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#0B0F1A] absolute -left-[5.5px] top-1.5" />
                    <div className="bg-[#151E31] border border-[#24324B] rounded p-3 space-y-1">
                      <div className="flex items-center justify-between font-mono-code text-[11px]">
                        <span className="text-cyan-400 font-semibold">
                          {inter.type} · {inter.channel}
                        </span>
                        <span className="text-slate-400">{inter.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{inter.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustomer}
            className="cortx-panel max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <h3 className="text-lg font-bold text-white">
                Añadir Nuevo Cliente o Escuela al CRM de PaperTopBCN
              </h3>
              <button
                type="button"
                onClick={() => setShowNewCustomerModal(false)}
                className="cortx-btn px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej. Marc Ribas"
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="marc@escola.cat"
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  Rol / Centro Educativo / Familia
                </label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  Segmento de Marketing
                </label>
                <select
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value as CrmSegment)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
                >
                  {(Object.keys(SEGMENT_LABELS) as CrmSegment[]).map((s) => (
                    <option key={s} value={s}>
                      {SEGMENT_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  Canal de Captación
                </label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs font-mono-code text-white"
                >
                  <option value="Gumroad">Gumroad</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Amazon KDP">Amazon KDP</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Reddit">Reddit</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                </select>
              </div>
              <div>
                <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono-code text-[11px] text-slate-400 mb-1">
                Notas Iniciales
              </label>
              <textarea
                rows={2}
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="Intereses educativos, edades de los niños o necesidades del aula..."
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewCustomerModal(false)}
                className="cortx-btn px-3.5 py-2"
              >
                CANCELAR
              </button>
              <button type="submit" className="cortx-btn-primary px-4 py-2">
                GUARDAR CLIENTE EN CRM
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
