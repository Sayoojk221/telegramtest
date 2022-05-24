import { combineReducers } from "redux";

import transactionReducer from "./slices/transactions";

export default combineReducers({
  transactions: transactionReducer,
});
