const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// const contacts = require("./contacts.json");

const adapter = new FileSync("./model/contacts.json");
const db = low(adapter);

// Set some defaults
db.defaults({ contacts: [] }).write();

module.exports = db;
