export type MealPeriod = 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'drinks';

export type DietaryTag = 'V' | 'VG' | 'GF' | 'DF' | 'NF' | 'RAW';

export interface DishItem {
  id: string;
  name: string;
  frenchName?: string;
  description: string;
  price: number;
  category: string;
  mealPeriod: MealPeriod[];
  dietary: DietaryTag[];
  pairing?: string;
  isBakeryPickup?: boolean;
  image?: string;
  calories?: number;
  highlights?: string[];
  seasonal?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  mealPeriod: MealPeriod;
  hours: string;
  description?: string;
}

export type PurveyorCategory = 'all' | 'produce-grains' | 'dairy-eggs' | 'seafood-meats';

export interface Purveyor {
  id: string;
  name: string;
  location: string;
  distanceMiles: number;
  specialty: string;
  category?: 'produce-grains' | 'dairy-eggs' | 'seafood-meats';
  certification?: string;
  description: string;
  sustainablePractices: string[];
  partneredSince: number;
  image?: string;
}

export interface EventSpace {
  id: string;
  name: string;
  seatedCapacity: number;
  receptionCapacity: number;
  minSpend: string;
  description: string;
  squareFootage: number;
  amenities: string[];
  idealFor: string[];
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  background: string;
  image?: string;
  awards?: string[];
}

export interface PressReview {
  id: string;
  publication: string;
  quote: string;
  author?: string;
  year: number | string;
  rating?: string;
  accolade?: string;
}

export type SeatingZone = 'main-dining' | 'garden-patio' | 'chefs-counter' | 'bar-lounge';

export interface ReservationDetails {
  guestCount: number;
  date: string;
  mealPeriod: MealPeriod;
  timeSlot: string;
  seatingZone: SeatingZone;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  dietaryRestrictions?: string[];
  confirmationCode?: string;
}

export interface CartItem {
  id: string;
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  notes?: string;
  pickupDate?: string;
  pickupTime?: string;
}

export interface CateringInquiry {
  date: string;
  timeframe: 'morning' | 'afternoon' | 'evening' | 'full-day';
  guestCount: number;
  eventType: 'corporate' | 'wedding' | 'private-dinner' | 'celebration' | 'cocktail-reception';
  spacePreference: string;
  diningFormat: 'prix-fixe' | 'family-style' | 'canapes' | 'buffet-spread';
  winePairing: boolean;
  budgetRange: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyOrHost?: string;
  notes?: string;
}
