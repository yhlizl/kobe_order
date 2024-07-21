// store.ts
import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number; // 新增的 quantity 屬性
}

type CartState = {
  cart: { [key: string]: Product };
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; // 新增的 removeFromCart 函數
  changeQuantity: (productId: string, quantity: number) => void; // 新增的 changeQuantity 函數
};

export const useStore = create<CartState>((set) => ({
  cart: {},
  addToCart: (product) => set((state) => {
    const cartProduct = state.cart[product.id];
    if (cartProduct) {
      // 如果商品已經在購物車中，增加數量
      cartProduct.quantity += 1;
    } else {
      // 如果商品不在購物車中，添加到購物車並設置數量為 1
      product.quantity = 1;
    }
    return { cart: { ...state.cart, [product.id]: product } };
  }),
  removeFromCart: (productId) => set((state) => {
    const newCart = { ...state.cart };
    delete newCart[productId];
    return { cart: newCart };
  }),
  changeQuantity: (productId, quantity) => set((state) => {
    const cartProduct = state.cart[productId];
    if (cartProduct) {
      cartProduct.quantity = quantity;
      return { cart: { ...state.cart, [productId]: cartProduct } };
    }
    return state;
  }),
}));