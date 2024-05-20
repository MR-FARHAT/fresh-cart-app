import { configureStore } from "@reduxjs/toolkit";
import { counterReducerName } from "./counterSlice";
import { productsReducer } from "./productsSlice";




export let store = configureStore ({
  reducer: {
    counter: counterReducerName ,
    products: productsReducer
  }
})