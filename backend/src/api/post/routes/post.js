'use strict';

/**
 * post router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post', {
    config: {
        find: {
            auth: false,
        },
        findOne: {
            auth: false,
        }
    }
});