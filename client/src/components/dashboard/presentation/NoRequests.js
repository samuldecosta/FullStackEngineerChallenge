import React from "react";
import image from "../../../img/nodata.png";

export default function NoRequests() {
  return (
    <div className="no-records">
      <img src={image} alt="no-data-found"></img>
      <span className="no-record-msg">
        You are upto date. No pending Feedback requests Found
      </span>
    </div>
  );
}
