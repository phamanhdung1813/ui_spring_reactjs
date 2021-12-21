import { Component } from "react";
import { ImTerminal } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import AuthService from "../services/AuthService";
import eventManagement from "../events/EventManagement";
import { Link } from "react-router-dom";
import { BsClipboardData } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const loginUser = AuthService.getCurrentUser();
    if (loginUser) {
      this.setState({
        currentUser: loginUser,
      });
    }
    eventManagement.on("logout", () => {
      this.logOut();
    });
  }

  onClickRefresh() {
    AuthService.RefreshToken().then(() => {
      window.location.reload();
    });
  }

  componentWillUnmount() {
    eventManagement.remove("logout");
  }

  logOut() {
    AuthService.Logout();
    this.setState({ currentUser: undefined });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <nav className="container-fluid navbar navbar-expand-sm bg-dark navbar-dark">
        <a style={{ color: "#6cebe2" }} className="navbar-brand" href="/">
          <ImTerminal /> ANH DUNG PHAM
        </a>
        {currentUser ? (
          <div className="ml-auto" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={this.logOut}
                  href="/login"
                >
                  LOGOUT
                </a>
              </li>

              <li className="nav-item">
                <Link to={"/user_detail"} className="nav-link">
                  <FaUserAlt /> {currentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/refresh_token"}
                  onClick={() => {
                    this.onClickRefresh();
                  }}
                  className="nav-link"
                >
                  <FiRefreshCcw /> Refresh Token
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/all-data"} className="nav-link">
                  <BsClipboardData /> Resource Data
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="ml-auto" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  LOGIN
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default Header;
