const fs = require("fs").promises;

const isAccessible = async (path) => {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createNotExistedFolder = async (folder) => {
  if (!(await isAccessible(folder))) {
    return await fs.mkdir(folder);
  }
};

module.exports = createNotExistedFolder;
