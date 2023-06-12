import React, { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";


const Loading = (props) => {
  const check = props.loading == null ? false : props.loading;

  return (
    check && (
      <div
        className="axios-loading"
        style={{ display: props.loading === true ? "block" : "none" }}
      >
        <div className="axios-loading-indicator">
          <BeatLoader
            color={"white"}
            loading={props.loading}
            // css={override}
            size={40}
          />
        </div>
      </div>
    )
  );
};

export default Loading;
