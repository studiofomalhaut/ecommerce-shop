import { initializeApp } from 'firebase/app'
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider 
        }
        from 'firebase/auth'
import { getFirestore, doc,getDoc,setDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD93d9ucw6exQ9CFWzv_-tKmrL1ABMHwhQ",
    authDomain: "crwn-db-682ff.firebaseapp.com",
    projectId: "crwn-db-682ff",
    storageBucket: "crwn-db-682ff.appspot.com",
    messagingSenderId: "313674394455",
    appId: "1:313674394455:web:c8f38bd594831cc6196c12"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup( auth, provider);


  export const db = getFirestore()
  
  export const createUserDocumentFromAuth = async (userAuth) => {
        const userDocRef = doc(db, 'users', userAuth.uid)

        console.log(userDocRef)

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot)
        console.log(userSnapshot.exists())

        if(!userSnapshot.exists()){
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                });
            } catch (error){
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef;
  } 

