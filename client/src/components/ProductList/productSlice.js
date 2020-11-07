import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  categories: [],
  currentCategory: ''
};

const productSlice = createSlice({
  name: 'productItems',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state.products= [...action.payload.products];
    },
    updateCategories(state, action) {
      state.categories= [...action.payload.categories];
    },
    updateCurrentCategory(state, action){
      state.currentCategory = action.payload.currentCategory;
    }
  }
});

export const {updateProducts, updateCategories, updateCurrentCategory} = productSlice.actions

export default productSlice.reducer