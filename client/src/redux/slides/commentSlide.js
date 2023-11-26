import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

export const commentSlide = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComments: (state, action) => {
      const { comments = [] } = action.payload;
      state.comments = comments ? comments : state.comments;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addComments } = commentSlide.actions;

export default commentSlide.reducer;
