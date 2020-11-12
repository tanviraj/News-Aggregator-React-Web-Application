import React from "react";
import FavArticle from "./FavArticle";
import { Row, Col } from "react-bootstrap";

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isDelete: false
    };
    this.setisDeleteState = this.setisDeleteState.bind(this);
    this.getisDeleteState = this.getisDeleteState.bind(this);
  }

  componentDidMount() {
    var hideSwitch = this.props.getHideSwitchState();
    if (!hideSwitch) {
      this.props.setHideSwitchState(true);
    }

    var fillNavBar = this.props.getisNavBookMarkFillState();
    if (!fillNavBar) {
      this.props.setisNavBookMarkFillState(true);
    }
  }
  
  setisDeleteState(isDelete) {
    this.setState({
      isDelete: isDelete
    });
  }
  getisDeleteState() {
    return this.state.isDelete;
  }
  
  
  render() {
    var favarticlelist = [];
    console.log('Fav list after clearing is',favarticlelist)
    console.log("Inside Favorites");
    var retrievedObject = localStorage.getItem("idlist");
    if (retrievedObject.length == 0) {
      return <div><center>You have no saved articles</center></div>;
    }
    var retrievedList = retrievedObject.split(",");
    console.log("Id list is", retrievedList);
    for (var i = 0; i < retrievedList.length; i++) {
      console.log("retrievedList[i]:", retrievedList[i]);
        var articleObject = JSON.parse(localStorage.getItem(retrievedList[i]));
        favarticlelist.push(articleObject);
    }
    console.log('Fav article list',favarticlelist)
      const FavArticles = favarticlelist.map((favarticle, index) => (
        <Col xs={12} md={3}>
          <FavArticle
        id={favarticle.id}
        title={favarticle.title}
        section={favarticle.section}
        source={favarticle.source}
        img={favarticle.img}
        date={favarticle.date}
        url={favarticle.url}
        desc={favarticle.desc}
        setisDeleteState={this.setisDeleteState}
        getisDeleteState={this.getisDeleteState}
        />
        </Col>
      ));
    return (<div className="favarticle-list"><div class="Fav">Favorites</div><Row>{FavArticles}</Row></div>)
  }
}

export default Favorites;
