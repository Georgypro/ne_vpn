import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import Pricing from "./Pricing";
import {useNavigate} from "react-router-dom";

function ShopVMobile() {
    const [isValues, setIsValues] = useState(false);
    const navigate = useNavigate();

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

        const requestData = {
            uid: uid,
            email: email,
            photoURL: photoURL,
            providerId: providerId,
        };

        fetchLoginData(requestData);

    }, []);


    const fetchLoginData = (requestData) => {

        fetch(`https://gostlink.ru/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                console.log(requestData)
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
                    setIsValues(true);
                    localStorage.setItem('expirationDate', data.expirationDate);
                    localStorage.setItem('subscriptionIsActive', data.subscriptionIsActive);
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };

    useEffect(() => {
        // Dynamically load CloudPayments widget script
        const script = document.createElement('script');
        script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            { isValues ? (
                    <Pricing/>
            ) : (
                <h1>Loading...</h1>
            )}

        </div>
    );
}

export default ShopVMobile;