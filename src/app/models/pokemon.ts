export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

// Une statistique, dans NOTRE format
export interface PokemonStat {
  name: string;
  value: number;
}

// Les infos complètes d'un Pokémon, dans NOTRE format
export interface PokemonInfo {
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    stats: PokemonStat[];
}

export interface PokemonPage {
  pokemons: Pokemon[];
  total: number;
}