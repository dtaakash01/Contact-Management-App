import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';


export default (state,action) => {
    console.log(state.contacts);
    console.log(action);
    switch(action.type) {
        case ADD_CONTACT:
            console.log("add");
            return {
                ...state,
                contacts: [...state.contacts,action.payload]
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }

        default: 
            return state;
    }

    
}