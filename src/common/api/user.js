exports.signUpRequest = data => {
  return fetch("/api/user", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

exports.signInRequest = data => {
  return fetch("/api/user/authenticate", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

exports.autoSignInRequest = () => {
  return fetch("/api/user/session_authenticate", {
    method: "GET",
    mode: "same-origin"
  }).then(response => response.json());
};

exports.logOutRequest = () => {
  return fetch("/api/user/logout", {
    method: "GET",
    mode: "same-origin"
  });
};
