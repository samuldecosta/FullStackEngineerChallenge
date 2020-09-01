import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestFeedBack } from "../../../actions/feedbacks";

function EmployeeCard({
  employeeData,
  className,
  removeEmployee,
  isStaticMode,
  employees,
  loggedInEmployee,
  requestFeedBack,
  isAdmin,
}) {
  const { _id, name, email, bio, designation, domain, avatar } = employeeData;
  return (
    <div
      className={`card promoting-card employee-card ${
        className || "col-lg-3"
      } col-sm`}
      to={`/feedback/${_id}`}
      key={`emp-${_id}`}
    >
      <div className="card-body d-flex flex-row">
        <img
          src={avatar}
          className="rounded-circle mr-3"
          height="50px"
          width="50px"
          alt="avatar"
        />
        <div className="emp-details">
          <Link
            to={`/feedback/${_id}`}
            className="card-title font-weight-bold mb-2"
          >
            {name}
          </Link>
          <p className="card-text">
            <i className="fa fa-podcast"></i>
            {` ${designation}`}
          </p>
          <p className="card-text">
            <i className="fa  fa-envelope pr-2"></i>
            {email}
          </p>
          <p className="card-text">
            <i className="far   fa-address-card"></i>
            {` ${domain}`}
          </p>
        </div>
        {isStaticMode && isAdmin && (
          <div className="request-review dropdown">
            <p className="blockquote">
              Please select employee to raise Feedback request for{" "}
              <span className="font-weight-bold">{name}</span>
            </p>
            <button
              className="btn dropdown-toggle"
              type="button"
              onClick={(e) => e.stopPropagation()}
              data-toggle="dropdown"
            >
              Select Employee
            </button>
            <ul className="dropdown-menu">
              {employees.map((emp) => (
                <li
                  key={emp._id}
                  className={
                    emp._id === loggedInEmployee || emp._id === _id
                      ? "disabled"
                      : ""
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    requestFeedBack({
                      reqby: loggedInEmployee,
                      reqfrom: emp._id,
                      reqfor: _id,
                    });
                  }}
                >
                  <a href="#!">
                    {emp.name}({emp.domain})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="collapse-content">
          {isStaticMode && (
            <Fragment>
              <span>Bio:</span>
              <p id="collapseContent">{bio}</p>
            </Fragment>
          )}
          <i
            className="fas fa-share-alt text-muted float-right p-1 my-1"
            data-toggle="tooltip"
            data-placement="top"
            title="Share this post"
          ></i>
          {!isStaticMode && (
            <div className="action-buttons">
              <Link className="btn" to={`/update/${_id}`}>
                Edit
              </Link>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmployee(_id);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EmployeeCard.propTypes = {
  employeeData: PropTypes.object.isRequired,
  removeEmployee: PropTypes.func,
  isStaticMode: PropTypes.bool,
  requestFeedBack: PropTypes.func.isRequired,
  employees: PropTypes.array,
  loggedInEmployee: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};

EmployeeCard.defaultProps = {
  removeEmployee: () => {},
  isStaticMode: true,
  isAdmin: false,
};
const mapStateToProps = (state) => ({
  employees: state.employees.employeesList,
  loggedInEmployee: state.auth.employee._id,
});

export default connect(mapStateToProps, { requestFeedBack })(EmployeeCard);
