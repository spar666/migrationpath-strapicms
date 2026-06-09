import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => {
  // Support both comma-separated APP_KEYS (preferred) and single APP_KEY (fallback)
  const rawKeys = env.array('APP_KEYS', []);
  const customProdKeys = env.array('PRODUCTION_APP_KEYS', []);
  const rawSingleKey = env('APP_KEY', '');

  const keys = customProdKeys.filter(Boolean).length > 0
    ? customProdKeys.filter(Boolean)
    : rawKeys.filter(Boolean).length > 0
      ? rawKeys.filter(Boolean)
      : rawSingleKey
        ? [rawSingleKey]
        : [];

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', 'http://localhost:1337'),
    app: {
      keys: keys.length > 0 ? keys : ['default-dev-key-do-not-use-in-production'],
    },
  } satisfies Core.Config.Server;
};

export default config;
