import React, {useContext, useEffect} from 'react';
import Contact from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter'
import ContactForm from '../contacts/ContactForm';
import AuthContext from '../../context/Auth/authContext'


const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
    }, [])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
               <Contact />
              
            </div>
        </div>
    )
}

export default Home
