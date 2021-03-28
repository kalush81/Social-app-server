const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../../models/User");
const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SECRET = process.env.SECRET;

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password } },
      context,
      info
    ) {
      const user = await User.findOne({username})
      if (user) {
          throw new Error(`user ${username} exists in our database`)
      } 
      if (!email.match(mailformat)) {
          throw new Error(`${email} is not valid email`)
      }
      const hash = bcrypt.hashSync(password, 8);
      const newUser = new User({
        username,
        email,
        password: hash,
        createdAt: new Date().toISOString,
      });
      const res = await newUser.save();
      console.log(SECRET)

      const token = jwt.sign({
          id: res.id,
          username: res.username,
          email: res.email
      }, SECRET, { expiresIn: '1h'})
      console.log(token)
      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
  },
};
