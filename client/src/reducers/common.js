import {
  SET_ALERT,
  REMOVE_ALERT,
  SET_LOADER,
  SET_REDIRECT,
} from "../actions/types";

const initialState = { alertList: [], loader: false, redirectTo: "" };
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...state, alertList: [...state.alertList, payload] };
    case REMOVE_ALERT:
      return {
        ...state,
        alertList: [...state.alertList.filter((alert) => alert.id !== payload)],
      };
    case SET_LOADER:
      return { ...state, loader: payload };
    case SET_REDIRECT:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
}
