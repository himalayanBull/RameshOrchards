export type ProductCategory =
  | 'fresh-fruits'
  | 'dried-fruits'
  | 'apple-cider-vinegar'
  | 'healthy-snacks'
  | 'preserves-jams'
  | 'gift-boxes'
  | 'track-your-tree';

export type FruitType = 'apple' | 'cherry' | 'plum' | 'apricot' | 'pear' | 'peach';

export interface NutritionalInfo {
  calories: string;
  protein: string;
  carbs: string;
  fiber: string;
  sugar: string;
  vitaminC?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  price: number;
  unit: string;
  category: ProductCategory;
  subcategory?: string;
  fruitType?: FruitType;
  inStock: boolean;
  isBestSeller?: boolean;
  isSeasonal?: boolean;
  isNew?: boolean;
  origin: string;
  healthBenefits?: string[];
  storageInstructions?: string;
  shippingInfo?: string;
  nutritionalInfo?: NutritionalInfo;
  weight?: string;
  rating?: number;
  reviewCount?: number;
  relatedProducts?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export interface TreeAdoption {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  priceLabel: string;
  features: string[];
  updates: TreeUpdate[];
}

export interface TreeUpdate {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
  product?: string;
}
