export interface Depense {
    id: number;
    nom: string;
    prix: number;
    description: string;
    date: Date;
}

export const depenses = [
    {
        id: 1,
        nom: 'iPhone 15',
        prix: 969,
        description: 'Cadeau pour ma soeur',
        date: new Date(2023, 9, 15)
    },
    {
        id: 2,
        nom: 'Nintendo switch',
        prix: 269,
        description: '',
        date: new Date(2023, 9, 16)
    },
    {
        id: 3,
        nom: 'Billets avion Japon',
        prix: 1051,
        description: 'Voyage prévu dans 3 mois',
        date: new Date(2023, 9, 17)
    }
]