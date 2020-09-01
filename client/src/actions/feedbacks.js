import axios from "axios";
import { setAlert, setLoader, setRedirect } from "./common";
import {
  SAVE_FEEDBACK_REQUESTS,
  SAVE_FEEDBACK_LIST,
  REMOVE_FEEDBACK,
  REMOVE_FEEDBACK_REQUEST,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { host } from "../config";

// fetch all feedback request List
export const getFeedbackRequests = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch(setLoader(true));
    const res = await axios.get(`${host}api/feedbackrequests`);
    dispatch({
      type: SAVE_FEEDBACK_REQUESTS,
      payload: res.data,
    });
    dispatch(setRedirect(""));
    dispatch(setLoader(false));
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setRedirect(""));
    dispatch(setLoader(false));
  }
};

// Request a feedbacck
export const requestFeedBack = ({ reqby, reqfrom, reqfor }) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({ reqby, reqfrom, reqfor });
  try {
    dispatch(setLoader(true));
    const res = await axios.post(`${host}api/feedbackrequests`, body);
    if (res.data.success) {
      dispatch(setAlert("Feedback request generated", "success"));
    }
    dispatch(setLoader(false));
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setLoader(false));
  }
};

// fetch all feedback List
export const getFeedbackList = (empId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch(setLoader(true));
    const res = await axios.get(`${host}api/feedback/${empId}`);
    dispatch({
      type: SAVE_FEEDBACK_LIST,
      payload: res.data,
    });
    dispatch(setLoader(false));
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setLoader(false));
  }
};

// Submit feedback
export const submitFeedback = (
  summary,
  employee,
  feedbackId = "",
  reqId = "",
  overAllPerformance = 0
) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    reqId,
    feedbackId,
    employee,
    summary,
    overAllPerformance,
  });
  try {
    dispatch(setLoader(true));
    const res = await axios.post(`${host}api/feedback`, body);
    if (res.data.success) {
      dispatch({
        type: SAVE_FEEDBACK_LIST,
        payload: res.data,
      });
      if (reqId) {
        dispatch(setRedirect("/dashboard"));
      }
      dispatch(setLoader(false));
      return dispatch(setAlert(`Feedback submited`, "success"));
    }
    dispatch(setLoader(false));
    if (reqId) {
      dispatch(setRedirect("/dashboard"));
    }
    return dispatch(
      setAlert(`Something went wrong!! please try later`, "danger")
    );
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setLoader(false));
  }
};
// remove  feedback
export const removeFeedback = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    id,
  });
  try {
    dispatch(setLoader(true));
    const res = await axios({
      method: "DELETE",
      url: `${host}api/feedback`,
      data: body,
      headers: { "Content-Type": "application/json" },
    });
    if (res.data.success) {
      dispatch({
        type: REMOVE_FEEDBACK,
        payload: id,
      });
      dispatch(setLoader(false));
      return dispatch(setAlert(`Feedback removed`, "success"));
    } else {
      dispatch(setLoader(false));
      return dispatch(setAlert(`Feedback Not removed`, "danger"));
    }
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setLoader(false));
  }
};

//reject a feedback

export const rejectReview = (rejectionReason, reqId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const body = JSON.stringify({
    reqId,
    rejectionReason,
  });
  try {
    dispatch(setLoader(true));
    const res = await axios.post(`${host}api/feedbackrequests/reject`, body);
    if (res.data.success) {
      dispatch({
        type: REMOVE_FEEDBACK_REQUEST,
        payload: reqId,
      });
      dispatch(setLoader(false));
      return dispatch(setAlert(`Feedback request rejected`, "success"));
    }
    dispatch(setLoader(false));
    return dispatch(
      setAlert(`Something went wrong!! please try later`, "danger")
    );
  } catch (err) {
    const response = err.response;
    if (response && response.errors) {
      const { errors = [] } = response;
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.message, "danger"));
    }
    dispatch(setLoader(false));
  }
};
