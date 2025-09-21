import { PokemonCard } from "@/components/PokemonCard";
import { makeClient } from "@/lib/apollo";
import { GET_POKEMON_BY_NAME } from "@/lib/queries";

export async function generateStaticParams() {
  return ["bulbasaur", "charmander", "squirtle"].map((name) => ({ name }));
}

export const revalidate = 86400; // ISR: revalidate once a day

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const client = makeClient();
  await client.query({
    query: GET_POKEMON_BY_NAME,
    variables: { name: params.name },
  });
  return (
    <main>
      <PokemonCard name={params.name} />
    </main>
  );
}
