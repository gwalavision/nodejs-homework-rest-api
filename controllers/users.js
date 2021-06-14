const Users = require("../model/users");

const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");

const { HTTPCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const UploadAvatar = require("../services/upload-avatars-local");
const Upload = require("../services/upload-avatars-cloud");
const { JWT_SECRET_KEY } = process.env;
// const { AVATARS_OF_USERS } = process.env;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const ctrlReg = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HTTPCode.CONFLICT).json({
        status: "error",
        code: HTTPCode.CONFLICT,
        message: "Email is already used",
      });
    }
    const newUser = await Users.create(req.body);
    const { id, email, subscription, avatar } = newUser;
    return res.status(HTTPCode.CREATED).json({
      status: "success",
      code: HTTPCode.CREATED,
      data: { id, email, subscription, avatar },
    });
  } catch (e) {
    next(e);
  }
};

const ctrlLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findByEmail(email);

    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HTTPCode.UNAUTHORIZED).json({
        status: "error",
        code: HTTPCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    await Users.updateToken(user.id, token);

    return res.status(HTTPCode.OK).json({
      status: "success",
      code: HTTPCode.OK,
      data: { token },
    });
  } catch (e) {
    next(e);
  }
};

const ctrlLogout = async (req, res, next) => {
  await Users.updateToken(req.user.id, null);
  return res.status(HTTPCode.NO_CONTENT).json({});
};

const ctrlAvatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploadCloud = promisify(cloudinary.uploader.upload);
    const uploads = new Upload(uploadCloud);
    const { avatarUrl, publicId } = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.publicId
    );
    await Users.updateAvatar(id, avatarUrl, publicId);
    return res.json({
      status: "success",
      code: HTTPCode.OK,
      data: { avatarUrl },
    });
  } catch (e) {
    next(e);
  }
};

const ctrlCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = await Users.findById(req.user.id);

    return res.status(HTTPCode.OK).json({
      status: "success",
      code: HTTPCode.OK,
      data: { email, subscription },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  ctrlReg,
  ctrlLogin,
  ctrlLogout,
  ctrlCurrentUser,
  ctrlAvatars,
};
