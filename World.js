import React from "react";
import Article from "./Article";
import Container from "react-bootstrap/Container";
import { BrowserRouter } from "react-router-dom";
import Loader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isGuardian
      //   allArticles:[]
    };
    this.allArticles = [];
  }
  componentDidMount() {
    this.setState(({loading: true}))
    let api = this.state.checked ? `https://tanvi1.azurewebsites.net/api/isGuardian/world` : `https://tanvi1.azurewebsites.net/api/isNy/world`;
    fetch(api)
      .then(response => response.json())
      .then(response => {
        const { results } = response.data;
        console.log("Client side data");
        console.log(results);
        this.allArticles = results;
        this.setState({ checked: this.props.isGuardian, loading:false });
        console.log("State variables checked:", this.props.isGuardian);
        console.log(this.allArticles);
      });
      var hideSwitch = this.props.getHideSwitchState();
      if (hideSwitch) {
        this.props.setHideSwitchState(false);
      }
      var fillNavBar = this.props.getisNavBookMarkFillState();
      if (fillNavBar) {
        this.props.setisNavBookMarkFillState(false);
      }
    
  }

  componentDidUpdate() {
    if (this.props.isGuardian !== this.state.checked) {
      //   this.setState({ checked: this.props.isGuardian });
      console.log(
        "componentDidUpdate prop variables checked:",
        this.props.isGuardian
      );
      console.log(
        "componentDidUpdate State variables checked:",
        this.state.checked
      );
      if (!this.state.loading) {
        this.setState(({loading: true}))
      }
      let api = this.props.isGuardian ? `https://tanvi1.azurewebsites.net/api/isGuardian/world` : `https://tanvi1.azurewebsites.net/api/isNy/world`;
      fetch(api)
        .then(response => response.json())
        .then(response => {
          const { results } = response.data;
          console.log("Client side data");
          console.log(results);
          this.allArticles = results;
          this.setState({ checked: this.props.isGuardian, loading:false });
          console.log("State variables checked:", this.props.isGuardian);
          console.log(this.allArticles);
        });
    }
    var hideSwitch = this.props.getHideSwitchState();
      if (hideSwitch) {
        this.props.setHideSwitchState(false);
      }
  }

  componentWillUnmount() {
    console.log("Inside Unmount");
  }

  pickImg(imgarray) {
    console.log(imgarray);
    if (imgarray == null) {
      console.log('Inside pickImg')
      return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }
    var i;
    for (i = 0; i < imgarray.length; i++) {
      if (imgarray[i].width >= 2000) {
        return imgarray[i].url;
      }
      return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }
  }
  render() {
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`; if (this.state.loading) {
      return (<div className="centered">
        <Loader
          css={override}
          size={40}
          color={"#123abc"}
          loading={this.state.loading}
        />
        <p>Loading</p>
      </div>)
    } else {
      console.log("Inside render");
      if (this.state.checked) {
        console.log("Hello Guardian");
        console.log(this.allArticles);
        const Articles = this.allArticles.map((article, index) => (
          <Article
            id={typeof article.id != undefined ? article.id : null}
            source="GA"
            key={index}
            title={typeof article.webTitle != undefined ? article.webTitle : null}
            img={
              article.hasOwnProperty('blocks') && article.blocks.hasOwnProperty('main') && article.blocks.main.hasOwnProperty('elements')
                ? article.blocks.main.elements[0].assets.length === 0
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
          //   expandCard={this.state.expandCard}
          />
        ));
        return <div className="article-list">{Articles}</div>;
      } else {
        console.log("Hello NY");
        console.log(this.allArticles);
        const Articles = this.allArticles.map((article, index) => (
          <Article
            id={typeof article.url != undefined ? article.url : null}
            source="NY"
            key={index}
            title={typeof article.title != undefined ? article.title : null}
            img={
              typeof article.multimedia != undefined
                ? this.pickImg(article.multimedia)
                : null
            }
            section={typeof article.section != undefined ? article.section : null}
            date={
              typeof article.published_date != undefined
                ? article.published_date
                : null
            }
            desc={typeof article.abstract != undefined ? article.abstract : null}
            url={typeof article.web_url != undefined ? article.web_url : null}
          //   expandCard={this.state.expandCard}
          />
        ));
        return (
          <Container className="article-container" fluid>
            {Articles}
          </Container>
        );
      }
    }
  }
}
export default World;
