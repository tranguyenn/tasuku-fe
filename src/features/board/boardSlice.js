import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";


const initialState = {
    isLoading: false,
    error: null,
    boardByUserId: {},
    boardNameNav: null,
    boardMemeber: null,
    sideBarBoard: null,
};

const slice= createSlice({
    name: 'board',
    initialState,
    reducers: {
        startLoading(state) {
          state.isLoading = true;
        },
    
        hasError(state, action) {
          state.isLoading = false;
          state.error = action.payload;
        },
        getBoardSuccess(state, action) {
            state.isLoading = false;
            state.error = "";
            console.log("check payload",action.payload);
            const {boards} = action.payload;
            state.boardByUserId=boards;
            console.log("check boards",boards);
        },
        getBoardName(state, action) {
          state.isLoading = false;
          state.error = "";
          console.log("check payload",action.payload);
          const {boardFound} = action.payload;
          state.boardNameNav=boardFound.name;
          state.boardMemeber=boardFound.users;
          state.sideBarBoard=boardFound;
          console.log("check boards",state.boardNameNav);
      },
          createPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
        },
    }
})


export const getBoards =
({ userId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      
      const response = await apiService.get(`/users/${userId}/boards`);
      console.log("recive respone", response.data);
      dispatch(
        slice.actions.getBoardSuccess({
          ...response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
};
export const getBoardName =
  ({ boardId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
     
      const response = await apiService.get(`/boards/${boardId}`);
      console.log("recive respone", response.data);
      dispatch(
        slice.actions.getBoardName({
          ...response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
};




export default slice.reducer;