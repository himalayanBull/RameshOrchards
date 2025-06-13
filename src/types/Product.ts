export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  pricePerKg: number;
  category: string;
  inStock: boolean;
  fruitType: 'apple' | 'pear' | 'plum' | 'peach' | 'apricot' | 'cherry';
}

export interface CartItem {
  product: Product;
  quantity: number;
  packageSize: number; // 5, 10, or 20 kg
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, packageSize: number) => void;
  removeFromCart: (productId: string, packageSize: number) => void;
  updateQuantity: (productId: string, packageSize: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}