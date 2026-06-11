"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    register({ strapi }) { },
    async bootstrap({ strapi }) {
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
                const existingActions = new Set(existingPermissions.map((p) => p.action));
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
        }
        catch (err) {
            strapi.log.warn('Could not auto-configure Public role permissions:', err.message);
        }
    },
};
