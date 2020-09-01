import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/common";
import { register } from "../../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, redirectTo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    bio: "",
    domain: "",
    password: "",
    password2: "",
  });

  const {
    name,
    password,
    email,
    designation,
    bio,
    domain,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password not matched", "danger", 3000);
    } else {
      register({ name, password, email, designation, bio, domain });
    }
  };
  return (
    <Fragment>
      {redirectTo && <Redirect to={redirectTo} />}
      <p className="lead">
        <i className="fas fa-user"></i> Register New Employee
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
          <input
            type="password"
            placeholder="Enter New Password"
            name="password"
            onChange={onChange}
            title="Please enter a password with minimum of 8 character with at least one upper, lower case and special character"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            title="Please enter a password with minimum of 8 character with at least one upper, lower case and special character"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
            onChange={onChange}
            value={password2}
          />
        </div>
        <input type="submit" className="btn form-group" value="Add Employee" />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
};
const mapStateToProps = (state) => ({
  redirectTo: state.common.redirectTo,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
