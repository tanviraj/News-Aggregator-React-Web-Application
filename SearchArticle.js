import React from "react";
import Card from "react-bootstrap/Card";
import ShareModal from "./ShareModal";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

class SearchArticle extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  formatDate(Dates) {
    var datelist = Dates.split("T")[0].split("-");
    return datelist[0] + "-" + datelist[1] + "-" + datelist[2];
  }

  render() {
    const sectionstyles = {
      fontSize: "10px",
      display: "inline-block",
      borderRadius: "2px",
      color: "white",
      fontWeight: "bold",
      padding: "2px",
      float: "right",
      marginRight: "15px"
    };
    if (this.props.section === "sport") {
      sectionstyles.backgroundColor = "#fec106";
    } else if (this.props.section === "world") {
      sectionstyles.backgroundColor = "#863fff";
    } else if (this.props.section === "politics") {
      sectionstyles.backgroundColor = "#009687";
    } else if (this.props.section === "business") {
      sectionstyles.backgroundColor = "#2395f3";
    } else if (this.props.section === "technology") {
      sectionstyles.backgroundColor = "#c9df00";
    } else if (this.props.section === "Guardian Favorite") {
      sectionstyles.backgroundColor = "#c9df00";
    } else if (this.props.section === "NY Times Favorite") {
      sectionstyles.backgroundColor = "#c2c2c2";
    } else {
      sectionstyles.backgroundColor = "#6c757c";
    }
    return (
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
          style={{ color: 'inherit', textDecoration: 'inherit'}}
        >
      <Card className="Card">
          <Card.Body>
            <div>
          <Card.Title><i><div className="searchTitle">{this.props.title}<ShareModal
              title={this.props.title}
              url={this.props.url}
              source={null}
            /></div></i></Card.Title>
          {/* <div className="card-title"><i>{this.props.title}</i> */}
            </div>
            {/* <Card.Img variant="bottom" src={this.props.img} /> */}
            <div className="img-holder-search">
                <ResponsiveEmbed aspectRatio="16by9">
                  <img
                    class="article-imgs"
                    variant="top"
                    src={this.props.img}
                  />
                </ResponsiveEmbed>
              </div>
          <i>{this.props.date ? this.formatDate(this.props.date) : null}</i>
          <div style={sectionstyles}>
            {this.props.section ? this.props.section.toUpperCase() : null}
          </div>
        </Card.Body>
      </Card>
      </Link>
    );
  }
}

export default withRouter(SearchArticle);
