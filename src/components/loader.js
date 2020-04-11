import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = props => {
  return (
    <div style={{ marginTop: props.marginTop }}>
      <ScaleLoader
        height={props.height}
        width={props.width}
        color={"#4EDAFF"}
        loading={true}
      />
      <div style={{ fontSize: "25px", marginTop: "30px" }}>
        Loading, Please Wait...
      </div>
    </div>
  );
};

export default Loader;
