import "./App.css";
import "./style.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderComponent from "./components/HeaderComponent";
import LoginComponent from "./components/LoginComponent";
import ListAllResources from "./components/ListAllResources";
import ViewResourceId from "./components/ViewResourceId";
import CreateResource from "./components/CreateResource";
import UserDetails from "./components/UserDetails"
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";
import RefreshToken from "./components/RefreshToken";

class App extends Component {
  render() {
    return (
      <Router>
        <HeaderComponent />
        <Container>
          <Row>
            <Col lg={12} className={"margin-top"}>
              <Switch>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route exact path="/login" component={LoginComponent}></Route>
                <Route exact path="/all-data" component={ListAllResources}></Route>
                <Route exact path="/all-data/:id" component={ViewResourceId}></Route>
                <Route exact path="/create_update_data/:id" component={CreateResource}></Route>
                <Route exact path="/user_detail" component={UserDetails}></Route>
                <Route exact path="/refresh_token" component={RefreshToken}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
        <FooterComponent />
      </Router>
    );
  }
}

export default App;
