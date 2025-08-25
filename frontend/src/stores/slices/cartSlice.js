import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
};

const recalcSubtotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      state.subtotal = recalcSubtotal(state.items);
    },
    addItem(state, action) {
      const existing = state.items.find(i => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.subtotal = recalcSubtotal(state.items);
    },
    updateItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      state.subtotal = recalcSubtotal(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload);
      state.subtotal = recalcSubtotal(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { setCart, addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;