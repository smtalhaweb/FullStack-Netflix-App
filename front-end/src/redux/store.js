import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// you can use different name as userReducer or userSlice 

export default configureStore({
  reducer: {
    app: userReducer,
  },
});
