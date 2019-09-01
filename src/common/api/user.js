exports.createUser = (url, data) => {
  console.log(url, data);
  return fetch(url, {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
};
