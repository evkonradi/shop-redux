import { configureStore  } from '@reduxjs/toolkit'
import productReducer from '../components/ProductList/productSlice'
import cartReducer from '../components/Cart/cartSlice'
import { devToolsEnhancer  } from 'redux-devtools-extension';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  }
}, devToolsEnhancer());

console.log(store.getState());

export default store;