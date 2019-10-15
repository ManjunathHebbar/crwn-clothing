import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
 
const config = {
        apiKey: "AIzaSyAJH5GFS560h40gTs7kTKsEq531B2oZ5eg",
        authDomain: "crwn-db-bca11.firebaseapp.com",
        databaseURL: "https://crwn-db-bca11.firebaseio.com",
        projectId: "crwn-db-bca11",
        storageBucket: "crwn-db-bca11.appspot.com",
        messagingSenderId: "1031436919449",
        appId: "1:1031436919449:web:44deca56f1d3e1cc958e08",
        measurementId: "G-7WBEZ5GXPG"
};

export const createUserProfileDocument = async (userAuth, additinalData) => {
        if(!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`)
        const snapShot = await userRef.get();
        console.log(snapShot)

        if(!snapShot.exists){
          const {displayName, email} = userAuth;
          const createdAt = new Date();
          try{
             await userRef.set({
                displayName,
                email,
                createdAt,
                ...additinalData
             })
          }catch(error){
              console.log('error creating user', error.message)
          }

        }

        return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;