import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, Status, SearchParams, ApiSliceState, ProductsResponse } from './types';
import { identity, pickBy } from 'lodash';

export const fetchProducts = createAsyncThunk<Product[], SearchParams>(
  'product/fetchProductsStatus',
  async (params) => {
    const { search, q, limit } = params;
    let url = 'https://dummyjson.com/products';
    if (q) {
      url += `/${search}`;
    }
    const { data } = await axios.get<ProductsResponse>(url, {
      params: pickBy(
        {
          limit: limit,
          q,
        },
        identity,
      ),
    });

    return data.products;
  },
);

const initialState: ApiSliceState = {
  items: [],
  status: Status.LOADING,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ProductsResponse>) {
      if (Array.isArray(action.payload.products)) {
        state.items = action.payload.products;
      } else {
        console.error('Некорректный формат данных в ответе');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = apiSlice.actions;

export default apiSlice.reducer;
