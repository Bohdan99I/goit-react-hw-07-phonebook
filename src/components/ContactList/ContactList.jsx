import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, deleteContact } from 'redux/operations';
import {
  ContactListWrapper,
  ContactListItem,
  ContactName,
  ContactButton,
} from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contactsList);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ContactListWrapper>
      {filteredContacts.map(contact => {
        return (
          <ContactListItem key={contact.id}>
            <div>
              <ContactName>{contact.name}:</ContactName>
              <p>{contact.number}</p>
            </div>
            <ContactButton
              type="button"
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </ContactButton>
          </ContactListItem>
        );
      })}
    </ContactListWrapper>
  );
};