import { createSlice } from "@reduxjs/toolkit";





let counterSlice = createSlice ({
  name: 'counter',
  initialState: {
    counter: 0
  },
  reducers: {
    increase: (state) => {
      state.counter++;
    },
    decrease: (state) => {
      state.counter--;
    },
    incrementByNumber: (state , action) => {
      state.counter += action.payload;
    }
  }
})


export let counterReducerName = counterSlice.reducer
export let {increase , decrease,incrementByNumber} = counterSlice.actions