import React, { useState, useEffect } from 'react';
import '../../css/App.css';
import '../../css/User.css';
import '../../languages/i18n';
import { useNavigate } from "react-router-dom";
import DefaultProfilePhoto from "../../images/profile.svg";
import 'react-toastify/dist/ReactToastify.css';

function User() {

    const navigate = useNavigate();
    const [imageExists, setImageExists] = useState(false);
    const photoUrl = localStorage.getItem('photoURL');

    useEffect(() => {
        const checkImage = (url) => {
            const img = new Image();
            img.onload = () => setImageExists(true);
            img.onerror = () => setImageExists(false);
            img.src = url;
        };

        if (photoUrl) {
            checkImage(photoUrl);
        } else {
            setImageExists(false);
        }
    }, [photoUrl]);

    return (
        <div className="container">
            <div className="text-right">
                <p className="text-white" onClick={() => navigate('/profile')}>
                    {localStorage.getItem('email')}
                </p>
                {localStorage.getItem('subscriptionIsActive') === 'true' ? (
                    <p className="text-white" onClick={() => navigate('/profile')}>
                        Подписка до: {localStorage.getItem('expirationDate')}
                    </p>
                ) : (
                    <p className="text-white" onClick={() => navigate('/profile')}>
                        {localStorage.getItem('expirationDate')}
                    </p>
                )}
                <p className="text-lightgray" onClick={() => navigate('/')}>
                    сменить аккаунт
                </p>
            </div>

            <div className="profile-picture" onClick={() => navigate('/profile')}>
                {!imageExists ? (
                    <img src={DefaultProfilePhoto} alt="Profile" className="profile-image" />
                ) : (
                    <img
                        src={photoUrl}
                        alt="Profile"
                        className="profile-image"
                    />
                )}
            </div>
        </div>
    );
}

export default User;
