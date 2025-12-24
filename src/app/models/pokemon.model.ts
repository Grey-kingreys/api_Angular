// models/pokemon.model.ts

// Structure de la liste des pokémons
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}

// Structure du détail d'un pokémon
export interface PokemonDetails {
    id: number;
    name: string;
    height: number;  // en décimètres
    weight: number;  // en hectogrammes
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
}