# E-commerce storefront

Responsive Next.js App Router foundation using TypeScript, Tailwind CSS, and Hero UI. The supplied logo is used as an image asset; the wordmark is not recreated in text.

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The API rewrite expects the separate Express backend at `http://127.0.0.1:4000` by default. Set `API_ORIGIN` when that location differs. Run `pnpm typecheck`, `pnpm test`, and `pnpm build` for checks.

## Current scope

The home route `/` contains the responsive editorial landing shell and the first lookbook introduction. The current route manifest is `public/manus-routes.json`. More catalog, lookbook, cart, account, and dynamic detail routes are staged for later approved steps.

The logo asset at `public/brand/brand-logo.png` was supplied by the project owner. Campaign cutout URLs reference the attached lookbook prompt. Do not add generic stock graphics or private API credentials.
