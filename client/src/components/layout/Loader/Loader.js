import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Loader({ isLoading }) {
  return (
    <div className={isLoading ? "active-loader" : ""} aria-hidden="true">
      <span className="loading-icon" />
    </div>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.common.loader,
});
export default connect(mapStateToProps)(Loader);
