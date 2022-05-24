import { configureStore } from "@reduxjs/toolkit";

import reducer from "./entities";
import api from "./middleware/api";
const store = configureStore({
  reducer,
  middleware: (defaultMiddleWares) => [...defaultMiddleWares(), api],
});

export default store;
