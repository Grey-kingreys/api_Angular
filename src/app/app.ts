import { Component, signal } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { RouterModule } from '@angular/router';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Navbar, Footer, RouterModule]
})
export class App {
  protected readonly title = signal('apiRest');

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    // Test 1 : Récupérer la liste
    this.pokemonService.getAllPokemons().subscribe({
      next: (data) => {
        console.log('📋 Liste des pokémons:', data);
        console.log('✅ Nombre total:', data.count);
        console.log('✅ Premier pokémon:', data.results[0]);
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
      }
    });

    // Test 2 : Récupérer un pokémon spécifique (Pikachu = id 25)
    this.pokemonService.getPokemonById(25).subscribe({
      next: (pokemon) => {
        console.log('⚡ Détail de Pikachu:', pokemon);
        console.log('✅ Nom:', pokemon.name);
        console.log('✅ Poids:', pokemon.weight);
        console.log('✅ Types:', pokemon.types);
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
      }
    });
  }
}
