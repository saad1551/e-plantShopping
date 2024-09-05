import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalNumOfItems: 0
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            state.totalNumOfItems++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
            state.totalNumOfItems++;
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload.name);
        state.totalNumOfItems -= action.payload.quantity;
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        const oldQuantity = itemToUpdate.quantity;
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
            state.totalNumOfItems += quantity - oldQuantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
