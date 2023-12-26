/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly PUBLIC_STRAPI_URL: string;
    readonly PUBLIC_STRAPI_ASSETS_URL: string;
    readonly PUBLIC_DEFAULT_IMAGE: string;
    readonly PUBLIC_AUTHOR: string;
}
