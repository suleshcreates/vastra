export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: 'Men' | 'Women' | 'Accessories';
  image: string;
  description: string;
  story: string;
  palette: string;
  fabric: string;
  imagePosition?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Mehr Ivory Suit Set',
    price: 3990,
    originalPrice: 5990,
    category: 'Women',
    image: 'https://images.pexels.com/photos/36104983/pexels-photo-36104983.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Embroidered occasionwear softened by pearl tones, fluid drape, and a studio-lit silhouette.',
    story: 'Pearled ceremony edit',
    palette: 'Ivory / Gold',
    fabric: 'Chanderi Blend',
    imagePosition: 'center top',
  },
  {
    id: '2',
    name: 'Noor Amber Kurta Set',
    price: 4290,
    originalPrice: 6490,
    category: 'Women',
    image: 'https://images.pexels.com/photos/30435954/pexels-photo-30435954.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A warm-toned embroidered statement with enough texture to anchor the full collection visually.',
    story: 'Warm portrait styling',
    palette: 'Amber / Bronze',
    fabric: 'Cotton Silk',
    imagePosition: 'center top',
  },
  {
    id: '3',
    name: 'Reyaan Bandhgala Set',
    price: 5890,
    originalPrice: 7990,
    category: 'Men',
    image: 'https://images.pexels.com/photos/15619559/pexels-photo-15619559.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Structured menswear with a rich red backdrop that instantly feels premium and occasion-led.',
    story: 'Ceremonial tailoring',
    palette: 'Crimson / Ink',
    fabric: 'Terry Rayon',
    imagePosition: 'center top',
  },
  {
    id: '4',
    name: 'Sarmad Heritage Kurta',
    price: 3490,
    originalPrice: 4890,
    category: 'Men',
    image: 'https://images.pexels.com/photos/7707433/pexels-photo-7707433.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A cleaner menswear image choice that keeps the range grounded while matching the heritage mood.',
    story: 'Quiet confidence',
    palette: 'Stone / Olive',
    fabric: 'Pure Cotton',
    imagePosition: 'center top',
  },
  {
    id: '5',
    name: 'Heirloom Croc Potli',
    price: 2290,
    originalPrice: 3190,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/23223859/pexels-photo-23223859.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Retail-styled accessory photography to make the collection feel merchandised, not just modeled.',
    story: 'Display-led luxury',
    palette: 'Taupe / Camel',
    fabric: 'Vegan Leather',
    imagePosition: 'center',
  },
  {
    id: '6',
    name: 'Zarina Evening Clutch',
    price: 1990,
    originalPrice: 2790,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/18116160/pexels-photo-18116160.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A close crop that introduces jewelry, texture, and styling depth without breaking the palette.',
    story: 'Styled detail shot',
    palette: 'Black / Gold',
    fabric: 'Hand-Embellished',
    imagePosition: 'center',
  },
];
