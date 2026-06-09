import type { Core } from '@strapi/strapi';
// test
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'KWDqyf/G34wWlPycSJVabg=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'Ad9d69K7nODI/qv5KWF+iQ=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', '/WiaRIk9CCzXr1dlhh7nPA=='),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', '84lKFcy6HiGeRzPhpj2hRw=='),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});

export default config;
