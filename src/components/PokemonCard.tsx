"use client";
import { useEffect, useState } from "react";
import { makeClient } from "@/lib/apollo.client";
import { GET_POKEMON_BY_NAME } from "@/lib/queries";
import type { Pokemon } from "@/types/pokemon";
import PokemonCardView from "./PokemonCardView";

export function PokemonCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon | null | undefined>(undefined);

  useEffect(() => {
    if (!name) return;
    const client = makeClient();
    client
      .query<{ pokemon: Pokemon | null | undefined }>({
        query: GET_POKEMON_BY_NAME,
        variables: { name },
        fetchPolicy: "cache-first", // To prioritize cached results for faster UI.
        context: { fetchOptions: { next: { revalidate: 60 } } },
      })
      .then(({ data }) => setPokemon(data?.pokemon));
  }, [name]);

  if (!pokemon) return null;
  return <PokemonCardView pokemon={pokemon} queryName={name} />;
}
