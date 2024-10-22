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

    const goLogOut = () => {
        const data = {
            success: true,
            reason: 'no_reason'
        };
        navigate('/');
        window.kmpJsBridge.callNative(
            "LogOut",
            JSON.stringify(data),
            function (data) {
                document.getElementById("subtitle").innerText = data;
                console.log("Response from Native: " + data);
            }
        );
    }

    return (
        <div className="container">
            <div className="text-block">
                <p className="text-info" onClick={() => navigate('/profile')}>
                    {localStorage.getItem('email')}
                </p>
                {localStorage.getItem('subscriptionIsActive') === 'true' ? (
                    <p className="text-info" onClick={() => navigate('/profile')}>
                        Подписка до: {localStorage.getItem('expirationDate')}
                    </p>
                ) : (
                    <p className="text-info" onClick={() => navigate('/profile')}>
                        {localStorage.getItem('expirationDate')}
                    </p>
                )}
                <p className="text-lightgray" onClick={() => goLogOut()}>
                    сменить аккаунт
                </p>
            </div>

            <div className="profile-picture" onClick={() => navigate('/profile')}>
                {!imageExists ? (
                    <img src={DefaultProfilePhoto} alt="Profile" className="profile-image" />
                ) : (
                    <img src={photoUrl} alt="Profile" className="profile-image"/>
                )}
            </div>
        </div>
    );
}

export default User;
