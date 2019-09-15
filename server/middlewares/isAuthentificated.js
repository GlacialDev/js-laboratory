module.exports = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send("you are not authentificated");
};
