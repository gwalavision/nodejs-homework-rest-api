const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const createNotExistedFolder = require("../helpers/create-dir");

class Upload {
  constructor(AVATARS_OF_USERS) {
    this.AVATARS_OF_USERS = AVATARS_OF_USERS;
  }

  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile);
    await file
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }

  async saveAvatarToStatic({ idUser, pathFile, name, oldFile }) {
    await this.transformAvatar(pathFile);
    const userAvatarFolder = path.join(this.AVATARS_OF_USERS, idUser);
    await createNotExistedFolder(userAvatarFolder);
    await fs.rename(pathFile, path.join(userAvatarFolder, name));
    await this.deleteOldAvatar(
      path.join(process.cwd(), this.AVATARS_OF_USERS, oldFile)
    );
    const avatarUrl = path.normalize(path.join(idUser, name));
    return avatarUrl;
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = Upload;
