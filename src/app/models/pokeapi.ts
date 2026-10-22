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
