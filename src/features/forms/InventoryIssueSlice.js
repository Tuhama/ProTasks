import { createSlice } from "@reduxjs/toolkit";
import { addInventoryIssue } from "../../util/APIUtils";

const initialState = {
  loading: false,
  error: false,
};

export const inventoryIssueSlice = createSlice({
  name: "inventoryIssue",
  initialState,
  reducers: {
    addInventoryIssueStart(state, action) {
      state.loading = true;
      state.inventoryIssue = action.payload;
    },
    addInventoryIssueSuccess(state, action) {
      state.loading = false;
    },
    failedWithError(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  addInventoryIssueStart,
  addInventoryIssueSuccess,
  failedWithError,
} = inventoryIssueSlice.actions;

export default inventoryIssueSlice.reducer;

export const addInventoryIssueThunk = (inventoryIssue) => async (dispatch) => {
  dispatch(addInventoryIssueStart(inventoryIssue));
  addInventoryIssue(inventoryIssue).then((response) => {
    if (response) {
      if (response.status === "ok")
        dispatch(addInventoryIssueSuccess(response));
      else dispatch(failedWithError());
    }
  });
};
