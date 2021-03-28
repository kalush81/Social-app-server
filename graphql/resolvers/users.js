const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const {
  validUserName,
  validEmail,
  passwordTooLongOrTooShort,
} = require("../../utils/validation");

const SECRET = process.env.SECRET;

module.exports = {
  Mutation: {
    async login(_,{ email, password } ) {
        //code..
    },  
    async register(
      parent,
      { registerInput: { username, email, password } },
      context,
      info
    ) {
      if (!validUserName(username)) {
        throw new Error(
          `name: ${username.substr(0, 20)}... doesn't match validation`
        );
      }
      if (!validEmail(email)) {
        throw new Error(`${email} is not valid email`);
      }
      if (passwordTooLongOrTooShort(password)) {
        throw new Error(`password length must be between 4 and 30 characters long`);
      }

      const userInDb = await User.findOne({ username });
      const emailInDb = await User.findOne({ email });

      if (userInDb || emailInDb) {
        throw new Error(`this user exists in our database`);
      }
      const hash = bcrypt.hashSync(password, 8);
      const newUser = new User({
        username,
        email,
        password: hash,
        createdAt: new Date().toISOString,
      });
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          username: res.username,
          email: res.email,
        },
        SECRET,
        { expiresIn: "1h" }
      );
      console.log(token);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};


//TODO: 
//use GraphQL Error handler to stack all the validation errors