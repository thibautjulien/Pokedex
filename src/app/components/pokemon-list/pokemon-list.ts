import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon-service';
import { Pokemon } from '../../models/pokemon';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, FormsModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  private pokemonsService = inject(PokemonService);
  protected readonly page = this.pokemonsService.page;

  protected readonly pokemons = signal<Pokemon[]>([]);
  protected readonly total = signal(0);
  protected readonly totalPages = computed(() => Math.ceil(this.total() / 20));
  protected readonly tousLesPokemons = signal<Pokemon[]>([]);
  protected readonly recherche = signal('');
  protected readonly erreur = signal<string | null>(null);

  protected readonly resultats = computed(() => {
    const terme = this.recherche().toLowerCase().trim();
    return this.tousLesPokemons().filter((p) => p.name.toLowerCase().includes(terme));
  });

  ngOnInit(): void {
    this.charger();
    this.pokemonsService.getAllPokemons().subscribe({
      next: (data) => {
        this.tousLesPokemons.set(data);
      },
      error: () => {
        this.erreur.set('Impossible de charger la liste pour la recherche.');
      },
    });
  }

  suivant(): void {
    this.page.update((p) => p + 1);
    this.charger();
  }

  precedent(): void {
    this.page.update((p) => p - 1);
    this.charger();
  }

  private charger(): void {
    this.erreur.set(null);
    const offset = (this.page() - 1) * 20;
    this.pokemonsService.getPokemons(offset).subscribe({
      next: (data) => {
        this.pokemons.set(data.pokemons);
        this.total.set(data.total);
      },
      error: () => {
        this.erreur.set('Impossible de charger les Pokémon. Vérifie ta connexion.');
      },
    });
  }
}
