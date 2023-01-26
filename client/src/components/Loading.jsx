import React from "react";
import "../styles/loading.css";

function Loading() {
  return (
    <div className="loading flex-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
