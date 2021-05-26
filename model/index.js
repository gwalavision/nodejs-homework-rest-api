const { v4: uuid } = require("uuid");
const db = require("./db");

const listContacts = async () => {
  return await db.get("contacts").value();
};

const getContactById = async (contactId) => {
  return db.get("contacts").find({ id: contactId }).value();
};

const removeContact = async (contactId) => {
  const contact = db.get("contacts").remove({ id: contactId }).write();
  return contact;
};

const addContact = async (body) => {
  const id = uuid();
  const contact = await {
    id,
    ...body,
  };
  await db.get("contacts").push(contact).write();
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = db
    .get("contacts")
    .find({ id: contactId })
    .assign(body)
    .value();
  db.write();
  return contact.id ? contact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
