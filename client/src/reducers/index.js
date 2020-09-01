import { combineReducers } from "redux";
import common from "./common";
import auth from "./auth";
import employees from "./employees";
import feedbacks from "./feedbacks";
import { LOGOUT, AUTH_ERROR } from "../actions/types";

const appReducer = combineReducers({
  common,
  auth,
  employees,
  feedbacks,
});

export default (state, action) => {
  const { type } = action;
  if (type === LOGOUT || type === AUTH_ERROR) {
    state = undefined;
  }
  return appReducer(state, action);
};
