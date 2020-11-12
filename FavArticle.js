import React from "react";
import Card from "react-bootstrap/Card";
import { MdDelete } from "react-icons/md";
import ShareModal from "./ShareModal";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import { Row, Col } from "react-bootstrap";




class FavArticle extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }
    formatDate(Dates) {
      var datelist = Dates.split("T")[0].split("-");
      return datelist[0] + "-" + datelist[1] + "-" + datelist[2];
    }
  
    handleDelete = (articleid,title) => {
      console.log('Inside handle delete');
      console.log('Title',title)
      toast(<div>Removing - {title}</div>, {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-title",
        closeButton: true,
        draggable: false,
        hideProgressBar: true,
        transition:Zoom
      });
        var id_list=[]
        localStorage.removeItem(articleid);
        id_list = localStorage.getItem("idlist").split(",");
        console.log("id list is", id_list);
        const index = id_list.indexOf(articleid);
        if (index > -1) {
            id_list.splice(index, 1);
        }
        console.log('New ID_list after deletion',id_list)
        localStorage.setItem("idlist", id_list);
        var isDelete = this.props.getisDeleteState();
        if (!isDelete) {
            this.props.setisDeleteState(true);
        }
        else {
          this.props.setisDeleteState(false);
        }
  }
  render() {
    const sectionstyles = {
      fontSize: "12px",
      display: "inline-block",
      borderRadius: "2px",
      color: "white",
      fontWeight: "bold",
      padding: "2px",
      float: "right",
      marginRight: "15px"
    };
    const sourcestyles = {
      fontSize: "12px",
      display: "inline-block",
      borderRadius: "2px",
      color: "white",
      fontWeight: "bold",
      padding: "2px",
      float: "right",
      marginRight: "15px"
    };
    if (this.props.source == "GA") {
        sourcestyles.backgroundColor = "#102344";
        this.source='GUARDIAN' 
    }
      if (this.props.source == "NY") {
        sourcestyles.backgroundColor = "#c2c2c2";
        this.source='NYTIMES'
    }
    if (this.props.section === "sport" || this.props.section === "sports") {
      sectionstyles.backgroundColor = "#fec106";
      sectionstyles.color = "black";
    } else if (this.props.section === "world") {
      sectionstyles.backgroundColor = "#863fff";
    } else if (this.props.section === "politics") {
      sectionstyles.backgroundColor = "#009687";
    } else if (this.props.section === "business") {
      sectionstyles.backgroundColor = "#2395f3";
    } else if (this.props.section === "technology") {
      sectionstyles.backgroundColor = "#c9df00";
      sectionstyles.color = "black";
    } else if (this.props.section === "Guardian Favorite") {
      sectionstyles.backgroundColor = "#102344";
    } else if (this.props.section === "NY Times Favorite") {
      sectionstyles.backgroundColor = "#c2c2c2";
    } else {
      sectionstyles.backgroundColor = "#6c757c";
    }   
    console.log('Source is',this.source)
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
            articlesection: this.props.section,
        }}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
        onClick={(e) => {e.preventDefault(); e.stopPropagation();}}
        >
      <Card className="Card" >
          <Card.Body>
            <Card.Title><div className="searchTitle"><i>{this.props.title}<ShareModal
              title={this.props.title}
              url={this.props.url}
              source={this.props.source}
            /></i>
              <div className="article-delete" style={{ display: 'inline' }}>
              {/* e.stopPropagation(); */}
            {/* <MdDelete onClick={(e) => { e.stopPropagation(); this.handleDelete(this.props.id) }} /> */}
                <MdDelete onClick={(e) => { e.preventDefault(); e.persist(); this.handleDelete(this.props.id,this.props.title) }} />
            <ToastContainer autoClose={2000}/>
              </div>
              </div>
              </Card.Title>
            {/* <Card.Title>{this.props.title}</Card.Title>
            <ShareModal
              title={this.props.title}
              url={this.props.url}
              source={this.props.source}
            /> */}
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
            <Row>
            <Col md={5} xs={5}>
            <div style={{display:'inline-block'}}>
              <i>{this.props.date ? this.formatDate(this.props.date) : null}</i>
                </div>
              </Col>
          <Col md={4} xs={4}>
          <div style={sectionstyles} >
            {this.props.section ? this.props.section.toUpperCase() : null}
                </div>
              </Col>
              <Col md={3} xs={3}>
          <div style={sourcestyles} >
            {this.props.source ? this.source : null}
                </div>
                </Col>
           </Row>
        </Card.Body>
      </Card>
      </Link>
    );
  }
}

export default FavArticle;
