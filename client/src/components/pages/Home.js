import React from 'react';
import Contact from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm';



const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
               <Contact />
               <ContactFilter />
            </div>
        </div>
    )
}

export default Home
