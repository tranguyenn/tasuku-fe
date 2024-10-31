import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/taskSlice";
import commentReducer from "../features/comment/commentSlice";
import boardReducer from "../features/board/boardSlice";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  comment: commentReducer,
  board: boardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;