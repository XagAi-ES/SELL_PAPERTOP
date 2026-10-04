import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  logout,
  encodeGmailRawMessage,
} from '../utils/gmailAuth';
import { ActionAlertItem } from './AutonomousContentFactoryView';
import {
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  X,
  Inbox,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  LogOut,
} from 'lucide-react';

interface GmailMessageSummary {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  bodyText: string;
}

interface GmailConfigManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wizardDomain: string;
  setWizardDomain: (v: string) => void;
  wizardGumroadUrl: string;
  setWizardGumroadUrl: (v: string) => void;
  wizardInstagram: string;
  setWizardInstagram: (v: string) => void;
  wizardX: string;
  setWizardX: (v: string) => void;
  wizardPinterest: string;
  setWizardPinterest: (v: string) => void;
  wizardReddit: string;
  setWizardReddit: (v: string) => void;
  wizardTiktok: string;
  setWizardTiktok: (v: string) => void;
  wizardKdpAuthor: string;
  setWizardKdpAuthor: (v: string) => void;
  wizardLanguage: string;
  setWizardLanguage: (v: string) => void;
  wizardWebhookUrl: string;
  setWizardWebhookUrl: (v: string) => void;
  onSaveWebConfig: () => void;
  approvedAlerts: ActionAlertItem[];
}

export const GoogleSignInButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}> = ({ onClick, disabled, label = 'Sign in with Google' }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="gsi-material-button"
  >
    <div className="gsi-material-button-state" />
    <div className="gsi-material-button-content-wrapper">
      <div className="gsi-material-button-icon">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          style={{ display: 'block' }}
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
      </div>
      <span className="gsi-material-button-contents">{label}</span>
    </div>
  </button>
);

export const GmailConfigManagerModal: React.FC<GmailConfigManagerModalProps> = ({
  isOpen,
  onClose,
  wizardDomain,
  setWizardDomain,
  wizardGumroadUrl,
  setWizardGumroadUrl,
  wizardInstagram,
  setWizardInstagram,
  wizardX,
  setWizardX,
  wizardPinterest,
  setWizardPinterest,
  wizardReddit,
  setWizardReddit,
  wizardTiktok,
  setWizardTiktok,
  wizardKdpAuthor,
  setWizardKdpAuthor,
  wizardLanguage,
  setWizardLanguage,
  wizardWebhookUrl,
  setWizardWebhookUrl,
  onSaveWebConfig,
  approvedAlerts,
}) => {
  const [activeTab, setActiveTab] = useState<'WEB_FORM' | 'GMAIL_SYNC'>('GMAIL_SYNC');
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Gmail Inbox & Send states
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingInbox, setIsLoadingInbox] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  // Email composition fields
  const [recipientEmail, setRecipientEmail] = useState<string>('xagai.contact@gmail.com');
  const [emailSubject, setEmailSubject] = useState<string>(
    'PaperTopBCN — Plantilla de Configuración de Portales y Contenidos Aprobados (PTB_01, PTB_02, PTB_03)'
  );
  const [emailBody, setEmailBody] = useState<string>('');

  // Mandatory Confirmation Dialog before sending email via Gmail API
  const [showSendConfirmDialog, setShowSendConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (loggedInUser) => {
        setUser(loggedInUser);
        setNeedsAuth(false);
        if (loggedInUser.email) {
          setRecipientEmail(loggedInUser.email);
        }
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const defaultBody = `Hola equipo PaperTopBCN,

Aquí tienes el resumen de tus 3 productos digitales aprobados con tu OK y la plantilla de configuración de tus portales (puedes responder a este mismo correo modificando cualquier dato para que el portal lo lea automáticamente desde Gmail):

=== 1. DATOS DE CONFIGURACIÓN DE PORTALES ===
DOMINIO_FTP: ${wizardDomain}
GUMROAD_URL: ${wizardGumroadUrl}
INSTAGRAM: ${wizardInstagram}
X_TWITTER: ${wizardX}
PINTEREST: ${wizardPinterest}
REDDIT: ${wizardReddit}
TIKTOK: ${wizardTiktok}
AMAZON_KDP: ${wizardKdpAuthor}
IDIOMA: ${wizardLanguage}

=== 2. PRODUCTOS DIGITALES APROBADOS CON TU OK Y NOMBRES DE ARCHIVO ===
${approvedAlerts
  .map(
    (a, idx) =>
      `${idx + 1}) ${a.assetTitle} (€${a.suggestedPriceEur.toFixed(2)})
   - Archivo Gumroad / Web: ${a.recommendedFileNameBase}_Gumroad_A4.pdf
   - Archivo Amazon KDP (8.5x11"): ${a.recommendedFileNameBase}_KDP_Interior_85x11.pdf
   - Archivo Muestra 300 DPI: ${a.recommendedFileNameBase}_Lamina_300dpi.jpg
   - Dónde colgarlo: ${a.whereToPublish}
   - 7 Keywords SEO: ${a.seoKeywords.join(', ')}`
  )
  .join('\n\n')}

=== 3. ENLACES DIRECTOS DE DESCARGA .ZIP ===
- Portal Web Completo + Carpeta /PTB FileZilla: ${window.location.origin}/api/ptb/download-ftp-zip
- Pack Contenidos Digitales Aprobados (.ZIP): ${window.location.origin}/api/ptb/download-approved-content-zip
`;
    setEmailBody(defaultBody);
  }, [
    wizardDomain,
    wizardGumroadUrl,
    wizardInstagram,
    wizardX,
    wizardPinterest,
    wizardReddit,
    wizardTiktok,
    wizardKdpAuthor,
    wizardLanguage,
    approvedAlerts,
  ]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusBanner(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        if (result.user.email) {
          setRecipientEmail(result.user.email);
        }
        await handleLoadGmailInbox();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión con Google';
      setStatusBanner(`Aviso: ${msg}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setMessages([]);
  };

  // Read messages from Gmail Inbox using gmail.readonly scope
  const handleLoadGmailInbox = async () => {
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setIsLoadingInbox(true);
    setStatusBanner(null);
    try {
      const listRes = await fetch(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=6',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (listRes.status === 401 || listRes.status === 403) {
        setNeedsAuth(true);
        return;
      }
      const listData = await listRes.json();
      const rawMessages: { id: string }[] = listData.messages || [];

      const detailed: GmailMessageSummary[] = [];
      for (const m of rawMessages.slice(0, 5)) {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (msgRes.ok) {
          const msgData = await msgRes.json();
          const headers: { name: string; value: string }[] =
            msgData.payload?.headers || [];
          const getHeader = (name: string) =>
            headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

          detailed.push({
            id: m.id,
            subject: getHeader('Subject') || '(Sin asunto)',
            from: getHeader('From') || 'Remitente',
            date: getHeader('Date') || '',
            snippet: msgData.snippet || '',
            bodyText: msgData.snippet || '',
          });
        }
      }
      setMessages(detailed);
      setStatusBanner(
        `✓ Bandeja de Gmail sincronizada (${detailed.length} correos recientes leídos).`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al leer bandeja de Gmail';
      setStatusBanner(`Error: ${msg}`);
    } finally {
      setIsLoadingInbox(false);
    }
  };

  // Extract portal settings from an email snippet/body if the user replied via Gmail
  const handleApplyConfigFromEmail = (msg: GmailMessageSummary) => {
    const text = `${msg.subject}\n${msg.snippet}\n${msg.bodyText}`;
    const extractField = (key: string) => {
      const regex = new RegExp(`${key}\\s*:\\s*([^\\n\\r]+)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : null;
    };

    const dom = extractField('DOMINIO_FTP');
    const gum = extractField('GUMROAD_URL');
    const ig = extractField('INSTAGRAM');
    const xHandle = extractField('X_TWITTER');
    const pin = extractField('PINTEREST');
    const red = extractField('REDDIT');
    const tik = extractField('TIKTOK');
    const kdp = extractField('AMAZON_KDP');

    if (dom) setWizardDomain(dom);
    if (gum) setWizardGumroadUrl(gum);
    if (ig) setWizardInstagram(ig);
    if (xHandle) setWizardX(xHandle);
    if (pin) setWizardPinterest(pin);
    if (red) setWizardReddit(red);
    if (tik) setWizardTiktok(tik);
    if (kdp) setWizardKdpAuthor(kdp);

    onSaveWebConfig();
    setStatusBanner(
      `✓ Configuración aplicada desde el correo "${msg.subject}".`
    );
  };

  // Execute actual Gmail Send after the user confirms in the Confirmation Modal
  const handleConfirmedSendEmail = async () => {
    setShowSendConfirmDialog(false);
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setIsSendingEmail(true);
    setStatusBanner(null);
    try {
      const raw = encodeGmailRawMessage(recipientEmail, emailSubject, emailBody);
      const res = await fetch(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw }),
        }
      );

      if (!res.ok) {
        throw new Error('No se pudo enviar el correo mediante Gmail API');
      }

      setStatusBanner(
        `✓ Correo enviado con éxito por Gmail a ${recipientEmail} con todos los nombres de archivo y enlaces .ZIP.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al enviar correo';
      setStatusBanner(`Error: ${msg}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="cortx-panel max-w-4xl w-full p-6 space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto border-cyan-500/40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-cyan-400 uppercase font-bold">
              <Mail className="w-4 h-4" /> CONFIGURACIÓN MEDIANTE WEB Y GMAIL OFICIAL
            </div>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Centro de Vinculación de Portales por Web o por Correo Gmail
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('GMAIL_SYNC')}
              className={`px-3 py-1.5 rounded font-mono-code text-xs ${
                activeTab === 'GMAIL_SYNC' ? 'cortx-btn-primary' : 'cortx-btn'
              }`}
            >
              📧 Vía Gmail (Leer / Enviar)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('WEB_FORM')}
              className={`px-3 py-1.5 rounded font-mono-code text-xs ${
                activeTab === 'WEB_FORM' ? 'cortx-btn-primary' : 'cortx-btn'
              }`}
            >
              🌐 Formulario Web Directo
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cortx-btn px-2.5 py-1.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {statusBanner && (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-lg px-4 py-2.5 text-xs font-mono-code text-emerald-300 flex items-center justify-between">
            <span>{statusBanner}</span>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* ===================================================================
            TAB 1: GMAIL INTEGRATION (SIGN IN WITH GOOGLE + SEND/READ CONFIG)
        =================================================================== */}
        {activeTab === 'GMAIL_SYNC' && (
          <div className="space-y-5">
            {/* Connection Status Card */}
            <div className="bg-[#0B0F1A] border border-[#24324B] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-mono-code text-xs text-cyan-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {needsAuth
                    ? 'CONECTA TU CUENTA DE GOOGLE PARA USAR GMAIL'
                    : `CONECTADO A GMAIL COMO: ${user?.email || 'xagai.contact@gmail.com'}`}
                </div>
                <p className="text-xs text-slate-300">
                  {needsAuth
                    ? 'Inicia sesión con tu cuenta de Google para enviarte a tu correo la plantilla de configuración, los nombres de archivo (PTB_01, PTB_02, PTB_03) y leer tus respuestas automáticamente.'
                    : 'Tu cuenta de Gmail está activa. Puedes enviarte el resumen completo con enlaces .ZIP a tu correo o leer correos de configuración de tu bandeja.'}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {needsAuth ? (
                  <GoogleSignInButton
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    label={isLoggingIn ? 'Conectando...' : 'Sign in with Google'}
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleLoadGmailInbox}
                      disabled={isLoadingInbox}
                      className="cortx-btn-primary px-3.5 py-2 flex items-center gap-1.5"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isLoadingInbox ? 'animate-spin' : ''}`}
                      />
                      Leer Bandeja Gmail
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="cortx-btn px-3 py-2 flex items-center gap-1 text-slate-300"
                      title="Cerrar sesión de Google"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Salir
                    </button>
                  </>
                )}
              </div>
            </div>

            {!needsAuth && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: Send Configuration & Approved Files Pack via Gmail (7 cols) */}
                <div className="lg:col-span-7 bg-[#151E31] border border-[#24324B] rounded-xl p-4 space-y-3.5">
                  <div className="font-mono-code text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <Send className="w-4 h-4" /> 1. ENVIAR FICHA DE CONFIGURACIÓN Y ARCHIVOS .ZIP POR GMAIL
                  </div>

                  <div>
                    <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                      Destinatario (Tu Gmail o correo de cliente):
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white font-mono-code"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                      Asunto del Correo:
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                      Contenido (Incluye tus datos de portales, nombres de archivo PTB_01..03 y enlaces .ZIP):
                    </label>
                    <textarea
                      rows={9}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-xs text-slate-200 font-mono-code"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isSendingEmail || !recipientEmail.trim()}
                    onClick={() => setShowSendConfirmDialog(true)}
                    className="w-full cortx-btn-emerald py-2.5 font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSendingEmail
                      ? 'ENVIANDO CORREO POR GMAIL...'
                      : `ENVIAR AHORA POR GMAIL A ${recipientEmail}`}
                  </button>
                </div>

                {/* Right: Read Gmail Inbox & Auto-Import Portal Settings (5 cols) */}
                <div className="lg:col-span-5 bg-[#0B0F1A] border border-[#24324B] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-mono-code text-xs text-cyan-400 font-bold flex items-center gap-1.5">
                      <Inbox className="w-4 h-4" /> 2. BANDEJA DE ENTRADA GMAIL
                    </div>
                    <button
                      type="button"
                      onClick={handleLoadGmailInbox}
                      className="font-mono-code text-[11px] text-cyan-400 hover:underline"
                    >
                      Actualizar
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Si respondes al correo con tus usuarios de Instagram, Gumroad o KDP, pulsa <strong>&ldquo;Importar datos&rdquo;</strong> sobre el mensaje para aplicarlos al portal:
                  </p>

                  {messages.length === 0 ? (
                    <div className="bg-[#151E31] border border-[#24324B] rounded-lg p-4 text-center space-y-2">
                      <p className="text-xs text-slate-400">
                        Pulsa el botón superior <strong>&ldquo;Leer Bandeja Gmail&rdquo;</strong> para ver tus últimos correos y detectar respuestas de configuración.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className="bg-[#151E31] border border-[#24324B] rounded-lg p-3 space-y-1.5 text-xs"
                        >
                          <div className="font-bold text-white truncate">{m.subject}</div>
                          <div className="font-mono-code text-[10px] text-cyan-400 truncate">
                            De: {m.from}
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2">
                            {m.snippet}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleApplyConfigFromEmail(m)}
                            className="cortx-btn px-2.5 py-1 text-[10px] text-emerald-400 flex items-center gap-1 mt-1"
                          >
                            <Sparkles className="w-3 h-3" /> Importar datos de este correo al portal
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 2: DIRECT WEB CONFIGURATION FORM
        =================================================================== */}
        {activeTab === 'WEB_FORM' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSaveWebConfig();
              setStatusBanner(
                '✓ Datos guardados en el portal web y sincronizados con el generador .ZIP.'
              );
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  1. Tu Dominio y Carpeta FTP (/PTB)
                </label>
                <input
                  type="text"
                  value={wizardDomain}
                  onChange={(e) => setWizardDomain(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  2. URL de tu Tienda Gumroad
                </label>
                <input
                  type="text"
                  value={wizardGumroadUrl}
                  onChange={(e) => setWizardGumroadUrl(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  3. Usuario de Instagram
                </label>
                <input
                  type="text"
                  value={wizardInstagram}
                  onChange={(e) => setWizardInstagram(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  4. Usuario de X (Twitter)
                </label>
                <input
                  type="text"
                  value={wizardX}
                  onChange={(e) => setWizardX(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  5. Perfil o Tablero de Pinterest
                </label>
                <input
                  type="text"
                  value={wizardPinterest}
                  onChange={(e) => setWizardPinterest(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  6. Usuario en Reddit
                </label>
                <input
                  type="text"
                  value={wizardReddit}
                  onChange={(e) => setWizardReddit(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  7. Usuario de TikTok
                </label>
                <input
                  type="text"
                  value={wizardTiktok}
                  onChange={(e) => setWizardTiktok(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  8. Nombre Editorial en Amazon KDP
                </label>
                <input
                  type="text"
                  value={wizardKdpAuthor}
                  onChange={(e) => setWizardKdpAuthor(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  9. Idiomas de los Cuadernos y Posts
                </label>
                <select
                  value={wizardLanguage}
                  onChange={(e) => setWizardLanguage(e.target.value)}
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                >
                  <option value="Español">Solo Español</option>
                  <option value="Catalán + Español">Catalán y Español</option>
                  <option value="Español + Inglés (Bilingüe)">Español + Inglés (Bilingüe)</option>
                  <option value="Español + Catalán + Inglés (Bilingüe)">Trilingüe (ES / CAT / EN)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono-code text-[11px] text-slate-300 mb-1">
                  10. URL Webhook Make.com / n8n (Opcional)
                </label>
                <input
                  type="text"
                  value={wizardWebhookUrl}
                  onChange={(e) => setWizardWebhookUrl(e.target.value)}
                  placeholder="https://hook.eu2.make.com/..."
                  className="w-full bg-[#0B0F1A] border border-[#2E3F5C] rounded px-3 py-2 text-white font-mono-code"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={onClose}
                className="cortx-btn px-3.5 py-2"
              >
                CERRAR
              </button>
              <button type="submit" className="cortx-btn-emerald px-4 py-2 font-bold">
                <CheckCircle2 className="w-4 h-4 inline mr-1" /> GUARDAR CONFIGURACIÓN WEB
              </button>
            </div>
          </form>
        )}

        {/* ===================================================================
            MANDATORY USER CONFIRMATION DIALOG FOR GMAIL SEND MUTATION
        =================================================================== */}
        {showSendConfirmDialog && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
            <div className="cortx-panel max-w-md w-full p-6 space-y-4 border-amber-500/60 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-400 font-mono-code text-xs font-bold">
                <AlertTriangle className="w-4 h-4" /> CONFIRMACIÓN DE ENVÍO DE CORREO GMAIL
              </div>
              <h4 className="text-base font-bold text-white">
                ¿Confirmas el envío de este correo desde tu cuenta de Gmail?
              </h4>
              <div className="bg-[#0B0F1A] border border-[#24324B] rounded p-3 text-xs space-y-1 font-mono-code">
                <div>
                  <span className="text-slate-400">Para:</span>{' '}
                  <span className="text-cyan-400">{recipientEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400">Asunto:</span>{' '}
                  <span className="text-white">{emailSubject}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Se enviará un correo electrónico en tu nombre con la plantilla de configuración de portales, los nombres de archivo aprobados y los enlaces de descarga .ZIP.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSendConfirmDialog(false)}
                  className="cortx-btn px-3.5 py-2"
                >
                  CANCELAR
                </button>
                <button
                  type="button"
                  onClick={handleConfirmedSendEmail}
                  className="cortx-btn-emerald px-4 py-2 font-bold"
                >
                  CONFIRMAR Y ENVIAR CORREO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
