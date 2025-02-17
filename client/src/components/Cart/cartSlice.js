import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    cartOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
            state.cartOpen = true;
        },
        updateCartQuantity(state, action){
            state.items.map(product => {
                if (action.payload._id === product._id) {
                    product.purchaseQuantity = action.payload.purchaseQuantity;
                };
                return product;
            });
            state.cartOpen = true;
        },
        toggleCart(state) {
            state.cartOpen = !state.cartOpen;
        },
        addMultipleToCart(state, action){
            state.items = action.payload.products;
        },
        removeFromCart(state, action){
            let newItems = state.items.filter(product => {
                return product._id !== action.payload._id;
            });
            state.items = newItems;
        },
        clearCart(state){
            state.items = [];
        }
    }
});

export const {addToCart, updateCartQuantity, toggleCart, addMultipleToCart, removeFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer