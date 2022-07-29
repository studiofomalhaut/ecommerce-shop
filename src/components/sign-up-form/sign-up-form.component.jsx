import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, 
         createUserDocumentFromAuth } 
         from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import './sign-up-form.component.jsx'

import Button from '../button/button.component'


const defaultFormFields= {
    displayName: '',
    email: '',
    pasword: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    
    // console.log('hit')

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password !== confirmPassword){
            alert("passwords do not match")
            return
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
                )
            
            await createUserDocumentFromAuth(user, {displayName})
            console.log({user});
            resetFormFields();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
             alert('This e-mail is already in use')
            }
            else{
                console.log('user creation encountered an error', error)
            }
        }

    }

    const handleChange = (event) => {

        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value })
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name"
                      type="text" required
                        onChange={handleChange} 
                        name="displayName" 
                        value={displayName}/>

                <FormInput label="E-mail"
                        type="email" required 
                        onChange={handleChange} 
                        name="email" 
                        value={email}/>

                <FormInput label="Password"
                        type="password" required 
                        onChange={handleChange} 
                        name="password"
                        value={password}/>

                <FormInput label="ConfirmPassword"
                        type="password" required 
                        onChange={handleChange} 
                        name="confirmPassword"
                        value ={confirmPassword}/>

                <Button buttonType='' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm