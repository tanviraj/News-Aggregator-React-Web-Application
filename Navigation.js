import React from "react";
import { Navbar, NavLink, Nav, Form, FormControl } from "react-bootstrap";
import { Route, Switch as SwitchRouter, Link } from "react-router-dom";
import Switch from "react-switch";
import AsyncSelect, { makeAsyncSelect } from "react-select/async";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import World from "./World";
import Politics from "./Politics";
import Business from "./Business";
import Technology from "./Technology";
import Sports from "./Sports";
import Favorites from "./Favorites";
import _ from "lodash";
import SearchArticleList from "./SearchArticleList";
import { withRouter } from "react-router-dom";
import ExpandedCard from "./ExpandedCard";
import { MdBookmarkBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa"
import { FaBookmark } from "react-icons/fa"
import ReactTooltip from "react-tooltip";

class Navigation extends React.Component {
  constructor() {
    console.log('Inside Navigation')
    super();
    this.state = {
      checked: localStorage.getItem('localStorage')== null? true: localStorage.getItem('localStorage')== "true" ? true: false,
      hideSwitch: false,
      selectedResult: '',
      isNavBookMarkFill: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handlebookmark = this.handlebookmark.bind(this);
    this.setHideSwitchState = this.setHideSwitchState.bind(this);
    this.getHideSwitchState = this.getHideSwitchState.bind(this);
    this.setisNavBookMarkFillState = this.setisNavBookMarkFillState.bind(this);
    this.getisNavBookMarkFillState = this.getisNavBookMarkFillState.bind(this);
  }

  handleSwitch(checked) {
    console.log('Inside handle switch')
    console.log('Checked value', checked)
    localStorage.setItem('localStorage', checked);
    // var c = !checked;
    this.setState({
      checked: checked
    });
  }

  handleLoadOptions = async (event, { value }) => {
    console.log("In handle change");
    console.log(event);
    console.log({ value });
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=en-US&q=${event}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "a835f8fd7084449983ad85fc709387bc"
          }
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      console.log(resultsRaw);
      const options_results = resultsRaw.map(result => ({
        value: result.displayText,
        label: result.displayText
      }));
      console.log(options_results);
      this.setState({ options_results: options_results });
      return options_results;
    } catch (error) {
      console.error(`Error fetching search ${value}`);
    }
  };
  setHideSwitchState(hideSwitch) {
    this.setState({
      hideSwitch: hideSwitch
    });
  }

  getHideSwitchState() {
    return this.state.hideSwitch;
  }

  setisNavBookMarkFillState(isNavBookMarkFill) {
    this.setState({
      isNavBookMarkFill: isNavBookMarkFill
    });
  }

  getisNavBookMarkFillState() {
    return this.state.isNavBookMarkFill;
  }

  handleResultSelect = (e, { results }) => {
    // const { match, location, history } = this.props;

    console.log("Inside result select");
    console.log(e);
    this.setState({ selectedResult: e });
    console.log(this.props);
    this.props.history.push(`/search:${e.value}`);
  };

  componentDidMount() {
    ReactTooltip.rebuild()
  }
  componentDidUpdate() {
    console.log('Inside Navigation componentDidUpdate')    
    console.log(window.location.href)
    var x = window.location.href
    // if (!(x.includes('search'))) {
    //   console.log('Inside search substring')
    //   this.setState({
    //     selectedResult:''
    // });
    // }
  }

  handlebookmark = e => {
    console.log("Inside handle bookmark");
    this.props.history.push(`/favorites`);
  };
  render() {
    return (
      <div className="Landingpage">
        <Navbar className="navbar-style" bg="dark" expand="lg" sticky="top">
        <div className="select-style">
              <AsyncSelect
                cacheOptions
                loadOptions={_.debounce(this.handleLoadOptions, 1000, {
                  leading: true
                })}
                onChange={this.handleResultSelect}
                placeholder="Enter keyword .."
                // value={this.state.searchval}
                // defaultOptions
              />
            </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink exact={true} className="navlink-items" activeClassName="allActiveNavLink" href="/" to="/">
                Home
              </NavLink>
              <NavLink exact={false} className="navlink-items" activeClassName="allActiveNavLink" href="/world" to="/world">
                World
              </NavLink>
              <NavLink  exact={false} className="navlink-items" activeClassName="allActiveNavLink"  href="/politics" to="/politics">
                Politics
              </NavLink>
              <NavLink exact={false} className="navlink-items" activeClassName="allActiveNavLink" href="/business" to="/business">
                Business
              </NavLink>
              <NavLink exact={false} className="navlink-items" activeClassName="allActiveNavLink"  href="/technology" to="/technology">
                Technology
              </NavLink>
              <NavLink exact={false} className="navlink-items" activeClassName="allActiveNavLink"  href="/sports" to="/sports">
                Sports
              </NavLink>
            </Nav>
            <label style={{marginBottom: "0px"}}>
                  <FaRegBookmark className={'navBookmark ' + (!this.state.isNavBookMarkFill ? null : 'hideElement')} data-for='b1' data-tip="Bookmark" onClick={this.handlebookmark} />
                  <FaBookmark className={'filledBookmark ' + (this.state.isNavBookMarkFill ? '' : 'hideElement')} data-for='b2' data-tip="Bookmark" onClick={this.handlebookmark} />
                  </label>
              {/* <label> */}
                {/* <div class="switch"> */}
                {/* <FaRegBookmark data-tip="Bookmark" onClick={this.handlebookmark} /> */}
                
                  
                
                <ReactTooltip id='b1' effect="solid" place="bottom" /> 
                <ReactTooltip id='b2' effect="solid" place="bottom" />                
                <ReactTooltip effect="solid" place="bottom" />
                {!this.state.hideSwitch ?
                  <>
                  <div className="spanners">NYTimes</div>
                  <Switch
                    className="switch-button"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    onChange={this.handleSwitch}
                    checked={this.state.checked}
                    // checked={localStorage.getItem('switchValue') != null ? ((localStorage.getItem('switchValue') == 'true') ? true : false) : this.state.checked}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={40}
                    handleDiameter={20}
                  ></Switch>
                  <div className="spanners">Guardian</div>
                  </> : <div />}
                {/* </div> */}
              {/* </label> */}
          </Navbar.Collapse>
        </Navbar>
        <SwitchRouter>
          <Route
            path="/"
            render={props => <Home isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}/>}
            exact
          />
          <Route
            path="/world"
            render={props => <World isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}/>}
          />
          <Route
            path="/politics"
            render={props => <Politics isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}  
            />}
          />
          <Route
            path="/business"
            render={props => <Business isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}/>}
          />
          <Route
            path="/technology"
            render={props => <Technology isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}/>}
          />
          <Route
            path="/sports"
            render={props => <Sports isGuardian={this.state.checked}
            setHideSwitchState={this.setHideSwitchState}
            getHideSwitchState={this.getHideSwitchState}
            setisNavBookMarkFillState={this.setisNavBookMarkFillState}
            getisNavBookMarkFillState={this.getisNavBookMarkFillState}/>}
          />
          <Route
            path="/search:keyword"
            render={props => (
              <SearchArticleList
                {...props}
                isGuardian={this.state.checked}
                setHideSwitchState={this.setHideSwitchState}
                getHideSwitchState={this.getHideSwitchState}
                setisNavBookMarkFillState={this.setisNavBookMarkFillState}
                getisNavBookMarkFillState={this.getisNavBookMarkFillState}
              />
            )}
          />
          <Route
            path="/expandedcard/:articleid"
            render={props => (
              <ExpandedCard
                {...props}
                setHideSwitchState={this.setHideSwitchState}
                getHideSwitchState={this.getHideSwitchState}
                setisNavBookMarkFillState={this.setisNavBookMarkFillState}
                getisNavBookMarkFillState={this.getisNavBookMarkFillState}
              />
            )}
          />
          <Route path="/favorites" render={props => (<Favorites
          {...props}
          setHideSwitchState={this.setHideSwitchState}
          getHideSwitchState={this.getHideSwitchState}
          setisNavBookMarkFillState={this.setisNavBookMarkFillState}
          getisNavBookMarkFillState={this.getisNavBookMarkFillState}
            />)} />
        </SwitchRouter>
      </div>
    );
  }
}
export default withRouter(Navigation);
