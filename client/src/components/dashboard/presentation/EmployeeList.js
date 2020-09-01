import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "../../../lib/withStyles";
import styles from "./EmployeeList.style";
import {
  removeEmployee,
  setUserForUpdate,
  setEmpForFeedback,
} from "../../../actions/employees";
import EmployeeCard from "../../common/EmployeeCard";

function EmployeeList({
  employees,
  className,
  removeEmployee,
  setUserForUpdate,
  setEmpForFeedback,
  activeEmployeeId,
}) {
  return (
    <div className={`container ${className}`}>
      {employees.map(
        (employee) =>
          employee._id !== activeEmployeeId && (
            <EmployeeCard
              key={employee._id}
              employeeData={employee}
              isStaticMode={false}
              setEmpForFeedback={setEmpForFeedback}
              setUserForUpdate={setUserForUpdate}
              removeEmployee={removeEmployee}
            />
          )
      )}
    </div>
  );
}

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  className: PropTypes.string,
  removeEmployee: PropTypes.func.isRequired,
  setUserForUpdate: PropTypes.func.isRequired,
  setEmpForFeedback: PropTypes.func.isRequired,
  activeEmployeeId: PropTypes.string.isRequired,
};

const mapStateToprops = (state) => ({
  updateEmpId: state.employees.updateEmpId,
  feedbackForEmp: state.employees.feedbackForEmp,
  activeEmployeeId: state.auth.employee._id,
});
export default connect(mapStateToprops, {
  removeEmployee,
  setUserForUpdate,
  setEmpForFeedback,
})(withStyles(EmployeeList, styles));
