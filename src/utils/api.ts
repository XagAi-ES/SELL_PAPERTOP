// Resolves the backend API endpoint whether running on Cloud Run, localhost, or inside an external FTP folder (/PTB)
const CLOUD_BACKEND_FALLBACK =
  'https://ais-pre-v22jbfoliwg46uh2a2ihw2-422125961457.europe-west2.run.app';

export function getApiUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  const host = window.location.hostname;
  const isNativeBackendHost =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.run.app');

  if (isNativeBackendHost) {
    return path;
  }

  // When hosted inside an external FTP subfolder (e.g. https://tudominio.com/PTB/),
  // route AI API calls to the Cloud Run backend automatically
  return `${CLOUD_BACKEND_FALLBACK}${path}`;
}
