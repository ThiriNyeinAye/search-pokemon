# 🔎 Search Pokémon

A **Next.js 14 + TypeScript** application that lets you explore for Pokémon using a **GraphQL API**.

## 🚀 Features

- **Pokémon Search**

  - Search by name via input field (`?q=` query param synced).
  - View Pokémon details: classification, types, size, resistances, weaknesses.
  - Show attacks (fast & special).
  - Show evolutions — click an evolution to search that Pokémon.

- **Optimizations**

  - Apollo Client with **cache-first** fetching + prefetch on hover.
  - Next.js **App Router** with `?q=` params and `/pokemon/[name]` routes.
  - **Static optimization** using `generateStaticParams` + ISR (`revalidate`).
  - **React Suspense** + skeleton loading UI.
  - **Next/Image** for optimized images.
  - **Responsive UI** styled with TailwindCSS + Framer Motion animations.

- **Form & State**

  - Search input with **React Hook Form + Zod** validation.
  - **Redux Toolkit** for recents & favorites, persisted in `localStorage`.

- **Testing (optional requirement)**
  - Jest test suite with mocks for **Bulbasaur, Charmander, Squirtle**.
  - Asserts that types match: Grass / Fire / Water.

---

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL Pokémon API](https://graphql-pokemon2.vercel.app/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [TailwindCSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) for unit tests

---

## 📦 Getting Started

Clone the repo:

```bash
git clone https://github.com/ThiriNyeinAye/search-pokemon.git
cd search-pokemon
```
