// import { useEffect } from 'react';
// import { getRedirectResult} from 'firebase/auth'

import { 
        // auth,
         signInWithGooglePopUp, 
        //  signInWithGoogleRedirect,
         createUserDocumentFromAuth 
        } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'


const SignIn = () => {

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);

    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    //     console.log(response);
    // }, [])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google redirect</button> */}
            <SignUpForm/>
        </div>
    )
}

export default SignIn