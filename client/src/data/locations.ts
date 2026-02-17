export interface CityData {
  name: string;
  slug: string;
  state: string;
  description: string;
  population: string;
  restaurants: number;
}

export const cities: CityData[] = [
  { name: "New York", slug: "new-york", state: "NY", description: "The restaurant capital of the world", population: "8.3M", restaurants: 27000 },
  { name: "Los Angeles", slug: "los-angeles", state: "CA", description: "Diverse dining scene spanning every cuisine", population: "3.9M", restaurants: 15000 },
  { name: "Chicago", slug: "chicago", state: "IL", description: "Deep dish and beyond - a culinary powerhouse", population: "2.7M", restaurants: 7300 },
  { name: "Houston", slug: "houston", state: "TX", description: "Tex-Mex, BBQ, and international flavors", population: "2.3M", restaurants: 10000 },
  { name: "Miami", slug: "miami", state: "FL", description: "Latin-inspired cuisine meets oceanfront dining", population: "470K", restaurants: 4500 },
  { name: "San Francisco", slug: "san-francisco", state: "CA", description: "Farm-to-table innovation at its finest", population: "870K", restaurants: 4500 },
  { name: "Las Vegas", slug: "las-vegas", state: "NV", description: "World-class dining and entertainment", population: "650K", restaurants: 3500 },
  { name: "Seattle", slug: "seattle", state: "WA", description: "Pacific Northwest flavors and coffee culture", population: "740K", restaurants: 3500 },
  { name: "Boston", slug: "boston", state: "MA", description: "Historic dining with modern innovation", population: "690K", restaurants: 3000 },
  { name: "Atlanta", slug: "atlanta", state: "GA", description: "Southern hospitality meets culinary creativity", population: "500K", restaurants: 4000 },
  { name: "Denver", slug: "denver", state: "CO", description: "Mountain-fresh ingredients and craft dining", population: "720K", restaurants: 3000 },
  { name: "Nashville", slug: "nashville", state: "TN", description: "Hot chicken and beyond - a food city on the rise", population: "690K", restaurants: 2500 },
  { name: "Austin", slug: "austin", state: "TX", description: "BBQ, tacos, and food trucks galore", population: "980K", restaurants: 3500 },
  { name: "Portland", slug: "portland", state: "OR", description: "Indie food scene with sustainable practices", population: "650K", restaurants: 2500 },
  { name: "New Orleans", slug: "new-orleans", state: "LA", description: "Cajun, Creole, and soul food traditions", population: "390K", restaurants: 1800 },
  { name: "Philadelphia", slug: "philadelphia", state: "PA", description: "From cheesesteaks to fine dining", population: "1.6M", restaurants: 4000 },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug);
}
