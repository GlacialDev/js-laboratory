exports.signUpRequest = data => {
  return fetch("/api/user/signup", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

exports.signInRequest = data => {
  return fetch("/api/user/signin", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

exports.signInJWTRequest = accessToken => {
  return fetch("/api/user/signin_jwt", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accessToken })
  }).then(response => response.json());
};

exports.refreshAccessTokenRequest = refreshToken => {
  return fetch("/api/user/refresh_token", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  }).then(response => response.json());
};
