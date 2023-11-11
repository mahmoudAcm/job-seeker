import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth,
  getAuth,
  signInWithEmailAndPassword as signInWithEmailAndPasswordAuth,
  updateProfile as updateProfileAuth,
  User,
  signOut as signOutAuth
} from 'firebase/auth';
import { getDatabase, ref, set } from '@firebase/database';
import { FirebaseError } from '@firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyC6XvAbrKXfiB9IDeUQpjg3An4JkKxN5kE',
  projectId: 'job-seeker-ed293',
  databaseURL: 'https://job-seeker-ed293-default-rtdb.firebaseio.com/'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth };

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPasswordAuth(auth, email, password);
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (user: User, profile: { displayName?: string; photoURL?: string }) => {
  try {
    await updateProfileAuth(user, profile);
  } catch (error) {
    throw error;
  }
};

const createUserWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPasswordAuth(auth, email, password);

    // If the user was created successfully, update the user profile with the display name
    await updateProfile(userCredential.user, { displayName });

    // Save additional user information to the Realtime Database
    const userUid = userCredential.user.uid;
    const userRef = ref(database, `users/${userUid}`);
    await set(userRef, {
      email,
      displayName
      // Add other fields as needed
    });
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await signOutAuth(auth);
    console.log('User signed out successfully');
  } catch (error) {
    if (error instanceof FirebaseError) console.error('Error signing out:', error.message);
  }
};

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
