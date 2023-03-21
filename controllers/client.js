const User = require("../models/user");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const Project = require("../models/project");
const Certificate = require("../models/certificate");
const { clearImageUrl } = require("../util/file");

const getUserByUsername = async (parent, { username }, { req }, info) => {
  console.log(username);
  try {
    const user = await User.findOne({ usernameUser: username });
    const project = await Project.find({ creatorProject: user._id }).limit(6);
    const certificate = await Certificate.find({ creatorProject: user._id }).limit(6);
    console.log(project)
    return {
      user: user,
      projects: project.map((p) => {
        return { ...p._doc };
      }),
      certificates: certificate.map((p) => {
        return { p };
      }),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUserByUsername,
};
