import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { rejectReview } from "../../../actions/feedbacks";
import FeedbackForm from "../../common/FeedbackForm";
import NoRequests from "./NoRequests";

function FeedbackRequests({ feedbackRequests, rejectReview, maxLength }) {
  return feedbackRequests && feedbackRequests.length > 0 ? (
    <div className="feed-req-wrapper container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Requested By</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Review Employee</th>
            <th scope="col">Reject Review</th>
          </tr>
        </thead>
        <tbody>
          {feedbackRequests.map((req) => (
            <tr key={req._id}>
              <th scope="row">{req.requester}</th>
              <td>{req.candidate}</td>
              <td className="review-link">
                <Link to={`/feedback/${req.reqfor}/${req._id}`}>
                  <i className="far fa-hand-point-right"></i>
                  <span className="hide-sm">Go Review</span>
                </Link>
              </td>
              <td>
                <FeedbackForm
                  className="reject-feedback"
                  submitFeedback={rejectReview}
                  employeeId={req._id}
                  maxLength={maxLength}
                  placeholder="Please provide reason to reject"
                  submitButtonText="Reject Request"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <NoRequests />
  );
}

FeedbackRequests.propTypes = {
  feedbackRequests: PropTypes.array,
  rejectReview: PropTypes.func.isRequired,
  maxLength: PropTypes.string,
};

FeedbackRequests.defaultProps = {
  feedbackRequests: [],
  maxLength: "1000",
};

const mapStateToProps = (state) => ({
  feedbackRequests: state.feedbacks.feedbackRequests,
});

export default connect(mapStateToProps, { rejectReview })(FeedbackRequests);
