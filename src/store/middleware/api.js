import { apiBegin } from "../api";

import { apiClient } from "../../api/config";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiBegin.type) return next(action);

    next(action);

    const { url, onSuccess } = action.payload;

    const { ok, data } = await apiClient.get(url);
    if (ok) {
      dispatch({ type: onSuccess, payload: data?.data });
    } else {
      const {error} = data
      error && alert(error)
    }
  };

export default api;
