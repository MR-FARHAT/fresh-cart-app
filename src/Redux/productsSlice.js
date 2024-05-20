import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getProducts = createAsyncThunk('products/getProducts', async () => {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products") 
    return data.data;
});

let initialState = {
  products: []
}

let productsSlice = createSlice ({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase (getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
})

export let productsReducer = productsSlice.reducer




