export default {
  register({ strapi }: any) {},

  async bootstrap({ strapi }: any) {
    const contentTypes = ['banner', 'category', 'faq', 'guide', 'news-article', 'success-story'];
    const actions = ['find', 'findOne'];

    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const existingPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: { role: publicRole.id },
        });

        const existingActions = new Set(existingPermissions.map((p: any) => p.action));

        for (const ct of contentTypes) {
          for (const action of actions) {
            const permissionAction = `api::${ct}.${ct}.${action}`;
            if (!existingActions.has(permissionAction)) {
              await strapi.db.query('plugin::users-permissions.permission').create({
                data: {
                  action: permissionAction,
                  role: publicRole.id,
                },
              });
            }
          }
        }
      }
    } catch (err: any) {
      strapi.log.warn('Could not auto-configure Public role permissions:', err.message);
    }
  },
};
