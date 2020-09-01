import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { getEmployeesList } from "../../../actions/employees";
import { getFeedbackRequests } from "../../../actions/feedbacks";
import EmployeeList from "../presentation/EmployeeList";
import withStyles from "../../../lib/withStyles";
import styles from "./Dashboard.style";
import FeedbackRequests from "../presentation/FeedbackRequests";

const Dashboard = ({
  getEmployeesList,
  getFeedbackRequests,
  employeesList,
  auth: { employee },
  className,
  feedbackRequests,
}) => {
  useEffect(() => {
    if (employee) {
      getEmployeesList();
    }
    getFeedbackRequests();
  }, [employee, getFeedbackRequests, getEmployeesList]);
  return (
    <div className={`dashboard-wrapper ${className}`}>
      <div className={`header-sticky ${isMobile ? "mobile-header" : ""}`}>
        {employee && !isMobile && <h1>Hello {employee.name} !!</h1>}
        {employee && employee.isAdmin ? (
          <p className="sub-heading">
            You can select any employee to view feedback history
          </p>
        ) : (
          <Fragment>
            <p className="sub-heading">Pending feedbacks requests</p>
          </Fragment>
        )}
      </div>
      {employee && !employee.isAdmin && (
        <FeedbackRequests feedbackRequests={feedbackRequests} />
      )}
      {employee &&
        employee.isAdmin &&
        employeesList &&
        employeesList.length > 0 && <EmployeeList employees={employeesList} />}
    </div>
  );
};

Dashboard.propTypes = {
  getEmployeesList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  employeesList: PropTypes.array.isRequired,
  getFeedbackRequests: PropTypes.func.isRequired,
  feedbackRequests: PropTypes.array,
};

Dashboard.defaultProps = {
  feedbackRequests: [],
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  employeesList: state.employees.employeesList,
  feedbackRequests: state.feedbacks.feedbackRequests,
});

export default connect(mapStateToProps, {
  getEmployeesList,
  getFeedbackRequests,
})(withStyles(Dashboard, styles));
