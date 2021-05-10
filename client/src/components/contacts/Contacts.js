import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem'
import ContactContext from '../../context/contacts/contactContext';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext
    console.log(contacts);

    return (
        <div>
           { contacts.map(contact => 
                <ContactItem key={contact.id} contact={contact} />
            )}
        </div>
    )
}

export default Contacts
