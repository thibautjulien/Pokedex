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
  protected readonly erreur = signal<string | null>(null);

  ngOnInit(): void {
    this.pokemonService.getPokemonInfo(this.id()).subscribe({
      next: (detail) => {
        this.pokemon.set(detail);
      },
      error: () => {
        this.erreur.set('Ce pokémon est introuvable.');
      },
    });
  }

  couleurType(type: string): string {
    return TYPE_COLORS[type] ?? 'bg-gray-400';
  }
}
