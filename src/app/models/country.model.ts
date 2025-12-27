// src/app/countries/models/country.model.ts

export interface Country {
    // Informations de base
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };

    name: {
        common: string;
        official: string;
        nativeName?: any;  // On s'en fiche pour l'affichage
    };

    // Codes pays
    cca2: string;  // "FR"
    cca3: string;  // "FRA"

    // Informations géographiques
    capital?: string[];
    region: string;
    subregion?: string;
    latlng?: [number, number];
    area: number;

    // Démographie
    population: number;

    // Informations supplémentaires (pour le détail)
    languages?: Record<string, string>;
    currencies?: Record<string, { name: string; symbol: string }>;
    timezones?: string[];
}