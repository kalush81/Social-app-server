const Post = require("../../models/Post");

module.exports = {
  Query: {
    getPosts: () => {
      return Post.find()
        .then((posts) => posts)
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
};
