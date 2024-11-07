# Portfolio Blog V2 (Revamped)

### Building Blocks

To build a site similar to this, consider changing the LICENSE file first. The following frameworks/tools are used to build this site:
- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## File Structure Overview

- `layouts/*` - The different page layouts each MDX category (blog, snippets) uses.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API Routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://leerob.io/dashboard), newsletter subscription, guestbook, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/dashboard` - [Personal dashboard](https://leerob.io/dashboard) tracking metrics.
- `pages/sitemap.xml.tsx` - Automatically generated sitemap.
- `pages/feed.xml.tsx` - Automatically generated RSS feed.
- `pages/*` - All other static pages.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Local setup

This application requires Node.js v16.13+.

```bash
$ git clone https://github.com/codewithdev/codewithdev-vercel.git
$ cd codewithdev-vercel
$ yarn
$ yarn dev
```

You will see the local build running on http://localhost:3000/

### Before you run local build
- Create `.env` file and populate the API key and secrets used to successfully run the local build.



## Cloning / Forking

Please review the [license](https://github.com/codewithdev/codewithdev.github.io/blob/main/LICENSE.txt) and remove all of my personal information (resume, blog posts, images, etc.).
