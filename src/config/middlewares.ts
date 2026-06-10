export const config = {
  resolve: {
    'strapi::errors': {
      enabled: true,
    },
    'strapi::security': {
      enabled: true,
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'media-src': ["'self'", 'data:', 'blob:', 'https:'],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors': {
      enabled: true,
      config: {
        origin: ['localhost', 'http://localhost:3000', 'http://localhost:8000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      },
    },
    'strapi::poweredBy': {
      enabled: true,
    },
    'strapi::logger': {
      enabled: true,
    },
    'strapi::query': {
      enabled: true,
    },
    'strapi::body': {
      enabled: true,
      config: {
        formLimit: '256mb',
        jsonLimit: '256mb',
        textLimit: '256mb',
      },
    },
    'strapi::session': {
      enabled: true,
      config: {
        defaultPath: '/admin',
        sameSite: 'lax',
      },
    },
    'strapi::favicon': {
      enabled: true,
    },
    'strapi::public': {
      enabled: true,
    },
  },
};

export default config;