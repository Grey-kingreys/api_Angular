import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonDetails } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit {
  pokemon: PokemonDetails | null = null;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadPokemonDetail(parseInt(id));
    }
  }

  loadPokemonDetail(id: number): void {
    this.isLoading = true;

    this.pokemonService.getPokemonById(id).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Impossible de charger ce pokémon';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pokemons']);
  }

  getStatColor(statName: string): string {
    const colors: { [key: string]: string } = {
      'hp': 'bg-green-500',
      'attack': 'bg-red-500',
      'defense': 'bg-blue-500',
      'special-attack': 'bg-purple-500',
      'special-defense': 'bg-yellow-500',
      'speed': 'bg-pink-500'
    };
    return colors[statName] || 'bg-gray-500';
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'fire': 'bg-orange-500',
      'water': 'bg-blue-400',
      'grass': 'bg-green-400',
      'electric': 'bg-yellow-400',
      'psychic': 'bg-pink-400',
      'ice': 'bg-cyan-300',
      'dragon': 'bg-indigo-500',
      'dark': 'bg-gray-700',
      'fairy': 'bg-pink-300',
      'normal': 'bg-gray-400',
      'fighting': 'bg-red-600',
      'flying': 'bg-indigo-300',
      'poison': 'bg-purple-500',
      'ground': 'bg-yellow-600',
      'rock': 'bg-yellow-700',
      'bug': 'bg-green-500',
      'ghost': 'bg-purple-700',
      'steel': 'bg-gray-500'
    };
    return colors[type] || 'bg-gray-400';
  }

}
