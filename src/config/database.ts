const client = ({ env }) => env('DATABASE_CLIENT', 'postgres');

const connections = {
  postgres: ({ env }) => ({
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false)
        ? {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
          }
        : false,
    },
    pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  }),
  sqlite: ({ env }) => ({
    client: 'better-sqlite3',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  }),
};

export default ({ env }) => ({
  connection: connections[client({ env })]({ env }),
});
