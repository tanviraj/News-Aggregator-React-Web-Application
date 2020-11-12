import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchArticle from "./SearchArticle";

class SearchArticleList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      checked: this.props.isGuardian,
      keyword: ""
    };
    this.allArticles = [];
  }

  pickImg(imgarray) {
    console.log(imgarray);
    if (imgarray.length == 0) {
      return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    } else {
      var i;
      for (i = 0; i < imgarray.length; i++) {
        if (imgarray[i].width >= 1300) {
          return imgarray[i].url;
        }
        return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
    }
  }

  componentDidMount() {
    console.log(this.props);
    const { keyword } = this.props.match.params;
    console.log("inside compdidmount", keyword);
    console.log(this.state.checked);
    let api = this.state.checked
      ? `https://tanvi1.azurewebsites.net/isGuardianSearch/${keyword.substring(1)}`
      : `https://tanvi1.azurewebsites.net/isNySearch/${keyword.substring(1)}`;
    console.log(api);
    fetch(api)
      .then(response => response.json())
      .then(response => {
        this.allArticles =
          //   typeof response.data.results !== "undefined"
          typeof response.data.results !== "undefined"
            ? response.data.results
            : response.data.docs;
        console.log(response.data.results);
        console.log(this.allArticles);
        // this.setState({ checked: this.props.isGuardian });
        this.setState({ keyword: this.props.match.params });
      });
    var hideSwitch = this.props.getHideSwitchState();
    if (!hideSwitch) {
      this.props.setHideSwitchState(true);
    }
  }

  componentDidUpdate() {
    if (this.props.match.params !== this.state.keyword) {
      //   this.setState({ checked: this.props.isGuardian });
      console.log(
        "componentDidUpdate prop variables checked:",
        this.props.match.params
      );
      console.log(
        "componentDidUpdate State variables checked:",
        this.state.keyword
      );
      const { keyword } = this.props.match.params;
      let api = this.props.isGuardian
        ? `https://tanvi1.azurewebsites.net/isGuardianSearch/${keyword.substring(1)}`
        : `https://tanvi1.azurewebsites.net/isNySearch/${keyword.substring(1)}`;
      fetch(api)
        .then(response => response.json())
        .then(response => {
          this.allArticles =
            //   typeof response.data.results !== "undefined"
            typeof response.data.results !== "undefined"
              ? response.data.results
              : response.data.docs;
          console.log(response.data.results);
          console.log(this.allArticles);
          // this.setState({ checked: this.props.isGuardian });
          this.setState({ keyword: this.props.match.params });
          console.log("State variables checked:", this.props.isGuardian);
          console.log(this.allArticles);
        });
    }
  }

  render() {
    var prop = "assets";
    console.log("Inside SearchArticle");
    console.log("Inside render");
    if (this.state.checked) {
      console.log("Hello Guardian");
      console.log(this.allArticles);
      const SearchArticles = this.allArticles.map((article, index) => (
        <Col xs={12} md={3}>
          <SearchArticle
            source="GA"
            key={index}
            title={
              typeof article.webTitle != undefined ? article.webTitle : null
            }
            img={
              article.blocks.hasOwnProperty("main")
                ? // typeof article.blocks.main != undefined
                  article.blocks.main.elements[0].assets.length === 0
                  ? "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                  : article.blocks.main.elements[0].assets[
                      article.blocks.main.elements[0].assets.length - 1
                    ].file
                : "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
            }
            section={
              typeof article.sectionId != undefined ? article.sectionId : null
            }
            date={
              typeof article.webPublicationDate != undefined
                ? article.webPublicationDate
                : null
            }
            desc={
              typeof article.blocks != undefined
                ? article.blocks.body[0].bodyTextSummary
                : null
            }
            url={typeof article.webUrl != undefined ? article.webUrl : null}
          />
        </Col>
      ));
      return (
        <div className="SearchArticle">
          <div className="Fav">Results</div>
          <Row>{SearchArticles}</Row>
        </div>
      );
    } else {
      console.log("Hello NY");
      console.log(this.allArticles);
      const SearchArticles = this.allArticles.map((article, index) => (
        <Col xs={12} md={3}>
          <SearchArticle
            source="NY"
            key={index}
            title={
              typeof article.headline.main != undefined
                ? article.headline.main
                : null
            }
            img={
              typeof article.multimedia != undefined
                ? this.pickImg(article.multimedia)
                : null
            }
            section={
              typeof article.news_desk != undefined ? article.news_desk : null
            }
            date={
              typeof article.pub_date != undefined ? article.pub_date : null
            }
            desc={typeof article.abstract != undefined ? article.abstract : null}
            url={typeof article.web_url != undefined ? article.web_url : null}
          />
        </Col>
      ));
      return (
        <div className="SearchArticle">
          <div className="Fav">Results</div>
          <Row>{SearchArticles}</Row>
        </div>
      );
    }
  }
}

export default SearchArticleList;
