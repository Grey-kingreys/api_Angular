import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonListItem } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {
  // Variables qu'on a identifiées ensemble
  allPokemons: PokemonListItem[] = [];
  filteredPokemons: PokemonListItem[] = [];
  displayedPokemons: PokemonListItem[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;

  isLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;

    this.pokemonService.getAllPokemons(200).subscribe({
      next: (data) => {
        this.allPokemons = data.results;
        this.filteredPokemons = [...this.allPokemons];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pokémons:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemons = [...this.allPokemons];
    } else {
      this.filteredPokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPokemons = this.filteredPokemons.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  getPokemonImage(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  viewDetails(pokemon: PokemonListItem): void {
    const id = this.getPokemonId(pokemon.url);
    this.router.navigate(['/pokemons', id]);
  }
}