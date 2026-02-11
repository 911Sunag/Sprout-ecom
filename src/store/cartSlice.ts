import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  notification: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  notification: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number; name: string; price: number; image: string }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    setNotification: (state, action: PayloadAction<string | null>) => {
      state.notification = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setNotification } = cartSlice.actions;
export default cartSlice.reducer;
