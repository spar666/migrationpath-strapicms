import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => {
  // Support both APP_KEYS (preferred) and fallback APP_KEY (single value)
  // env.array will parse comma-separated values into an array.
  const providedAppKeys = env.array('APP_KEYS', [] as string[]);
  const fallbackSingleKey = env('APP_KEY', '');
  const appKeys = (providedAppKeys && providedAppKeys.length > 0)
    ? providedAppKeys
    : (fallbackSingleKey ? [fallbackSingleKey] : []);

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', 'http://localhost:1337'),
    app: {
      keys: appKeys,
    },
  } as Core.Config.Server;
};

export default config;
