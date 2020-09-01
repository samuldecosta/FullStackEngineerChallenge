import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import logo from "../../../img/logo.png";

const Navbar = ({ auth: { isAuthenticated, loading, employee }, logout }) => {
  const [state, toggelNav] = useState({
    isExpandedMobileNav: false,
  });

  const { isExpandedMobileNav } = state;
  const onclick = () =>
    toggelNav({ isExpandedMobileNav: !isExpandedMobileNav });
  const authLink = (
    <Fragment>
      <li>
        <Link className="font-weight-bold" onClick={onclick} to="/dashboard">
          Dashboard
        </Link>
      </li>
      {employee && employee.isAdmin && (
        <Fragment>
          <li>
            <Link className="font-weight-bold" onClick={onclick} to="/register">
              Add Employee
            </Link>
          </li>
          <li>
            <Link
              className="font-weight-bold"
              onClick={onclick}
              to={`/update/${employee._id}`}
            >
              Update Profile
            </Link>
          </li>
        </Fragment>
      )}
      <li>
        <a
          href="#!"
          onClick={() => {
            onclick();
            logout();
          }}
        >
          <i className="fa fa-sign-out-alt"></i>
          <span className="font-weight-bold">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <li>
        <Link
          className="fa fa-sign-in font-weight-bold"
          onClick={onclick}
          to="/login"
        >
          {` Login`}
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav className={`navbar bg-dark ${isMobile ? "mobile-nav" : ""}`}>
      {isMobile && (
        <div className="mobile-nav-action-btn">
          <Link className="feedo-root" to="/">
            <img src={logo} alt="feedo-logo"></img>
          </Link>
          <button className="btn toggel-btn" onClick={onclick}>
            <i class="fa fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      )}
      <ul
        className={`${isMobile ? (isExpandedMobileNav ? "show" : "hide") : ""}`}
      >
        {!isMobile && (
          <li className="root">
            <Link to="/">
              <img src={logo} alt="feedo-logo"></img>
            </Link>
          </li>
        )}
        {!loading && (
          <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  isAuthenticated: false,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
