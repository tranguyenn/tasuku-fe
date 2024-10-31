import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { stubArray } from "lodash";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  taskList: null,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTaskBoardSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { result } = action.payload;
      const tmp = result;
      const castTask = tmp.tasks.reduce((acc, item, index) => {
        console.log("item id", item);
        return { ...acc, ...item };
      }, {});
      console.log("cast task", result.tasks);
      const resultTask = result;
      resultTask.tasks = castTask;
      state.taskList = resultTask;
      console.log("check task", state.taskList);
    },

    updateTaskSucess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    deleteTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },
  },
});



export const getTask =
  ({ boardId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/tasks/${boardId}/board`);
      dispatch(
        slice.actions.getTaskBoardSuccess({
          ...response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateTask =
  ({ taskId, status, boardId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/tasks/${taskId}`, {
        status,
      });
      dispatch(slice.actions.updateTaskSucess(response.data));
      dispatch(getTask({ boardId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
  export const addMemberToBoard =
  ({  boardId, email }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/boards/assignee`, {
        boardId,
        email
      });
      dispatch(slice.actions.updateTaskSucess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
  export const updateTaskInfor =
  ({ taskId, content, boardId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    let imgUrl=""
    if(content.cover){
      imgUrl = await cloudinaryUpload(content.cover);
    }
    try {
      const response = await apiService.put(`/tasks/${taskId}`, {
        name: content.name?content.name:"",
        description: content.description?content.description:"",
        cover: imgUrl,
      });
      dispatch(slice.actions.updateTaskSucess(response.data));
      dispatch(getTask({ boardId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const deleteTask =
  ({ taskId, boardId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("post 123", taskId);
      // const response = await apiService.delete("/comments", { commentId });
      const response = await apiService.delete(`/tasks/${taskId}`);
      console.log("respones", response);
      dispatch(slice.actions.deleteTaskSuccess(response.data));
      dispatch(getTask({ boardId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
  export const createTask =
  (content ) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("create",content)
      const boardId=content.board;
      const name= content.name;
      const description= content.description;
      const status= "pending";
      let imgUrl="https://res.cloudinary.com/de1gbhd5y/image/upload/v1726823417/samples/cup-on-a-table.jpg";
      if(content.cover){
        imgUrl = await cloudinaryUpload(content.cover);
      }
      console.log("create img",imgUrl)
      const response = await apiService.post("/tasks", {
        name: content.name,
        description: content.description,
        status: "pending",
        cover: imgUrl,
        boardId: content.board,
      });
      dispatch(slice.actions.createTaskSuccess(response.data));
      dispatch(getTask({boardId}));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
  export default slice.reducer;