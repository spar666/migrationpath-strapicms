import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => {
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('PUBLIC_URL', 'http://localhost:1337'),
    app: {
      keys: env.array('APP_KEYS', ['zPs56quTCRHK9Qyv5pIEog==', '7hzrbxT9sG4Ki9w00PerOg==', 'xLrViUfkBckbaVDoI+MJsw==', 'bkhOqhIG2+rnILZezFaYtw==']),
    },
  };
};

export default config;
