import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC<{ asOverlay: boolean }> = (props) => {
  return (
    <div
      className={`${props.asOverlay && classes["loading-spinner__overlay"]}`}
    >
      <div className={classes["center-spinner"]}>
        <div className={classes["loadingio-spinner-gear-3eru7zplu16"]}>
          <div className={classes["ldio-3vi3igwauhw"]}>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
