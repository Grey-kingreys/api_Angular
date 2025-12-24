import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Pays } from './features/pays/pays';
import { Pokemon } from './features/pokemon/pokemon';

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
        component: Pokemon
    },
];

