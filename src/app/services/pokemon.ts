import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse, PokemonDetails } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  // Méthode 1 : Récupérer la liste des pokémons
  getAllPokemons(limit: number = 200): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}`);
  }

  // Méthode 2 : Récupérer le détail d'un pokémon
  getPokemonById(id: number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.apiUrl}/${id}`);
  }
}