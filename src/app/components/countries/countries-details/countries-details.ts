import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { WeatherService } from '../../../services/weather.service';
import { Country } from '../../../models/country.model';
import { Weather } from '../../../models/weather.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countries-details.html'
})
export class CountryDetails implements OnInit {
  country: Country | null = null;
  weather: Weather | null = null;
  isLoadingCountry: boolean = false;
  isLoadingWeather: boolean = false;
  errorMessage: string = '';
  weatherError: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.loadCountry(code);
    }
  }

  loadCountry(code: string): void {
    this.isLoadingCountry = true;
    this.countryService.getCountryByCode(code).subscribe({
      next: (data) => {
        this.country = data;
        this.isLoadingCountry = false;

        // Charger la météo si coordonnées disponibles
        if (this.country.latlng && this.country.latlng.length === 2) {
          this.loadWeather(this.country.latlng[0], this.country.latlng[1]);
        }
      },
      error: (error) => {
        this.errorMessage = 'Pays introuvable';
        this.isLoadingCountry = false;
        console.error(error);
      }
    });
  }

  loadWeather(lat: number, lon: number): void {
    this.isLoadingWeather = true;
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe({
      next: (data) => {
        this.weather = data;
        this.isLoadingWeather = false;
      },
      error: (error) => {
        this.weatherError = 'Météo indisponible';
        this.isLoadingWeather = false;
        console.error(error);
      }
    });
  }

  formatPopulation(pop: number): string {
    return pop.toLocaleString('fr-FR');
  }

  formatArea(area: number): string {
    return area.toLocaleString('fr-FR');
  }

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  goBack(): void {
    this.router.navigate(['/countries']);
  }
}