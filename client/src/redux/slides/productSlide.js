import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  brand: "",
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    searchBrand: (state, action) => {
      const { brand = [] } = action.payload;
      state.brand = brand ? brand : state.brand;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct, searchBrand } = productSlide.actions;

export default productSlide.reducer;
