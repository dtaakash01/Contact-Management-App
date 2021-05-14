import React, { useState,useContext, useEffect } from 'react';
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/Auth/authContext';

const Register = props => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext; 

    const { name,email,password,password2 } = user;
    

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if( error === 'User already exits'){
            setAlert(error, 'danger');
            clearErrors()
        }

        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onChange = (e) => setUser({...user, 
        [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        if(name  === '' || email === '' || password === '' || password2 === '') {
            setAlert('Please enter something', 'danger')
        } else if (password !== password2) {
            setAlert('Password do not match', 'danger')
        }
        else {
            register({
                name,
                email,
                password
            })
        }
        e.preventDefault();
       
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-prinary'>Register</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required minLength='6'/>
                </div>
                <div className="form-group">
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange} required minLength='6'/>
                </div>

                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
            
        </div>
    )
}

export default Register
