// Un élément du tableau "results"
export interface PokeApiListItem {
  name: string;
  url: string;
}

// La réponse complète
export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiListItem[];
}

export interface PokeApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// La réponse complète de /pokemon/{id}
export interface PokeApiPokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokeApiType[];
  stats: PokeApiStat[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
