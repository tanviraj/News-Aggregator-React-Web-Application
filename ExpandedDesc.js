import React from "react";
import Truncate from "react-truncate";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Row, Col } from "react-bootstrap";

class ExpandedDesc extends React.Component {
  constructor(props) {
    super(props);
    console.log("Inside Expanded Desc");
    this.handleDownclick = this.handleDownClick.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.state = {
      isExpand: true
    };
  }
  handleDownClick() {
    this.setState({ isExpand: false });
  }
  handleUpClick() {
    this.setState({ isExpand: true });
  }
  render() {
    const isExpand = this.state.isExpand;
    console.log("Is expand is", isExpand);
    if (isExpand) {
      return (
        <>
        <div className="desc-truncated">
          <Truncate lines={4} ellipsis="">
            {this.props.edesc}
          </Truncate>
          </div>
          <div className="GoButtons">
            <GoChevronDown onClick={() => this.handleDownClick()} />
          </div>
          </>
      );
    } else {
      return (
        <>
        <div className="desc-expanded">
          {this.props.edesc}
          
          </div>
          <div className="GoButtons">
            <GoChevronUp onClick={() => this.handleUpClick()} />
          </div>
          </>
      );
    }
  }
}
export default ExpandedDesc;
