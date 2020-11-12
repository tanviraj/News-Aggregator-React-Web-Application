  import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Truncate from "react-truncate";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
// import { MdShare } from "react-icons/md";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import ShareModal from "./ShareModal";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Article extends React.Component {
  constructor(props) {
    super(props);
    console.log("Inside article props");
    console.log("Id", this.props.id);
    console.log("Title", this.props.title);
    console.log("Images", this.props.img);
    console.log("Section", this.props.section);
    console.log("Date", this.props.date);
    console.log("Description", this.props.desc);
  }

  formatDate(Dates) {
    var datelist = Dates.split("T")[0].split("-");
    return datelist[0] + "-" + datelist[1] + "-" + datelist[2];
  }

  // handleexpansion() {
  //   console.log("Inside handle expansion");
  //   this.props.history.push(`/expandedcard`);
  // }

  handleLink() {
    
  }
  render() {
    const sectionstyles = {
      fontSize: "14px",
      display: "inline-block",
      borderRadius: "2px",
      color: "white",
      fontWeight: "bold",
      padding: "5px",
      float: "right"
    };
    if (this.props.section === "sport" || this.props.section === "sports") {
      sectionstyles.color = "black";
      sectionstyles.backgroundColor = "#fec106";
    } else if (this.props.section === "world") {
      sectionstyles.backgroundColor = "#863fff";
    } else if (this.props.section === "politics") {
      sectionstyles.backgroundColor = "#009687";
    } else if (this.props.section === "business") {
      sectionstyles.backgroundColor = "#2395f3";
    } else if (this.props.section === "technology") {
      sectionstyles.color = "black";
      sectionstyles.backgroundColor = "#c9df00";
    } else if (this.props.section === "Guardian Favorite") {
      sectionstyles.backgroundColor = "#c9df00";
    } else if (this.props.section === "NY Times Favorite") {
      sectionstyles.backgroundColor = "#c2c2c2";
    } else {
      sectionstyles.backgroundColor = "#6c757c";
    }

    if (this.props.title != null && this.props.date != null && this.props.img != null && this.props.desc != '') {
    console.log('Tired:',this.props.desc)
    return (
      <div className="cards-container">
        <Link
          to={{
            pathname: `/expandedcard/` + encodeURIComponent(this.props.id),
            articletitle: this.props.title,
            articledate: this.props.date,
            articleimg: this.props.img,
            articledesc: this.props.desc,
            articleurl: this.props.url,
            articlesource: this.props.source,
            articlesection: this.props.section
          }}
          onClick={(e) => { e.stopPropagation(); }}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Row>
            <Col xs={12} md={3}>
              {/*  /> */}
              <div className="img-holder">
                <ResponsiveEmbed aspectRatio="16by9">
                  <img
                    class="article-imgs"
                    variant="top"
                    src={this.props.img}
                  />
                </ResponsiveEmbed>
              </div>
            </Col>
            <Col xs={12} md={9}>
              <div className="content-holder">
                {/* <body> */}
                <div className="article-title">
                  <b>
                    <i className="article-title">
                      {this.props.title}
                      {/* <MdShare onclick={handleShow} /> */}
                      <ShareModal
                        title={this.props.title}
                        url={this.props.url}
                        source={null}
                      />
                    </i>
                  </b>
                </div>
                <div className="article-body">
                  <Truncate lines={3}>{this.props.desc}</Truncate>
                  <br />
                  <br />
                  <i>
                    {this.props.date ? this.formatDate(this.props.date) : null}
                  </i>
                  <div style={sectionstyles}>
                    {this.props.date ? this.props.section.toUpperCase() : null}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Link>
      </div>
    );
    }
    else {
      return(<div></div>)
    }
  }
}

export default withRouter(Article);
