import { createContext, useState, useEffect } from 'react'
import { createUserDocumentFromAuth, 
          onAuthStateChangedListener, 
        //   signOutUser 
        } from '../utils/firebase/firebase.utils';


// the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});


// provider, the actual component that wraps around any other components that need context values
export const UserProvider = ({children}) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    // signOutUser()

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
               createUserDocumentFromAuth(user)
            }
            console.log(user)
            setCurrentUser(user)
        })
        return unsubscribe
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};


// <UserProvider>
//      <app/>       ----> = children
//  </UserProvider>
//