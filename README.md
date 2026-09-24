# Syeda Zobia Ashraf — Software Engineer Portfolio

A static, responsive portfolio for Syeda Zobia Ashraf. It uses a retro-computing visual system to present software engineering experience, selected work, skills, resume access, and recruiter-friendly contact information.

## Technology

- **React 19** with **TypeScript**
- **Vite 7** for local development and builds
- **Tailwind CSS 4** and custom CSS for layout, 3D monitor styling, responsive behavior, and animation
- **Lucide React** for icons
- **Wouter** for the lightweight client-side route fallback
- **pnpm** for package management

The portfolio itself does not use a database, authentication, contact API, payment flow, or user-submitted data.

## Project structure

```text
client/
  public/       Static files such as resume.pdf
  src/
    components/ Error boundary
    pages/      Portfolio and fallback pages
    App.tsx     Application routes
    index.css   Global design system and responsive styles
vercel.json     Vercel build and SPA fallback configuration
```

## Local development

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. Run the checks used before publishing with:

```bash
pnpm check
pnpm build
```

## Security and environment variables

This project currently requires **no environment variables**. There is no `.env` file in the repository, and no credentials or private API keys are needed for the portfolio to run.

The repository ignores `.env` files, Vercel metadata, private-key extensions, build output, logs, and dependency directories. Do not commit secrets. If a future feature needs a secret, store it in the deployment provider's environment-variable settings and access it only from server-side code. Never put a private key in a `VITE_*` variable because Vite exposes `VITE_*` values to the browser bundle.

The public project links and uploaded preview images are intentionally public portfolio content. They are not credentials.

## License

The project is marked as MIT in `package.json`. Update the license if you want different reuse terms.
