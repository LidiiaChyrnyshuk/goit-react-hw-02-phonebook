import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactEditor } from './ContactEditor/ContactEditor';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { ContactsList } from './ContactsList/ContactsList';

const testContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...testContacts],
    filter: '',
  };

  handleSubmit = values => {
    const { name, number } = values;
    const { contacts } = this.state;

    const existingName = contacts.some(item => item.name === name);
    const existingNumber = contacts.find(item => item.number === number);

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    this.handleAddNewContact(name, number);

    // this.handleResetForm();
  };

  handleAddNewContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  // handleResetForm = () => {
  //   this.setState({ ...this.state });
  // };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactEditor onSubmit={this.handleSubmit}></ContactEditor>

        <h2>Contacts</h2>
        <ContactsFilter
          value={this.state.filter}
          onChange={this.handleChangeFilter}
        />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
