import { Component } from "react";
import AuthService from "../services/AuthService";

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: [],
      permissions: [],
      username: "",
    };
  }

  componentDidMount() {
    const loginUser = AuthService.getCurrentUser();
    if (loginUser) {
      this.setState({
        roles: loginUser.roles,
        permissions: loginUser.permissions,
        username: loginUser.username,
      });
    }
  }

  render() {
    return (
      <div style={{"paddingBottom":"150px"}}>
        <h2 className="text-center">
          <br/>
          {this.state.username}'s Granted Authorities{" "}
        </h2>
        <br/>
        <div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Roles </th>
                <th> Permissions </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.state.roles.map((i, j) => (
                    <ul key={j}>
                      <li className="break-word">{i}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {" "}
                  {this.state.permissions.map((i, j) => (
                    <ul key={j}>
                      <li className="break-word">{i}</li>
                    </ul>
                  ))}{" "}
                </td>
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

export default UserDetails;
