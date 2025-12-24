import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Pays } from './features/pays/pays';
import { PokemonList } from './components/pokemon-list/pokemon-list';
import { PokemonDetail } from './components/pokemon-detail/pokemon-detail';

export const routes: Routes = [
    {
        path: '',
        component: Home
        
    },
    {
        path: 'pays',
        component: Pays
    },
    {
        path: 'pokemon',
        component: PokemonList
    },
    {
        path: 'pokemons/:id',
        component: PokemonDetail
    }
];

