// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:", action.payload);
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

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
      // Use filter to create a new array without the item to be removed
      const updatedItems = state.items.filter((item) => item.id !== idToRemove);
      // Return a new state object with the updated items array
      return {
        ...state,
        items: updatedItems,
      };
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
