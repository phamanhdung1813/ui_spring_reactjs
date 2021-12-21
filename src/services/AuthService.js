import axios from "axios";
import authorizationHeader from "./AuthorizationHeader";

const AUTH_API_BASE_URI = "https://spring-boot-security-backend.herokuapp.com/api/auth";

class AuthService {
  Login(username, password) {
    return axios
      .post(AUTH_API_BASE_URI + "/login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("accessUser", JSON.stringify(response.data));
          return response.data;
        }
      });
  }

  RefreshToken() {
    return axios.get(AUTH_API_BASE_URI + "/refresh_token", {
      headers: authorizationHeader(),
    }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("refreshUser", JSON.stringify(response.data));
        return response.data;
      }
    });
  }

  Logout() {
    localStorage.removeItem("accessUser");
    localStorage.removeItem("refreshUser");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("accessUser"));
  }

  getRefreshToken() {
    return JSON.parse(localStorage.getItem("refreshUser"));
  }
}

export default new AuthService();
