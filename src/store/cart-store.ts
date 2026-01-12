import { create } from "zustand";

type CartItem = {
  id: number | string;
  title: string;
    authors: string;
  price: string;
  quantity: number;
  year: string;
  image: string;
  subtitle?: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void; 
  removeFromCart: (id: number | string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ 
    cart: state.cart.filter((item) => item.id !== id) 
  })),
}));