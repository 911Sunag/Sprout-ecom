import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/Products.json';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  onSale: boolean;
  description?: string;
}

interface ProductsState {
  items: Product[];
  searchTerm: string;
}

const initialState: ProductsState = {
  items: productsData,
  searchTerm: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;
