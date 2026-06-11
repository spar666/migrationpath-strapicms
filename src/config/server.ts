import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => {
  // Parse APP_KEYS manually instead of using env.array()
  const appKeysString = env('APP_KEYS', '');
  const appKeys = appKeysString
    .split(',')
    .map((key: string) => key.trim())
    .filter((key: string) => key.length > 0);

  console.log('DEBUG - Parsed keys:', appKeys);
  console.log('DEBUG - Keys count:', appKeys.length);

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', 'http://localhost:1337'),
    app: {
      keys: appKeys.length > 0 ? appKeys : ['fallback-key'], // Fallback if empty
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};

export default config;