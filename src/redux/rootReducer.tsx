// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import rightSidebarReducer from "./features/rightSidebarSlice";
import layoutReducer from "./features/layoutSlice";
import sidebarBgReducer from "./features/sidebarBgSlice";
import mainBgReducer from "./features/mainBgSlice";
import addTaskModalReducer from "./features/addTaskModalSlice";
import editTaskModalReducer from "./features/editTaskModalSlice";
import viewTaskModalReducer from "./features/viewTaskModalSlice";
import composeMailModalReducer from "./features/composeMailModalSlice";
import expandMailModalReducer from "./features/expandMailModalSlice";
import createFolderModalReducer from "./features/createFolderModalSlice";
import uploadFileModalReducer from "./features/uploadFileModalSlice";
import fileDetailModalReducer from "./features/fileDetailModalSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  rightSidebar: rightSidebarReducer,
  layout: layoutReducer,
  sidebarBg: sidebarBgReducer,
  mainBg: mainBgReducer,
  addTaskModal: addTaskModalReducer,
  editTaskModal: editTaskModalReducer,
  viewTaskModal: viewTaskModalReducer,
  composeMailModal: composeMailModalReducer,
  expandMailModal: expandMailModalReducer,
  uploadFileModal: uploadFileModalReducer,
  createFolderModal: createFolderModalReducer,
  fileDetailModal: fileDetailModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
