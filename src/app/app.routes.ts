import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CountriesList } from './components/countries/countries-list/countries-list';
import { CountryDetails } from './components/countries/countries-details/countries-details';
import { PokemonList } from './components/pokemons/pokemon-list/pokemon-list';
import { PokemonDetail } from './components/pokemons/pokemon-detail/pokemon-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home
        
    },
    {
        path: 'pays',
        component: CountriesList
    },
    {
        path: 'pays/:code',
        component: CountryDetails
    },
    {
        path: 'pokemon',
        component: PokemonList
    },
    {
        path: 'pokemons/:id',
        component: PokemonDetail
    },
    {
        path: '**',
        redirectTo: ''
    }
];

