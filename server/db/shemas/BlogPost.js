module.exports = mongoose => {
  const User = require("./User")(mongoose);

  const BlogPost = new mongoose.Schema({
    id: {
      type: mongoose.Schema.ObjectId
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdOn: {
      type: Date
    },
    author: [User]
  });

  return BlogPost;
};
