const fs = require("fs/promises");

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud;
  }

  async saveAvatarToCloud(pathFile, publicId) {
    const { public_id: id, secure_url: url } = await this.uploadCloud(
      pathFile,
      {
        public_id: publicId?.replace("Photo/", ""),
        folder: "Photo",
        transformation: { width: 250, crop: "pad" },
      }
    );
    await this.deleteTempFile(pathFile);
    return { publicId: id, avatarUrl: url };
  }

  async deleteTempFile(pathFile) {
    try {
      await fs.unlink(pathFile);
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = Upload;
