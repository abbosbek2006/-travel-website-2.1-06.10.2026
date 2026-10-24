// Production hosting must apply these headers too; CRA's dev server is separate.
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com https://images.squarespace-cdn.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'self'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
