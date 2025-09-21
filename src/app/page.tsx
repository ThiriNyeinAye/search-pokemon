import SearchInput from "@/components/SearchInput";
import { PokemonCard } from "@/components/PokemonCard";
import { Suspense } from "react";
import PokemonSkeleton from "@/components/PokemonSkeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const params = await searchParams;
  const q = (params?.q ?? "").trim();
  return (
    <main>
      <SearchInput />
      {q ? (
        <Suspense fallback={<PokemonSkeleton />}>
          <PokemonCard name={q} />
        </Suspense>
      ) : (
        <p className="text-neutral-300">
          Try “Bulbasaur”, “Charmander”, or “Squirtle”.
        </p>
      )}
    </main>
  );
}
