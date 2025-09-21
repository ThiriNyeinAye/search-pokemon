# 🔎 Search Pokémon

A **Next.js 14 + TypeScript** application that lets you explore for Pokémon using a **GraphQL API**.

## Project Preview

<img
  style="width: 480px; height: 100%"
  src="https://github.com/ThiriNyeinAye/search-pokemon/blob/main/public/assets/preview.gif"
  alt="Meta Project"
/>

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

- **Framework:** Next.js 15
- **Language:** TypeScript  
- **Data Layer:** Apollo Client + GraphQL Pokémon API
- **Package Manager:** PNPM
- **Form Handling:** React Hook Form + Zod  
- **State Management:** Redux Toolkit  
- **Styling & Animations:** TailwindCSS + Framer Motion  
- **Testing:** Jest  
- **Deployment:** Vercel

---

## Installation and Setup

1.  **Clone the Repository:**

```bash
git clone https://github.com/ThiriNyeinAye/search-pokemon.git
cd search-pokemon
```

2.  **Install Dependencies:**

```bash
pnpm install
```

3.  **Start the Development Server:**

```bash
pnpm dev
```

4.  **View the Application:**
    Open your browser and visit:

```
http://localhost:3000
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.  
👉 [Live Demo](https://my-search-pokemon-one.vercel.app/)

