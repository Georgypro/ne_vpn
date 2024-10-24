
import React, {useEffect} from 'react';
import '../languages/i18n';
import {useNavigate} from "react-router-dom";
import './PanelStyle.css'


function SplashVoodoo() {
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoginData();
    }, []);

    const fetchLoginData = () => {

        const tokenData = {
            refreshToken: localStorage.getItem("refreshToken"),
        };

        fetch(`https://gostlink.ru/api/auth/refreshToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenData),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        navigate('/panel-login');
                    });
                }

                return response.text();
            })
            .then(text => {
                console.log(text);
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate('/panel-search');
            })
            .catch(error => {
                console.error('Fetch error:', error.message);
                navigate('/panel-login');
            });

    };




    return (
        <div className="panel-main">
            <div className="panel-container">
                <div className="panel-block">
                    <span>WAIT A SECOND, MEAT!</span>
                </div>
            </div>
        </div>
    );
}

export default SplashVoodoo;
