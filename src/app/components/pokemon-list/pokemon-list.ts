import { Component, inject, signal, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { Pokemon } from '../../models/pokemon';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  private pokemonsService = inject(PokemonService);

  protected readonly pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe((data) => this.pokemons.set(data));
  }
}
