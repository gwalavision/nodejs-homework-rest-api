const app = require("../app");
const db = require("../model/db");
const createNotExistedFolder = require("../helpers/create-dir");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const { UPLOAD_DIR } = process.env;
const { AVATARS_OF_USERS } = process.env;

db.then(() => {
  app.listen(PORT, async () => {
    await createNotExistedFolder(UPLOAD_DIR);
    await createNotExistedFolder(AVATARS_OF_USERS);

    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Server running has failed. Error: ${e.message}`);
  process.exit(1);
});
