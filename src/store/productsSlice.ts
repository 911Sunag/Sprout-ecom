import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  unit: string;
  rating: number;
  onSale: boolean;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: productsData,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
