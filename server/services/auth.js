const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");


const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { username, email, password, password2, image } = data;


    const existingUser = await User.findOne({ email });

    const existingUsername = await User.findOne({ username })

    if (existingUser) {
      throw new Error("This user already exists");
    }

    if (existingUsername) {
      throw new Error("This username already exists");
    }

    if (password !== password2) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        username,
        email,
        password: hashedPassword,
        image
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  const user = await User.findById(data._id);
  const token = null;
  user.token = token;
  user.updateOne();
  return { token, loggedIn: false }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { emailOrUsername, password } = data;
    let existingUser; 

    if (emailOrUsername.includes("@")) {
      let email = emailOrUsername;
      existingUser = await User.findOne({ email });
    } else {
      let username = emailOrUsername;
      existingUser = await User.findOne({ username }); 
    }

    if (!existingUser) {
      throw new Error("Incorrect log in combination");
    }

    const isPassword = await bcrypt.compare(password, existingUser.password)
    if (!isPassword) {
      throw new Error("Incorrect log in combination");
    } else {
      const token = jwt.sign({ id: existingUser._id }, keys.secretOrKey);
      return { token, loggedIn: true, ...existingUser._doc, password: null };
    }

  } catch (err) {
    throw err;
  }

};

const verifyUser = async data => {
  try {
    const { token } = data;
  
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };