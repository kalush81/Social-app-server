const bcrypt = require('bcryptjs');
const User = require('../../models/User')

module.exports = {
  Mutation: {
    async register(parent, { registerInput: {username, email, password} }, context, info) {
      //validate user data
      let hash = bcrypt.hashSync(password, 8);
      console.log('hash', hash);
      const newUser = new User({
          username, email, password: hash, createdAt: "1200-23-232"
      });
      const res =  await newUser.save();
      return { ...res._doc, id: res._id, token : 'this is gonna be a token in a future' }
    },
  },
};
