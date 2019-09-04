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

exports.signInJWTRequest = token => {
  return fetch("/api/user/signin_jwt", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(token)
  }).then(response => response.json());
};
