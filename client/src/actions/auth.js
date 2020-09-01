import axios from "axios";
import { setAlert, setLoader, setRedirect } from "./common";
import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { host } from "../config";

//Register Employee
export const register = ({
  name,
  password,
  email,
  designation,
  bio,
  domain,
}) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    password,
    email,
    designation,
    bio,
    domain,
  });
  try {
    dispatch(setLoader(true));
    await axios.post(`${host}api/employees`, body, config);
    dispatch(setLoader(false));
    dispatch(setAlert(`Employee Registeration success`, "success"));
    dispatch(setRedirect("/dashboard"));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch(setLoader(false));
  }
};

//load current logged in user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch(setLoader(true));
    const res = await axios.get(`${host}api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(setLoader(false));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setLoader(false));
  }
};

//Employee Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    password,
    email,
  });
  try {
    dispatch(setLoader(true));
    const res = await axios.post(`${host}api/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setLoader(false));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setLoader(false));
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setRedirect(""));
};
