import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList {
  private pokemonsService = inject(PokemonService);

  protected readonly pokemons = signal<Pokemon[]>(this.pokemonsService.getPokemons());
}
