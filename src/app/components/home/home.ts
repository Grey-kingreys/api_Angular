import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  totalCountries: number = 0;
  totalPokemons: number = 200;
  randomCountries: any[] = [];
  randomPokemons: any[] = [];
  isLoading: boolean = true;

  features = [
    {
      icon: '🌍',
      title: 'Explorer les Pays',
      description: 'Découvrez tous les pays du monde avec leurs informations détaillées',
      route: '/pays',
      color: 'blue',
      stats: '250+ pays',
    },
    {
      icon: '⚡',
      title: 'Découvrir les Pokémons',
      description: 'Parcourez 200 Pokémons avec leurs statistiques complètes',
      route: '/pokemon',
      color: 'blue',
      stats: '200 pokémons'
    }
  ];

  quickStats = [
    { label: 'Pays', value: 0, icon: '🗺️', color: 'bg-blue-500' },
    { label: 'Pokémons', value: 200, icon: '⚡', color: 'bg-yellow-500' },
    { label: 'Continents', value: 5, icon: '🌏', color: 'bg-green-500' },
    { label: 'Types', value: 18, icon: '🎯', color: 'bg-purple-500' }
  ];

  constructor(
    private countryService: CountryService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Charger les pays
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        this.totalCountries = countries.length;
        this.quickStats[0].value = countries.length;

        // Prendre 3 pays aléatoires
        this.randomCountries = this.getRandomItems(countries, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement pays:', err);
        this.isLoading = false;
      }
    });

    // Charger les pokémons
    this.pokemonService.getAllPokemons().subscribe({
      next: (data) => {
        // Prendre 3 pokémons aléatoires
        this.randomPokemons = this.getRandomItems(data.results, 3);
      },
      error: (err) => console.error('Erreur chargement pokémons:', err)
    });
  }

  getRandomItems(array: any[], count: number): any[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
