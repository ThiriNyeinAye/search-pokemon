type PokemonMock = { name: string; types: string[] };

const bulbasaur: PokemonMock = {
  name: "Bulbasaur",
  types: ["Grass", "Poison"],
};

const charmander: PokemonMock = {
  name: "Charmander",
  types: ["Fire"],
};

const squirtle: PokemonMock = {
  name: "Squirtle",
  types: ["Water"],
};

describe("Starter Pokémon types", () => {
  test("Bulbasaur includes Grass", () => {
    expect(bulbasaur.types).toContain("Grass");
  });

  test("Charmander is Fire", () => {
    expect(charmander.types).toContain("Fire");
  });

  test("Squirtle is Water", () => {
    expect(squirtle.types).toContain("Water");
  });
});
