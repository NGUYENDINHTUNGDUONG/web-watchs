import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  role: "",
  refreshToken: "",
  modalSignIn: false,
  modalSignUp: false,
  modalEmail: false,
  modalPassword: false,
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        fullName = "",
        email = "",
        access_token = "",
        address = "",
        phone = "",
        avatar = "",
        id = "",
        role,
        refreshToken = "",
      } = action.payload;
      state.fullName = fullName ? fullName : state.fullName;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phone = phone ? phone : state.phone;
      state.avatar = avatar ? avatar : state.avatar;
      state.id = id ? id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.role = role ? role : state.role;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
    },
    resetUser: (state) => {
      state.fullName = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
      state.role = "";
      state.refreshToken = "";
    },
    modalState: (state, action) => {
      const { modalSignIn = false, modalSignUp = false, modalEmail = false, modalPassword = false} = action.payload;
      state.modalSignIn = modalSignIn ;
      state.modalSignUp = modalSignUp ;
      state.modalEmail = modalEmail ;
      state.modalPassword = modalPassword ;
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, modalState } = userSlide.actions;

export default userSlide.reducer;
