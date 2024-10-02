// Import necessary functions from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBozyBvVIp-eBNTwuhuVLjnP5JbNcrsbKY",
    authDomain: "gostlink-9396a.firebaseapp.com",
    projectId: "gostlink-9396a",
    storageBucket: "gostlink-9396a.appspot.com",
    messagingSenderId: "825578512245",
    appId: "1:825578512245:web:7f9a3e8f9efb68186ebd3c",
    measurementId: "G-BRTMLM4JJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Function to handle Google sign-in (if needed in this file)
export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const userData = result.user;
            console.log('User info from Google:', userData);
            return userData;  // Resolve the Promise with userData
        })
        .catch((error) => {
            console.error('Error during Google sign-in:', error);
            throw error;  // Reject the Promise with the error
        });
};
