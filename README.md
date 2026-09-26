<p align="center">
  <img src="./assets/readme/hero.gif" width="100%" alt="Notes on engineering, AI, design, and the things in between. Conceptual overview.">
</p>

# ChrisV Blog

A personal journal at the intersection of geotechnical engineering, AI, agents, design, and art. Built with Astro, with content kept in the repository.

## Explore the content

| Collection | What lives here |
| --- | --- |
| [Articles](src/content/articles/) | Longer explanations and learning notes, including micrograd and entropy |
| [Projects](src/content/projects/) | Notes on the tools and research projects I work on |
| [Resources](src/content/resources/) | Useful tools and references |
| [Random](src/content/random/) | Smaller observations and experiments |

The homepage, collection pages, and about page are in [`src/pages/`](src/pages/). Content configuration is in [`src/content.config.ts`](src/content.config.ts).

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Astro, normally `http://localhost:4321`.

## Build and preview

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Inspect Astro commands |

The generated `dist/` directory can be deployed to a static host. Site styles and typography live in [`src/styles/global.css`](src/styles/global.css).

<details>
<summary>Static overview</summary>

[Open the static SVG](./assets/readme/hero.svg).

</details>
