import React from "react";

function Desc(props) {
  console.log("Inside normal desc");
  return <div className="darticle-body">{props.ddesc}</div>;
}
export default Desc;
