const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const targetContact = contacts.find((contact) => contact.id === contactId);

  return targetContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (removedContactIndex === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(removedContactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const targetContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (targetContactIndex === -1) {
    return null;
  }
  const {
    name: prevName,
    email: prevEmail,
    phone: prevPhone,
  } = contacts[targetContactIndex];

  contacts[targetContactIndex] = {
    id: contactId,
    name: name ?? prevName,
    email: email ?? prevEmail,
    phone: phone ?? prevPhone,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[targetContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
