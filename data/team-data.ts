import { TeamMember } from '@/types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'julian-ross',
    name: 'Julian Ross',
    role: 'Executive Chef & Co-Founder',
    bio: 'Raised between the Basque countryside and Northern California, Julian trained under 3-Michelin-starred legends in Paris and San Francisco before founding Maison & Co. His cooking honors pristine regional ingredients cooked simply over open embers with classical French technique.',
    background: 'Formerly L’Arpège (Paris), Saison (San Francisco), The French Laundry (Yountville).',
    awards: [
      'James Beard Foundation Best Chef Semifinalist (2025)',
      'Michelin Guide Young Chef Award (2024)',
      'Food & Wine Best New Chef (2023)',
    ],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'antoine-mercier',
    name: 'Antoine Mercier',
    role: 'Head Baker & Master Viennois',
    bio: 'A fifth-generation baker from Lyon, Antoine has dedicated his life to wild yeast microbiology and heritage grain preservation. He leads Maison’s bakehouse with a 48-hour cold fermentation protocol, stone-milling grains on-site daily.',
    background: 'Compagnons du Devoir Tour de France, Boulangerie Poilâne (Paris), Tartine Bakery (San Francisco).',
    awards: [
      'Grand Prix de la Baguette Traditionnelle Finalist',
      'Coupe du Monde de la Boulangerie Silver Medalist (2022)',
      'Artisan Baker of the Year — Gastronomy Guild (2025)',
    ],
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'clara-vance',
    name: 'Clara Vance',
    role: 'Beverage Director & Master Sommelier',
    bio: 'Clara oversees Maison & Co.’s 650-reference cellar, championing low-intervention, biodynamic, and women-led estates alongside rare cellar allocations. She also directs our botanical non-alcoholic pairing program and direct-trade single-origin coffee extractions.',
    background: 'Court of Master Sommeliers (CMS) Diplôme, Eleven Madison Park (New York), SingleThread (Healdsburg).',
    awards: [
      'Sommelier of the Year — Michelin Guide (2025)',
      'Wine Spectator Grand Award of Excellence (2024)',
      'Top 40 Under 40 Tastemakers — Wine Enthusiast',
    ],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
  },
];
