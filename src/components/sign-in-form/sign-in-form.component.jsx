
import { useState } from 'react'

import { signInWithGooglePopUp, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } 
    from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

const defaultSignInFormFields = {
    email: '',
    password:'',
}

const SignInForm = () => {

        const [signInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
        const {email, password} = signInFormFields;
        console.log(signInFormFields)
    
        const resetSignInFields = () => {
            setSignInFormFields(defaultSignInFormFields);
        }


        const signInWithGoogle = async() => {
            const {user} = await signInWithGooglePopUp();
            const userDocRef = await createUserDocumentFromAuth(user);
        }


        const handleFormSubmit = async(event) =>{
            event.preventDefault();     
            try{
                const response = await signInAuthUserWithEmailAndPassword(email,password)
                console.log(response)
                resetSignInFields()
            }catch (error) {
                switch(error.code){
                    case 'auth/wrong-password':
                        alert('incorrect password')
                        break
                    case 'auth/user-not-found':
                        alert('no user associated wit this email')
                        break
                    default:
                        console.log(error)
                }
                console.log(error)
            }
        }

        const changeHandler = (event) => {

            const {name, value} = event.target;
            setSignInFormFields({...signInFormFields, [name]: value })
        }


    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleFormSubmit}>
            <FormInput label="E-mail"
                        type="email" required
                        onChange={changeHandler}
                        name="email"
                        value={email}/>
            <FormInput label="Password"
                        type="password" required
                        onChange={changeHandler}
                        name="password"
                        value={password}/>
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button buttonType='google' onClick={signInWithGoogle}>Sing in With Google</Button>
            </div>
            </form>
            </div>
    
    )
}

export default SignInForm