import React, {useEffect, useState} from 'react';
import '../css/App.css';
import '../languages/i18n';
import Profile from "./Profile";

function ProfileVMobile() {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get('email');
        const uid = queryParams.get('uid');
        const photoURL = queryParams.get('photoURL');
        const providerId = queryParams.get('providerId');

        localStorage.setItem('uid', uid);
        localStorage.setItem('email', email);
        localStorage.setItem('photoURL', photoURL);
        localStorage.setItem('providerId', providerId);

        setIsLoaded(true);
    }, []);



    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {isLoaded ? (
                <Profile/>
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
}

export default ProfileVMobile;