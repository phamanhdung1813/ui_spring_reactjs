import React, { Component } from "react";
import AuthService from "../services/AuthService";
import eventManagement from "../events/EventManagement";

class RefreshToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshToken: [],
    };
  }

  componentDidMount() {
    const newToken = AuthService.getRefreshToken();
    // const oldToken = JSON.parse(localStorage.getItem("accessUser"));
    if (newToken) {
      this.setState({
        refreshToken: newToken.accessToken,
      });
    }
    localStorage.setItem("accessUser", JSON.stringify(newToken));
    eventManagement.on("logout", () => {
      this.logOut();
    });
  }

  render() {
    return (
      <div style={{"paddingBottom":"150px"}}>
        <br />
        <div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> JWT </th>
                <th> REFRESH TOKEN VALUE 👇 </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bearer</td>
                <td className="break-word">{this.state.refreshToken}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <a className="btn btn-outline-dark" href="/all-data">
          BACK
        </a>
      </div>
    );
  }
}

export default RefreshToken;
