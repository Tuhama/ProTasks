import { createSlice } from "@reduxjs/toolkit";
import store from "../../app/store";
import { login } from "../../util/APIUtils";

import { ACCESS_TOKEN } from "../../constants";
import { resetAction } from "../../app/rootReducer";

const initialState = {
  currentUser: undefined,
  isActivated: false,
  loading: false,
  isError: false,
  errorMsg: undefined,
  isSuccess: true,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialLoadStart(state) {
      state.loading = true;
    },
    initialLoadSuccess(state) {
      state.loading = false;
      state.isActivated = true;
    },
    loginStart(state, action) {
      state.currentUser = action.payload;
      state.loading = true;
    },
    loginSuccess(state, action) {
      if (action.payload) {
        localStorage.setItem(ACCESS_TOKEN, action.payload.token);
        state.isActivated = true;
        state.loading = false;
        state.isSuccess = true;
      }
    },
    failedWithError(state, action) {
      state.isSuccess = false;
      state.loading = false;
      state.isError = true;
      state.errorMsg = action.payload;
    },
  },
});

export const {
  initialLoadStart,
  initialLoadSuccess,
  loginStart,
  loginSuccess,
  failedWithError,
} = authSlice.actions;

export default authSlice.reducer;

///in case of a reload
export const initialLoadThunk = () => (dispatch) => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(initialLoadStart());
    //token should be checked with the back end
    dispatch(initialLoadSuccess());
  }
};

export const logoutThunk = () => (dispatch) => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    store.dispatch({ type: resetAction.type });
    localStorage.removeItem(ACCESS_TOKEN);
  }
};

export const loginThunk = (user) => async (dispatch) => {
  dispatch(loginStart(user));
  login(user).then((response) => {
    if (response) {
      if (response.status === "ok") dispatch(loginSuccess(response));
      else dispatch(failedWithError());
    }
  });
};
