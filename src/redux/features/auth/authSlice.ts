import { createSlice } from "@reduxjs/toolkit";

type userData = {
  accessToken: string | null;
  email: string | null;
};

const storedData = localStorage.getItem("auth");
let parsedData: userData | null = null;
if (storedData) {
  parsedData = JSON.parse(storedData);
}

const initialState: userData = parsedData || {
  accessToken: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update the state with the provided data
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    },
    logOut: (state) => {
      localStorage.removeItem("auth");
      (state.accessToken = null), (state.email = null);
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
