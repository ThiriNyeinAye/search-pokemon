export type Attack = { name: string; type: string; damage: number };
export type AttackSet = { fast: Attack[]; special: Attack[] };
export type Dim = { minimum: string; maximum: string };

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
  weight: Dim;
  height: Dim;
  resistant: string[];
  weaknesses: string[];
  attacks: AttackSet;
  evolutions?:
    | Pick<Pokemon, "id" | "number" | "name" | "image" | "types">[]
    | null;
};
