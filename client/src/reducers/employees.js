import {
  SAVE_EMP_LIST,
  SET_UPDATE_EMP_DATA,
  SET_UPDATE_EMP_ID,
  SET_FEEDBACK_EMP_ID,
} from "../actions/types";

const initialState = {
  employeesList: [],
  updateEmpId: "",
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_EMP_LIST:
      return { ...state, employeesList: payload };
    case SET_UPDATE_EMP_DATA:
      return {
        ...state,
        employeesList: state.employeesList.map((employee) =>
          employee.email === payload.email ? payload : employee
        ),
        updateEmpId: "",
      };
    case SET_UPDATE_EMP_ID:
      return {
        ...state,
        updateEmpId: payload,
      };
    case SET_FEEDBACK_EMP_ID:
      return {
        ...state,
        feedbackForEmp: state.employeesList.find(
          (employee) => employee._id === payload
        ),
      };
    default:
      return state;
  }
}
