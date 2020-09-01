import axios from "axios";
import { setAlert, setLoader, setRedirect } from "./common";
import {
  SAVE_EMP_LIST,
  SET_UPDATE_EMP_DATA,
  SET_UPDATE_EMP_ID,
  SET_FEEDBACK_EMP_ID,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { host } from "../config";

// fetch all Employees List
export const getEmployeesList = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch(setLoader(true));
    const res = await axios.get(`${host}api/employees`);
    dispatch({
      type: SAVE_EMP_LIST,
      payload: res.data.employees,
    });
    dispatch(setLoader(false));
    dispatch(setRedirect(""));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(setRedirect(""));
    dispatch(setLoader(false));
  }
};
//Set UserId in redux to see feedback of that user
export const setEmpForFeedback = (id) => (dispatch) => {
  dispatch({
    type: SET_FEEDBACK_EMP_ID,
    payload: id,
  });
};
//Set UserId in redux to make update on that user
export const setUserForUpdate = (id) => (dispatch) => {
  dispatch({
    type: SET_UPDATE_EMP_ID,
    payload: id,
  });
};
// Update Employee Data
export const updateEmployee = ({
  _id,
  name,
  email,
  designation,
  bio,
  domain,
  giveAdminRight,
  revokeAdminRight,
}) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = {
    _id,
    name,
    email,
    designation,
    bio,
    domain,
    giveAdminRight,
    revokeAdminRight,
  };
  try {
    dispatch(setLoader(true));
    const res = await axios.post(`${host}api/employees/update`, body);
    dispatch({
      type: SET_UPDATE_EMP_DATA,
      payload: res.data,
    });
    dispatch(setRedirect("/dashboard"));
    dispatch(setAlert("Employee data updated", "success"));
    dispatch(setLoader(false));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(setLoader(false));
  }
};

// delete Employee
export const removeEmployee = (employeeId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    employeeId,
  });
  try {
    dispatch(setLoader(true));
    const res = await axios({
      method: "DELETE",
      url: `${host}api/employees`,
      data: body,
      headers: { "Content-Type": "application/json" },
    });
    dispatch({
      type: SAVE_EMP_LIST,
      payload: res.data.employees,
    });
    dispatch(setAlert(`Employee remover with id ${employeeId}`, "success"));
    dispatch(setLoader(false));
  } catch (err) {
    const {
      data: { errors },
    } = err.response;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch(setLoader(false));
  }
};
