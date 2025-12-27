import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countries-list.html'
})
export class CountriesList implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  selectedRegion: string = 'all';
  isLoading: boolean = false;
  errorMessage: string = '';

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.isLoading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des pays';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  onRegionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedRegion = target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCountries = this.countries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(this.searchTerm);
      const matchesRegion = this.selectedRegion === 'all' || country.region === this.selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }

  formatPopulation(pop: number): string {
    return pop.toLocaleString('fr-FR');
  }
}