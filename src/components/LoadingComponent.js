import React from "react";

export const Loading = () => {
    return (
      <div className="container">
          <div className="row align-content-center">
              <span className="fa fa-spinner fa-pulse fa-fw fa-lg col-12"></span>
              <p>Loading...</p>
          </div>
      </div>
    );
}