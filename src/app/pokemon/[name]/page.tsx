import { PokemonCard } from "@/components/PokemonCard";
import { makeServerClient } from "@/lib/apollo.server";
import { GET_POKEMON_BY_NAME } from "@/lib/queries";

export async function generateStaticParams() {
  return ["bulbasaur", "charmander", "squirtle"].map((name) => ({ name }));
}

export const revalidate = 86400; // ISR

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const client = makeServerClient();
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
