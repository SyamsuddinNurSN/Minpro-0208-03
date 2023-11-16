// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
