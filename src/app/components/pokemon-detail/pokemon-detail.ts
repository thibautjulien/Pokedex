import { Component, input, signal, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { PokemonInfo } from '../../models/pokemon';
import { RouterLink } from '@angular/router';
import { TYPE_COLORS } from '../../models/type-colors';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit {
  id = input.required<string>();

  private pokemonService = inject(PokemonService);

  protected readonly pokemon = signal<PokemonInfo | null>(null);

  ngOnInit(): void {
    this.pokemonService.getPokemonInfo(this.id()).subscribe((detail) => this.pokemon.set(detail));
  }
}
