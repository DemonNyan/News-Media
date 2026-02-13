const User = require("../models/Users");
const createToken = require("../jwt/createToken");

const usersController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.login(email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 5 * 1000,
      });
      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(400).json({ errors: e.message });
    }
  },

  logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    return res.json({ message: "Logout Success" });
  },

  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 5 * 1000,
      });
      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(400).json({ errors: e.message });
    }
  },
};

module.exports = usersController;
