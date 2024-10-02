import { signInWithGoogle } from '../registration/firebase.js';
import { useNavigate } from 'react-router-dom';

const SignInButton = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((userData) => {
                fetchLoginData(userData);  // Use userData after successful sign-in
            })
            .catch((error) => {
                console.error('Error during Google sign-in:', error);
                // Handle the error appropriately (e.g., show an error notification)
            });
    };


    const fetchLoginData = (userData) => {

        localStorage.setItem('uid', userData.uid);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('photoURL', userData.photoURL);
        localStorage.setItem('providerId', userData.providerData[0].providerId);

        const requestData = {
            uid: userData.uid,
            email: userData.email,
            photoURL: userData.photoURL,
            providerId: userData.providerData[0].providerId,  // access providerData correctly
        };

        fetch(`https://gostlink.ru/api/register`, {
            method: 'POST',
            headers: {
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    navigate(`/shop`);
                } else {
                    // Handle failure notification
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Navigate even on error
                navigate(`/shop`);
            });
    };

    return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export default SignInButton;
