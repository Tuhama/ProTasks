import {
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";

// Reducers
import authReducer from "../features/auth/authSlice";

const appReducer = combineReducers({
  auth: authReducer,
});

export const resetAction = createAction("RESET");

const resettableReducer = (state, action) => {
  if (resetAction.match(action)) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default resettableReducer;
