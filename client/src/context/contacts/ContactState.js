import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'akash',
                email: 'dtakash01@gmail.com',
                phone: '9988776655',
                type: 'personal'
            },
            {
                id: 2,
                name: 'akashd',
                email: 'dtakash01@gmail.com',
                phone: '9988776655',
                type: 'personal'
            },
            {
                id: 3,
                name: 'akashdt',
                email: 'dtakash01@gmail.com',
                phone: '9988776655',
                type: 'professional'
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact
    const addContact = ({contact}) => {
        contact.id = uuidv4();
        
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
        
    };

    // Delete contact
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contact

    // Clear Filter

    return (
        <contactContext.Provider 
            value={{
                contacts: state.contacts,
                addContact,
                deleteContact
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;