const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  const result = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "email subscription -_id",
  });
  return result;
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: "owner", select: "email subscription -_id" });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = Contact.findByIdAndRemove({ _id: contactId, owner: userId });
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create({ ...body });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      ...body,
    },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
