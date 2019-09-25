const modelName = "User";
const handlers = require("../../utils/crudHandlers")(modelName);

const { list, get, update, remove } = handlers;

const create = (req, res, next) => {};

module.exports = { list, get, create, update, remove };
