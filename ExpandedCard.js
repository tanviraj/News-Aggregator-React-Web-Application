import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import { Row, Col } from "react-bootstrap";
import { MdBookmarkBorder } from "react-icons/md";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Truncate from "react-truncate";
import Summary from "./Summary";
import commentBox from "commentbox.io";
import qs from "qs";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import { FaRegBookmark } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa";


class ExpandedCard extends React.Component {
  constructor(props) {
    super(props);
    console.log("ExpandedCard props:", this.props);
    this.articletitle = this.props.location.articletitle;
    this.articledate = this.props.location.articledate;
    this.articleimg = this.props.location.articleimg;
    this.articledesc = this.props.location.articledesc;
    this.articleurl = this.props.location.articleurl;
    this.articlesource = this.props.location.articlesource;
    this.articlesection = this.props.location.articlesection;
    this.articleid = decodeURIComponent(this.props.match.params.articleid);
    this.idlist = [];
    console.log(this.articleid);
    this.state = {
      isBookMarkFill: this.getinititalstate(this.articleid)
    };
    console.log('isBookMark initial is',this.state.isBookMarkFill)
    this.setisBookMarkFillState = this.setisBookMarkFillState.bind(this);
    this.getisBookMarkFillState = this.getisBookMarkFillState.bind(this);
  }
  getinititalstate(articleid) {
    if (localStorage.getItem(articleid) == null) {
      console.log('Returning true')
      return false
    }
    else {
      console.log('Returning False')
      return true
    }
  }
  setisBookMarkFillState(isBookMarkFill) {
    this.setState({
      isBookMarkFill: isBookMarkFill
    });
  }

  getisBookMarkFillState() {
    return this.state.isBookMarkFill;
  }
  componentDidMount() {
    // ReactTooltip.rebuild();
    let articleId = this.articleid;
    this.removeCommentBox = commentBox("5653452885590016-proj", {
      className: "commentbox",
      defaultBoxId: "commentbox",
      tlcParam: "tlc",
      backgroundColor: null,
      textColor: null,
      subtextColor: null,
      singleSignOn: null,
      createBoxUrl(boxId, pageLocation) {
        let url =
          "http://localhost:3000/expandedcard/" + decodeURIComponent(articleId);
        pageLocation.search = "";
        pageLocation.hash = boxId;
        return url;
      }
    });

    var hideSwitch = this.props.getHideSwitchState();
    if (!hideSwitch) {
      this.props.setHideSwitchState(true);
    }
  }
  componentWillUnmount() {
    this.removeCommentBox();
  }
  notify = () => {
      var articleobj = {
      'id': this.articleid,
      'title': this.articletitle,
      'section': this.articlesection,
      'source': this.articlesource,
      'img': this.articleimg,
      'date': this.articledate,
      'url': this.articleurl,
      'desc':this.articledesc
    };
    var id_list;
    if (localStorage.getItem(this.articleid) == null) {
      toast(<div>Saving {this.articletitle}</div>, {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-title",
        autoClose: 4000,
        closeButton: true,
        draggable: false,
        hideProgressBar: true,
        transition:Zoom
      });
      console.log("Inside adding articleid");
      localStorage.setItem(this.articleid, JSON.stringify(articleobj));
        if (localStorage.getItem("idlist") === null || localStorage.getItem("idlist") === "") {
            id_list = [];
            id_list.push(this.articleid);
            console.log('id_list with first id',id_list)
            localStorage.setItem("idlist", id_list);
      } else {
          id_list = localStorage.getItem("idlist").split(",");
          id_list.push(this.articleid);
          console.log('Id list after adding',id_list)
        localStorage.setItem("idlist", id_list);
        }
         var bookMarkFill = this.getisBookMarkFillState();
        // if (!bookMarkFill) {
          this.setisBookMarkFillState(true);
        // }
    } else {
      toast(<div>Removing - {this.articletitle}</div>, {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-title",
        closeButton: true,
        draggable: false,
        hideProgressBar: true,
        transition:Zoom

      });
      console.log("Removing article id");
      localStorage.removeItem(this.articleid);
      id_list = localStorage.getItem("idlist").split(",");
      console.log("id list is", id_list);
      const index = id_list.indexOf(this.articleid);
      if (index > -1) {
        id_list.splice(index, 1);
      }
      console.log('New ID_list after deletion',id_list)
      localStorage.setItem("idlist", id_list);
      // this.setState({
      //   isBookMarkFill:false
      // });
      var bookMarkFill = this.getisBookMarkFillState();
        // if (bookMarkFill) {
          this.setisBookMarkFillState(false);
        // }
    }
  };

  formatDate(Dates) {
    var datelist = Dates.split("T")[0].split("-");
    return datelist[0] + "-" + datelist[1] + "-" + datelist[2];
  }

  render() {
    console.log("Inside EC");
    const hashtag = ["CSCI_571_NewsApp"];
    return (
      <div>
      <div className="expandedCard">
        <div className="earticle-title">
          <i>{this.articletitle}</i>
        </div>
        <Row>
          <Col md={6} xs={5}>
          <div className="earticle-date">
              <i>{this.articledate ? this.formatDate(this.articledate) : null}</i>
          </div>
          </Col>
          <Col md={5} xs={4}>
            <div class="shareicon">
            <FacebookShareButton
              url={this.articleurl}
              hashtag="#CSCI_571_NewsApp"
            >
              <FacebookIcon data-tip="Facebook" size={25} round={true} />
              {/* <ReactTooltip effect="solid" /> */}
            </FacebookShareButton>
            <TwitterShareButton url={this.articleurl} hashtags={hashtag}>
              <TwitterIcon data-tip="Twitter" size={25} round={true} />
              {/* <ReactTooltip effect="solid" /> */}
            </TwitterShareButton>
            <EmailShareButton
              url={this.articleurl}
              subject="#CSCI_571_NewsApp"
            >
              <EmailIcon data-tip="Email" size={25} round={true} />
              {/* <ReactTooltip effect="solid" /> */}
              </EmailShareButton>
              </div>
              </Col>
              <ReactTooltip effect="solid" place="top"/>
          <Col md={1} xs={3}>
          <label>
              <FaRegBookmark className={!this.state.isBookMarkFill ? null : 'hideElement'} data-for='c1' data-tip="Bookmark" onClick={this.notify} color="red"/>
              <FaBookmark className={'filledBookmark ' + (this.state.isBookMarkFill ? '' : 'hideElement')} data-for='c2' data-tip="Bookmark" onClick={this.notify} color="red"/>
            </label>
            <ReactTooltip id='c1' effect="solid" place="top" />
              <ReactTooltip id='c2' effect="solid" place="top" />
          </Col>
        </Row>
        <div className="eimgholder">
          <ResponsiveEmbed aspectRatio="16by9">
            <img class="article-imgs" variant="top" src={this.articleimg} />
          </ResponsiveEmbed>
        </div>
        <div className="darticle-body">
          <Summary desc={this.articledesc} />
        </div>
        </div>
      <div className="commentbox" />
      </div>
        
   
    );
  }
}

export default ExpandedCard;
