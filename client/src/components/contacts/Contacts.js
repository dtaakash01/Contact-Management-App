import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contacts/contactContext';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (contacts === null) {
        return (
            <h4>Please add a contact</h4>
        )
    }
    else
 

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ? filtered.map(contact => (
                <CSSTransition  key={contact.id} timeout={500} classNames='item'>
                     <ContactItem contact={contact} />
                </CSSTransition>))
                    :
                    contacts.map(contact => (
                        <CSSTransition  key={contact.id} timeout={500} classNames='item'>
                            <ContactItem key={contact.id} contact={contact} />
                        </CSSTransition>

                        ))}
          </TransitionGroup>
        </Fragment>
    )
}

export default Contacts
