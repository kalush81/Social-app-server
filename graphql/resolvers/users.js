const User = require('../../models/User')

module.exports = {
  Mutation: {
    register(parent, { registerInput: {username, email, password} }, context, info) {
      //validate user data
      const newUser = new User({
          username, email, password, createdAt: "1200-23-232"
      })
      newUser.save();
    },
  },
};
