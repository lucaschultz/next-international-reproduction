Let's explore why adding a "defaultLocale" to next-international, as suggested in [pull request #365](https://github.com/QuiiBz/next-international/pull/365), could be a great idea!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [`http://localhost:3000`](http://localhost:3000) with your browser to visit the statically rendered welcome page. It calls `setStaticParamsLocale` with the default locale defined in `src/helpers/get-tenant-locale.ts`.

Navigate to [`http://localhost:3000/dynamic`](http://localhost:3000/dynamic) to visit a dynamically rendered page which uses both the `cookies` and `headers` functions of Next.js.

Both pages work perfectly fine. Getting the locale from the header/cookie set by `addLocaleToResponse` in `src/middleware.tsx` which in turn gets its locale from some custom logic here mocked as `getTenantLocale`.

However, when running `npm run build`, an error occurs:

```
Error occurred prerendering page "/dynamic". Read more: https://nextjs.org/docs/messages/prerender-error

Error: Could not find locale while pre-rendering page, make sure you called `setStaticParamsLocale` at the top of your pages
    at /Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/chunks/572.js:1:1308
    at /Users/lucaschultz/Developer/typescript/next-international-reproduction/node_modules/.pnpm/next@14.1.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:182068
    at /Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/chunks/572.js:1:2566
    at Generator.next (<anonymous>)
    at /Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/chunks/572.js:1:666
    at new Promise (<anonymous>)
    at f (/Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/chunks/572.js:1:486)
    at /Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/chunks/572.js:1:2536
    at o (/Users/lucaschultz/Developer/typescript/next-international-reproduction/.next/server/app/dynamic/page.js:1:3500)
    at em (/Users/lucaschultz/Developer/typescript/next-international-reproduction/node_modules/.pnpm/next@14.1.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:131226)
 ✓ Generating static pages (6/6) 

> Export encountered errors on following paths:
        /dynamic/page: /dynamic

```

This issue can be resolved by adding `export const dynamic = "force-dynamic";` to `src/app/dynamic/page.tsx`. After that, the app builds successfully.

I assume Next.js treats all pages whose URLs do not contain any path parameters (unlike [`http://localhost:3000/with-param/param`](http://localhost:3000/with-param/param)) as static and attempts prerendering during the build process. When it encounters a call to `headers`/`cookies`, it discards the prerendering and instead continues to treat the page as dynamic. However, we never reach that point because the "Could not find locale while pre-rendering..." error occurs first.
