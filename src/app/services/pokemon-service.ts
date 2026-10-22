import { Injectable, inject } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokeApiListItem, PokeApiListResponse } from '../models/pokeapi';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokeApiListResponse>('https://pokeapi.co/api/v2/pokemon?limit=20')
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
}
