export default function authorizationHeader() {
  const user = JSON.parse(localStorage.getItem("accessUser"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return null;
  }
}
