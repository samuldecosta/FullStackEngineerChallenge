import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/common";
import PropTypes from "prop-types";
import { updateEmployee } from "../../../actions/employees";
import { Redirect } from "react-router-dom";

const UpdateEmployee = ({
  employeesList,
  updateEmployee,
  redirectTo,
  match: {
    params: { empId: updateEmpId },
  },
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    designation: "",
    bio: "",
    domain: "",
    changeAdminRights: false,
  });

  const { _id, name, email, designation, bio, domain } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateEmployee({
      name,
      email,
      designation,
      bio,
      domain,
      _id,
      giveAdminRight: false,
      revokeAdminRight: false,
    });
  };
  useEffect(() => {
    if (updateEmpId) {
      const selectedEmployee = employeesList.find(
        (employee) => employee._id === updateEmpId
      );
      return setFormData({ ...selectedEmployee });
    } else {
      return <Redirect to="/dashboard" />;
    }
  }, [employeesList, updateEmpId]);
  return (
    <Fragment>
      {redirectTo && <Redirect to={redirectTo} />}
      <h1 className="large">Update Employee</h1>
      <p className="lead">
        All the below mentioned fields are required and can't be empty.
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={onChange}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Designation"
            name="designation"
            onChange={onChange}
            value={designation}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Please Fill Bio"
            name="bio"
            onChange={onChange}
            value={bio}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Please Enter Employee Domain"
            name="domain"
            onChange={onChange}
            value={domain}
            required
          />
        </div>
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input type="checkbox" value="" />
              Change Admin Permissions
            </label>
          </div>
          <label htmlFor="revokeAdminRight">Remove Admin Rights</label>
        </div>
        <input
          type="submit"
          className="btn form-group"
          value="Update Information"
        />
      </form>
    </Fragment>
  );
};

UpdateEmployee.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  employeesList: state.employees.employeesList,
  redirectTo: state.common.redirectTo,
});

export default connect(mapStateToProps, { setAlert, updateEmployee })(
  UpdateEmployee
);
