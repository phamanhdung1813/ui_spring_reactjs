import { Component } from "react";
import AuthService from "../services/AuthService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import springboot_reactjs from "../images/springboot_reactjs.png"

const requiredValue = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field does not empty !!!
      </div>
    );
  }
};

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRememberMe = this.onChangeRememberMe.bind(this);

    this.state = {
      username: "",
      password: "",
      rememberMe: false,
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeRememberMe(e) {
    const input = e.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const { username, rememberMe } = this.state;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("username", rememberMe ? username : "");
    this.setState({
      loading: true,
      message: "",
    });
    this.form.validateAll();

    if (this.checkButton.context._errors.length === 0) {
      AuthService.Login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/user_detail");
          window.location.reload();
        },
        (error) => {
          const responseError =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({ loading: false, message: responseError });
        }
      );
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <section class="vh-100">
        <div>
          <br />
          <div className="container-fluid h-custom" style={{"padding-bottom":"150px"}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-9 col-lg-6 col-xl-5">
                <img
                  src={springboot_reactjs}
                  class="img-fluid"
                  alt="springboot_reactjs"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <Form
                  onSubmit={this.handleLoginSubmit}
                  ref={(i) => {
                    this.form = i;
                  }}
                >
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">
                      Spring Securiy Credential
                    </p>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">
                      Username:
                    </label>
                    <Input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[requiredValue]}
                      className="form-control form-control-lg"
                      placeholder="Enter Spring Security Username"
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>

                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <div className="form-outline mb-3">
                    <Input
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[requiredValue]}
                      className="form-control form-control-lg"
                      placeholder="Enter Spring Security Password"
                    />
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        checked={this.state.rememberMe}
                        onChange={this.onChangeRememberMe}
                        name="rememberMe"
                        id="rememberMe"
                      />
                      <label htmlFor="rememberMe" class="form-check-label">
                        Remember me ?
                      </label>
                    </div>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      disabled={this.state.loading}
                      className="btn btn-outline-primary btn-lg"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>

                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}

                    <CheckButton
                      style={{ display: "none" }}
                      ref={(i) => {
                        this.checkButton = i;
                      }}
                    />

                  </div>
                </Form>
              </div>
            </div>
          </div>        
        </div>
      </section>
    );
  }
}

export default LoginComponent;
