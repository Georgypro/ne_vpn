import { signInWithGoogle } from '../registration/firebase.js';
import { useNavigate } from 'react-router-dom';
import Google from "../GoogleLogo.svg"

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
            providerId: userData.providerData[0].providerId,
            referralCode: localStorage.getItem('promo')
        };

        fetch(`https://gostlink.ru/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(text => {
                console.log(text);  // Log the raw text response
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    localStorage.setItem('expirationDate', data.expirationDate);
                    localStorage.setItem('subscriptionIsActive', data.subscriptionIsActive);
                    localStorage.setItem('isYandexAuth', "false");

                    if (data.subscriptionIsActive === true){
                        navigate(`/profile`);
                    } else {
                        navigate(`/shop`);
                    }

                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };

        return (
            <button className="RegistrationButton" onClick={handleGoogleSignIn}>
                <div className='RegistrationBlock_logo'><img src={Google} width='100%'/></div>
                <p>Войти через Google</p>
                <div className='RegistrationBlock_logo'></div>
            </button>
        )
};

export default SignInButton;
