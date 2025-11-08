export const absoluteUrl = (path: string, locale?: string) => {
  const base =
    typeof window === 'undefined'
      ? process.env.NEXTAUTH_URL || 'http://localhost:3000'
      : window.location.origin;
  const loc = locale && locale !== 'en' ? `/${locale}` : '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const result = `${base}${loc}${normalized}`;
  console.debug('[absoluteUrl]', { path, locale, base, loc, normalized, result });
  return result;
};
