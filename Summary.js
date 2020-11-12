import React from "react";
import ExpandedDesc from "./ExpandedDesc";
import Desc from "./Desc.js";

function Summary(props) {
  console.log(props.desc);
  const desc = props.desc;
  console.log("desc is", desc);
  if (desc.split(".").length > 4) {
    return <ExpandedDesc edesc={props.desc} />;
  }
  return <Desc ddesc={props.desc} />;
}
export default Summary;
