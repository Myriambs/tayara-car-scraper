// store.js
import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./CarListSLice";

export const store = configureStore({
  reducer: {
    car: carReducer
  }
});
