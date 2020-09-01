import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmployeeCard from "../../common/EmployeeCard";
import styles from "./FeedbackPage.style";
import withStyles from "../../../lib/withStyles";
import {
  getFeedbackList,
  submitFeedback,
  removeFeedback,
} from "../../../actions/feedbacks";
import FeedbackForm from "../../common/FeedbackForm";

function FeedbackPage({
  employees,
  className,
  feedbackList,
  getFeedbackList,
  submitFeedback,
  removeFeedback,
  isAdmin,
  match: {
    params: { empId, reqId = "" },
  },
}) {
  useEffect(() => {
    getFeedbackList(empId);
  }, [getFeedbackList, empId]);
  const employee = employees.find((emp) => emp._id === empId);
  return (
    <div className={`feedback-wrapper ${className}`}>
      {employee && (
        <EmployeeCard
          employeeData={employee}
          className="static-card"
          isAdmin={isAdmin}
        />
      )}
      {employee && (
        <FeedbackForm
          submitFeedback={submitFeedback}
          employeeId={empId}
          feedbackRequestId={reqId}
        />
      )}
      {feedbackList.map((feedback) => (
        <FeedbackForm
          key={feedback._id}
          storedFeedback={feedback}
          submitFeedback={submitFeedback}
          employeeId={empId}
          removeFeedback={removeFeedback}
        />
      ))}
    </div>
  );
}
FeedbackPage.propTypes = {
  className: PropTypes.string.isRequired,
  getFeedbackList: PropTypes.func.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  removeFeedback: PropTypes.func.isRequired,
  employees: PropTypes.array,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.employee.isAdmin,
  employees: state.employees.employeesList,
  feedbackList: state.feedbacks.feedbackList,
});

export default connect(mapStateToProps, {
  getFeedbackList,
  submitFeedback,
  removeFeedback,
})(withStyles(FeedbackPage, styles));
