import { createSlice } from '@reduxjs/toolkit'

const initialState = [];
// const initialState = [
//     { id: '1', title: 'First Post!', content: 'Hello!' },
//     { id: '2', title: 'Second Post', content: 'More text' }
//   ]
  

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  }
});

export default productSlice.reducer