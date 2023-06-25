import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${contactId}`);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (contactId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/contacts/${contactId}`, updatedData);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Contact List</h1>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>Name:</strong> {contact.name},{' '}
              <strong>Phone:</strong> {contact.phone},{' '}
              <strong>Email:</strong> {contact.email}
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
              <button
                onClick={() =>
                  handleUpdate(contact.id, {
                    name: 'Updated Name',
                    phone: 'Updated Phone',
                    email: 'Updated Email',
                  })
                }
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
