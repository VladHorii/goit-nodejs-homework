const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempStorage, originalname } = req.file;
  try {
    const userId = req.user._id;
    const [extention] = originalname.split(".").reverse();
    const newFileName = `avatar_${userId}.${extention}`;
    const resultStorage = path.join(avatarsDir, newFileName);

    Jimp.read(tempStorage, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).write(resultStorage);
    });
    await fs.unlink(tempStorage);

    const avatarURL = path.join("/avatars", newFileName);
    const user = await User.findByIdAndUpdate(
      userId,
      { avatarURL },
      { new: true }
    ).select("avatarURL");
    res.status(201).json({
      status: "200 OK",
      ResponseBody: { avatarURL: user.avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};
module.exports = updateAvatar;
