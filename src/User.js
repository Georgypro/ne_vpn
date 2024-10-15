import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import { useNavigate } from "react-router-dom";
import DefaultProfilePhoto from "./profile.svg";
import './css/custom-toast.css';
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
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                    {localStorage.getItem('email')}
                </p>
                {localStorage.getItem('subscriptionIsActive') === 'true' ? (
                    <p style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        Подписка до: {localStorage.getItem('expirationDate')}
                    </p>
                ) : (
                    <p style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        {localStorage.getItem('expirationDate')}
                    </p>
                )}
                <p style={{ color: 'lightgray', fontStyle: 'italic', textDecoration: 'underline', fontSize: '14px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    сменить аккаунт
                </p>
            </div>

            <div
                style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    marginLeft: '30px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/profile')}
            >
                {!imageExists ? (
                    <img src={DefaultProfilePhoto} alt="Profile" style={{ width: '90%', height: '90%', borderRadius: '50%' }} />
                ) : (
                    <img
                        src={photoUrl}
                        alt="Profile"
                        style={{ width: '90%', height: '90%', borderRadius: '50%' }}
                    />
                )}
            </div>
        </div>
    );
}

export default User;
