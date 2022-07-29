import { initializeApp } from 'firebase/app'
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
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

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup( auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider );

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = { displayName: ''}) => {

        if(!userAuth) return //way to protect our code, Typescript makes it easier

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
                    ...additionalInformation,
                });
            } catch (error){
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef;
  } 


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;  
          
        return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword  = async (email, password) => {
    if (!email || !password) return;  
      
    return await signInWithEmailAndPassword (auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback)