import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEFROU_qKelvSPkEZBmCCc5FxeGruirTo",
  authDomain: "crypto-connect-c6c31.firebaseapp.com",
  projectId: "crypto-connect-c6c31",
  storageBucket: "crypto-connect-c6c31.appspot.com",
  messagingSenderId: "981600023666",
  appId: "1:981600023666:web:c41d180a0f2ccc03adbeeb",
  measurementId: "G-Z4RB83BM4J",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

//GOOGLE
const provider = new firebase.auth.GoogleAuthProvider();
// We want to trigger the google pop whenever we use the GoogleAuthProvider
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider).catch(function (error) {
  console.error(error);
});

//GITHUB
const providerTwo = new firebase.auth.GithubAuthProvider();
// We want to trigger the google pop whenever we use the GoogleAuthProvider
providerTwo.setCustomParameters({ prompt: "select_account" });
export const signInWithGithub = () => auth.signInWithPopup(providerTwo).catch(function (error) {
  console.error(error);
});

//TWITTER
const providerThree = new firebase.auth.TwitterAuthProvider();
// We want to trigger the google pop whenever we use the GoogleAuthProvider
providerThree.setCustomParameters({ prompt: "select_account" });
export const signInWithTwitter = () => auth.signInWithPopup(providerThree).catch(function (error) {
  console.error(error);
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //If the userAuth object doesn't exist, we don't want to run the function
  if (!userAuth) return;

  // Get a reference to the place in the database where the user is stored
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  //We are creating the user data.
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }
  return getUserDocumentRef(userAuth.uid);
};

export const getUserDocumentRef = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.doc(`users/${uid}`);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
