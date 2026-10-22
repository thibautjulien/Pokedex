import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemons(): Pokemon[] {
    return [
      {
        id: 1,
        name: 'Bulbizarre',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      },
      {
        id: 4,
        name: 'Salamèche',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      },
      {
        id: 7,
        name: 'Carapuce',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      },
    ];
  }
}
