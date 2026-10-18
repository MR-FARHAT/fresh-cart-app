import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const { data } = await api.get("/products");
  return data.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const productsReducer = productsSlice.reducer;
