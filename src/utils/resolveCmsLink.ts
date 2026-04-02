const INTERNAL_HOSTS = new Set([
  'entrenamientoaguasabiertas.com',
  'www.entrenamientoaguasabiertas.com',
]);

const DIRECT_ROUTE_MAP = new Map<string, string>([
  ['/contact-us', '/contacto'],
  ['/contacto', '/contacto'],
  ['/about-us', '/sobre-mi'],
  ['/privacy-policy', '/privacidad'],
  ['/politica-de-privacidad', '/privacidad'],
  ['/legal-notice', '/aviso-legal'],
  ['/aviso-legal', '/aviso-legal'],
  ['/cookie-policy', '/cookies'],
  ['/cookies-policy', '/cookies'],
  ['/politica-de-cookies', '/cookies'],
  ['/services', '/servicios'],
  ['/blog', '/blog'],
]);

type ResolvedCmsLink = {
  href: string;
  isInternal: boolean;
  openInNewTab: boolean;
};

const normalizePath = (path: string) => {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed || '/';
};

export const resolveCmsLink = (rawHref?: string | null): ResolvedCmsLink => {
  const href = rawHref?.trim();

  if (!href) {
    return { href: '#', isInternal: false, openInNewTab: false };
  }

  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return { href, isInternal: false, openInNewTab: false };
  }

  let normalizedHref = href;
  let isInternal = href.startsWith('/');

  try {
    const parsedUrl = new URL(href, 'https://www.entrenamientoaguasabiertas.com');

    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      if (INTERNAL_HOSTS.has(parsedUrl.hostname)) {
        isInternal = true;
        normalizedHref = `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      } else {
        return { href, isInternal: false, openInNewTab: true };
      }
    }
  } catch {
    return { href, isInternal: false, openInNewTab: false };
  }

  if (!isInternal) {
    const openInNewTab = /^https?:\/\//i.test(normalizedHref);
    return { href: normalizedHref, isInternal: false, openInNewTab };
  }

  const [pathWithQuery = '/', hash = ''] = normalizedHref.split('#');
  const [pathname = '/', search = ''] = pathWithQuery.split('?');
  const normalizedPath = normalizePath(pathname);

  const mappedPath =
    DIRECT_ROUTE_MAP.get(normalizedPath) ||
    (normalizedPath.startsWith('/services/')
      ? `/servicios/${normalizedPath.slice('/services/'.length)}`
      : normalizedPath);

  const finalHref =
    mappedPath +
    (search ? `?${search}` : '') +
    (hash ? `#${hash}` : '');

  return { href: finalHref, isInternal: true, openInNewTab: false };
};
