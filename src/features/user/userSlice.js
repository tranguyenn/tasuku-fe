import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  listUser:null
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
    getUserSearchSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.listUser = action.payload;
    },
  },
});

export default slice.reducer;



export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export const searchUser = (searchTerm) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    // Appending the searchTerm as a query parameter (e.g. ?name=a or ?email=a)
    const response = await apiService.get(`/users/invite?name=${searchTerm}`);
    dispatch(slice.actions.getUserSearchSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};