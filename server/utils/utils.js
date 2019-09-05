const uuidv4 = require("uuid/v4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getValueFromDB = async (db, collection, paramObj) => {
  let value = await db
    .get(collection)
    .find(paramObj)
    .value();
  return value;
};

const pushValueIntoDB = async (db, collection, paramObj) => {
  await db
    .get(collection)
    .push(paramObj)
    .write();
};

const updateItemInDB = async (db, collection, findObj, paramObj) => {
  await db
    .get(collection)
    .find(findObj)
    .assign(paramObj)
    .write();
};

const getId = () => {
  return uuidv4();
};

const getHash = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
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

const getNewAccessToken = user => {
  return jwt.sign(
    {
      nickname: user.nickname,
      id: user.id
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "10m"
    }
  );
};
const getNewRefreshToken = user => {
  return jwt.sign(
    {
      nickname: user.nickname,
      id: user.id
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "30d"
    }
  );
};

module.exports = {
  getValueFromDB,
  pushValueIntoDB,
  updateItemInDB,
  getHash,
  comparePasswords,
  getNewAccessToken,
  getNewRefreshToken,
  getId
};
