const uuidv4 = require("uuid/v4");
const bcrypt = require("bcryptjs");

const getValueFromDB = (db, collection, paramObj) => {
  return db
    .get(collection)
    .find(paramObj)
    .value();
};

const pushValueIntoDB = async (db, collection, paramObj) => {
  await db
    .get(collection)
    .push(paramObj)
    .write();
};

const getId = () => {
  return new Promise((resolve, reject) => {
    resolve(uuidv4());
  });
};

const getHash = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        resolve(hash);
      });
    });
  });
};

const comparePasswords = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash).then(result => {
      resolve(result);
    });
  });
};

module.exports = {
  getValueFromDB,
  pushValueIntoDB,
  getHash,
  comparePasswords,
  getId
};
