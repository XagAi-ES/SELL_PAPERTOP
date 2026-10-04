import React, { useState } from 'react';
import {
  CatalogProduct,
  OrderItem,
} from '../data/initialData';
import { ProductPrintableThumbnail } from './PolsiaVisuals';
import {
  Plus,
  Search,
  Share2,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Package,
  RefreshCw,
  FileText,
  Trash2,
  ShoppingBag,
} from 'lucide-react';

interface CatalogOrdersViewProps {
  catalog: CatalogProduct[];
  orders: OrderItem[];
  onAddProduct: (product: Omit<CatalogProduct, 'id' | 'sku' | 'salesCount' | 'revenueEur'>) => void;
  onDeleteProduct: (id: string) => void;
  onAutoPublishProduct: (product: CatalogProduct) => void;
  onAskPolsiaAboutProduct: (product: CatalogProduct) => void;
  onSimulateNewOrder: () => void;
  onResendOrderPdf: (order: OrderItem) => void;
}

export const CatalogOrdersView: React.FC<CatalogOrdersViewProps> = ({
  catalog,
  orders,
  onAddProduct,
  onDeleteProduct,
  onAutoPublishProduct,
  onAskPolsiaAboutProduct,
  onSimulateNewOrder,
  onResendOrderPdf,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'CATALOGO' | 'PEDIDOS'>('CATALOGO');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS');
  const [portalOrderFilter, setPortalOrderFilter] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CatalogProduct['category']>('Cuadernos Montessori');
  const [newAgeRange, setNewAgeRange] = useState('3–6 años');
  const [newPrice, setNewPrice] = useState('11.90');
  const [newPortals, setNewPortals] = useState<string[]>(['Gumroad', 'Pinterest', 'Instagram', 'Canva']);
  const [newFormats, setNewFormats] = useState<string[]>(['PDF A4', 'PDF US Letter', 'Plantilla Canva']);

  const filteredCatalog = catalog.filter((item) => {
    const matchesCat = categoryFilter === 'TODOS' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredOrders = orders.filter((ord) => {
    const matchesPortal = portalOrderFilter === 'TODOS' || ord.portal === portalOrderFilter;
    const matchesSearch =
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.productTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPortal && matchesSearch;
  });

  const handleTogglePortal = (portalName: string) => {
    setNewPortals((prev) =>
      prev.includes(portalName) ? prev.filter((p) => p !== portalName) : [...prev, portalName]
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const iconTypes: CatalogProduct['previewIconType'][] = [
      'montessori',
      'dinosaur',
      'flashcards',
      'busybook',
      'emotions',
      'math',
    ];
    const colors = ['#FEF3C7', '#DBEAFE', '#DCFCE7', '#FCE7F3', '#EDE9FE', '#FFEDD5'];
    const randomIndex = catalog.length % iconTypes.length;

    onAddProduct({
      title: newTitle.trim(),
      category: newCategory,
      ageRange: newAgeRange,
      priceEur: parseFloat(newPrice) || 9.90,
      formats: newFormats,
      portals: newPortals.length > 0 ? newPortals : ['Gumroad'],
      status: 'ACTIVO',
      gumroadSlug: `papertopbcn.gumroad.com/l/${newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)}`,
      canvaTemplateUrl: 'canva.com/papertopbcn/template',
      previewColor: colors[randomIndex],
      previewIconType: iconTypes[randomIndex],
    });

    setNewTitle('');
    setShowNewProductForm(false);
  };

  const totalCatalogRevenue = catalog.reduce((acc, item) => acc + item.revenueEur, 0);
  const totalSalesUnits = catalog.reduce((acc, item) => acc + item.salesCount, 0);

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6 text-slate-200">
      {/* Top Header Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#1E293B] pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" /> CATÁLOGO DIGITAL INFANTIL & GESTIÓN DE PEDIDOS INTEGRADA CON CRM
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Catálogo de Recursos y Pedidos en Tiempo Real — PaperTopBCN
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab('CATALOGO')}
            className={`px-3.5 py-2 whitespace-nowrap ${
              activeSubTab === 'CATALOGO' ? 'cortx-btn-primary' : 'cortx-btn'
            }`}
          >
            CATÁLOGO INFANTIL ({catalog.length})
          </button>
          <button
            onClick={() => setActiveSubTab('PEDIDOS')}
            className={`px-3.5 py-2 whitespace-nowrap ${
              activeSubTab === 'PEDIDOS' ? 'cortx-btn-primary' : 'cortx-btn'
            }`}
          >
            PEDIDOS EN VIVO ({orders.length})
          </button>
          <button
            onClick={() => setShowNewProductForm((v) => !v)}
            className="cortx-btn-emerald px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" /> NUEVO RECURSO INFANTIL
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="cortx-panel p-4">
          <div className="font-mono-code text-[11px] text-slate-400 uppercase">
            PRODUCTOS ACTIVOS
          </div>
          <div className="font-mono-code text-2xl font-bold text-white mt-0.5">
            {catalog.length} recursos
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Gumroad · Amazon KDP · Canva
          </div>
        </div>
        <div className="cortx-panel p-4">
          <div className="font-mono-code text-[11px] text-slate-400 uppercase">
            UNIDADES DESCARGADAS
          </div>
          <div className="font-mono-code text-2xl font-bold text-cyan-400 mt-0.5">
            {totalSalesUnits} uds.
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Entrega PDF 100% automatizada</div>
        </div>
        <div className="cortx-panel p-4">
          <div className="font-mono-code text-[11px] text-slate-400 uppercase">
            INGRESOS DE CATÁLOGO
          </div>
          <div className="font-mono-code text-2xl font-bold text-emerald-400 mt-0.5">
            €{totalCatalogRevenue.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Ticket medio: €{(totalCatalogRevenue / Math.max(1, totalSalesUnits)).toFixed(2)}
          </div>
        </div>
        <div className="cortx-panel p-4 flex flex-col justify-between">
          <div className="font-mono-code text-[11px] text-slate-400 uppercase">
            WEBHOOK PEDIDOS + CRM
          </div>
          <button
            onClick={onSimulateNewOrder}
            className="cortx-btn-primary px-3 py-2 mt-1 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" /> SIMULAR PEDIDO EN VIVO
          </button>
        </div>
      </div>

      {/* Collapsible New Product Modal/Form */}
      {showNewProductForm && (
        <form
          onSubmit={handleCreateSubmit}
          className="cortx-panel p-5 space-y-4 border-cyan-500/50"
        >
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h3 className="text-lg font-bold text-white">
              Añadir Nuevo Producto Digital Infantil a PaperTopBCN
            </h3>
            <button
              type="button"
              onClick={() => setShowNewProductForm(false)}
              className="font-mono-code text-xs text-slate-400 hover:text-white"
            >
              CERRAR [X]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                Título del Recurso / Cuaderno Infantil
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej. Cuaderno de Caligrafía y Laberintos Espaciales (PDF + KDP)"
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                Categoría
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CatalogProduct['category'])}
                className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
              >
                <option value="Cuadernos Montessori">Cuadernos Montessori</option>
                <option value="Colorear KDP">Colorear KDP</option>
                <option value="Flashcards Imprimibles">Flashcards Imprimibles</option>
                <option value="Juegos de Aula">Juegos de Aula</option>
                <option value="Plantillas Canva">Plantillas Canva</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                  Edad
                </label>
                <input
                  type="text"
                  value={newAgeRange}
                  onChange={(e) => setNewAgeRange(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block font-mono-code text-xs text-slate-400 uppercase mb-1">
                  Precio (€)
                </label>
                <input
                  type="number"
                  step="0.10"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-2.5 py-2 text-xs font-mono-code text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            <div className="space-y-1.5">
              <span className="block font-mono-code text-xs text-slate-400 uppercase">
                Portales donde se publicará y sincronizará este producto:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Gumroad',
                  'Amazon KDP',
                  'Canva',
                  'Instagram',
                  'Pinterest',
                  'X (Twitter)',
                  'Reddit',
                  'TikTok',
                ].map((portal) => (
                  <button
                    type="button"
                    key={portal}
                    onClick={() => handleTogglePortal(portal)}
                    className={`px-2.5 py-1 text-xs font-mono-code rounded ${
                      newPortals.includes(portal) ? 'cortx-btn-primary' : 'cortx-btn'
                    }`}
                  >
                    {newPortals.includes(portal) ? '✓ ' : '+ '}
                    {portal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNewFormats(['PDF A4', 'KDP 8.5x11"', 'Editable Canva'])}
                className="cortx-btn px-3 py-2"
              >
                INCLUIR KDP + CANVA
              </button>
              <button type="submit" className="cortx-btn-primary px-4 py-2">
                GUARDAR EN CATÁLOGO
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSubTab === 'CATALOGO'
                ? 'Buscar por título, SKU o categoría infantil...'
                : 'Buscar pedido por cliente, #PTB o producto...'
            }
            className="w-full pl-9 pr-3 py-2 bg-[#111827] border border-[#24324B] rounded text-xs text-white"
          />
        </div>

        {activeSubTab === 'CATALOGO' ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              'TODOS',
              'Cuadernos Montessori',
              'Colorear KDP',
              'Flashcards Imprimibles',
              'Juegos de Aula',
              'Plantillas Canva',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1.5 whitespace-nowrap ${
                  categoryFilter === cat ? 'cortx-btn-primary' : 'cortx-btn'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              'TODOS',
              'Gumroad',
              'Amazon KDP',
              'Instagram Shop',
              'Canva Hub',
              'Pinterest',
            ].map((portal) => (
              <button
                key={portal}
                onClick={() => setPortalOrderFilter(portal)}
                className={`px-2.5 py-1.5 whitespace-nowrap ${
                  portalOrderFilter === portal ? 'cortx-btn-primary' : 'cortx-btn'
                }`}
              >
                {portal}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area: Catalog vs Orders */}
      {activeSubTab === 'CATALOGO' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCatalog.map((product) => (
            <div
              key={product.id}
              className="cortx-card p-5 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <ProductPrintableThumbnail
                  type={product.previewIconType}
                  bgColor={product.previewColor}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-code text-slate-400">
                    <span>
                      {product.sku} · {product.category} · {product.ageRange}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {product.status === 'TENDENCIA' ? '🔥 TENDENCIA' : '● ACTIVO'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-1 leading-snug">
                    {product.title}
                  </h3>

                  <div className="text-xs text-slate-400 font-mono-code mt-1.5">
                    Formatos: {product.formats.join(' · ')}
                  </div>

                  <div className="text-xs text-cyan-400 font-mono-code mt-1">
                    Portales: {product.portals.join(' / ')}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#24324B] pt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-4 font-mono-code">
                  <div>
                    <span className="text-[10px] text-slate-400 block">PRECIO</span>
                    <span className="text-sm font-bold text-white">
                      €{product.priceEur.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">VENTAS</span>
                    <span className="text-sm font-semibold text-cyan-400">
                      {product.salesCount} uds.
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">INGRESOS</span>
                    <span className="text-sm font-bold text-emerald-400">
                      €{product.revenueEur.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => onAutoPublishProduct(product)}
                    className="cortx-btn-primary px-2.5 py-1.5 flex items-center gap-1 whitespace-nowrap"
                  >
                    <Share2 className="w-3 h-3" /> AUTOPUBLICAR
                  </button>
                  <button
                    onClick={() => onAskPolsiaAboutProduct(product)}
                    className="cortx-btn px-2.5 py-1.5 flex items-center gap-1 whitespace-nowrap"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" /> OPTIMIZAR IA
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="cortx-btn px-2 py-1.5 text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cortx-panel overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E1322] font-mono-code text-[11px] uppercase text-slate-400">
                <th className="py-3 px-4">PEDIDO</th>
                <th className="py-3 px-4">CLIENTE / ESCUELA (CRM)</th>
                <th className="py-3 px-4">RECURSO DIGITAL INFANTIL</th>
                <th className="py-3 px-4">PORTAL ORIGEN</th>
                <th className="py-3 px-4 text-right">IMPORTE</th>
                <th className="py-3 px-4">ESTADO ENTREGA</th>
                <th className="py-3 px-4 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-xs font-mono-code">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#151E31]">
                  <td className="py-3.5 px-4 font-bold text-cyan-400 whitespace-nowrap">
                    {order.orderNumber}
                    <span className="block text-[10px] font-normal text-slate-400">
                      {order.createdAt} · {order.country}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="font-mono-code text-[11px] text-slate-400">
                      {order.customerEmail}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-sans font-medium text-slate-200 max-w-xs">
                    {order.productTitle}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {order.portal}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 text-right whitespace-nowrap">
                    €{order.amountEur.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {order.status === 'ENTREGADO_PDF' && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PDF ENTREGADO
                      </span>
                    )}
                    {order.status === 'PROCESANDO_KDP' && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5" /> IMPRESIÓN KDP
                      </span>
                    )}
                    {order.status === 'PLANTILLA_CANVA_ENVIADA' && (
                      <span className="text-cyan-400 flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> LINK CANVA ACTIVO
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onResendOrderPdf(order)}
                      className="cortx-btn px-2.5 py-1 inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-cyan-400" /> REENVIAR ACCESO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
