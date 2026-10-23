import { Injectable, inject, signal } from '@angular/core';
import { Pokemon, PokemonInfo, PokemonPage } from '../models/pokemon';
import { PokeApiListItem, PokeApiListResponse, PokeApiPokemonDetail } from '../models/pokeapi';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  public readonly page = signal(1);

  getPokemons(offset: number): Observable<PokemonPage> {
    return this.http
      .get<PokeApiListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .pipe(
        map((response) => ({
          pokemons: response.results.map((item) => this.toPokemon(item)),
          total: response.count,
        })),
      );
  }

  getPokemonInfo(id: string): Observable<PokemonInfo> {
    return this.http
      .get<PokeApiPokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map((detail) => this.toPokemonInfo(detail)));
  }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokeApiListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=2000`)
      .pipe(map((response) => response.results.map((item) => this.toPokemon(item))));
  }

  private toPokemon(item: PokeApiListItem): Pokemon {
    const morceaux = item.url.split('/');
    const id = Number(morceaux.at(-2));

    return {
      id: id,
      name: item.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }

  private toPokemonInfo(detail: PokeApiPokemonDetail): PokemonInfo {
    return {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.other['official-artwork'].front_default,
      types: detail.types.map((t) => t.type.name),
      height: detail.height / 10,
      weight: detail.weight / 10,
      stats: detail.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    };
  }
}
