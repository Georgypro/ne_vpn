
import React, {useEffect, useState} from 'react';
import '../languages/i18n';
import {useNavigate} from "react-router-dom";
import './PanelStyle.css'
import {FaEye, FaEyeSlash} from "react-icons/fa";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";


function LoginusPrima() {
    const navigate = useNavigate();
    const [Login, setLogin] = useState("");
    const [Password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState();

    const [showBlock, setShowBlock] = useState(false);
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
    const [captchaCalled, setCaptchaCalled] = useState(false);

    const reCaptchaSolved = () => {
        setCaptchaCalled(true);
        setShowBlock(true);
    };

    const fetchLoginData = () => {

        if (showBlock) {

            setIsLoading(true);
            const requestData = {
                username: Login,
                password: Password,
            };

            fetch(`https://gostlink.ru/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            setErrorMsg(text);
                            setIsLoading(false);
                            throw new Error(text);
                        });
                    }
                    return response.text();
                })
                .then(text => {
                    if (text) {
                        return JSON.parse(text);
                    }
                    return {};
                })
                .then(data => {
                    setErrorMsg("");
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    navigate('/panel-search');
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // setErrorMsg(error);
                    setIsLoading(false);
                });

        } else {
            setErrorMsg('reCAPTCHA not solved!');
        }
    };




return (
    <div className="panel-main">
        <div className="panel-container">
            {!captchaCalled && (
                <GoogleReCaptchaProvider reCaptchaKey="6LdY3WkqAAAAAIToOD7e2MMkB7etmffWQh4RJpMh">
                    <GoogleReCaptcha
                        className="google-recaptcha-custom-class"
                        onVerify={reCaptchaSolved}
                        refreshReCaptcha={refreshReCaptcha}
                    />
                </GoogleReCaptchaProvider>
            )}

            <div className="panel-block">
                <span>FOR INTERNAL USE ONLY!</span>

            </div>
            <div className="panel-block">
                <span>LOGIN</span>
                <input
                    type="text"
                    style={{width: '50%', margin: '0', marginLeft: '5%', marginBottom: '5px'}}
                    value={Login}
                    onChange={(e) => {
                        let newValue = e.target.value;
                        setLogin(newValue);
                    }}
                    inputMode="text"
                /><br/>
                <span>PASS</span>
                <input
                    type={showPassword ? "text" : "password"}
                    style={{width: '50%', margin: '0', marginLeft: '5%'}}
                    value={Password}
                    onChange={(e) => {
                        let newValue = e.target.value;
                        setPassword(newValue);
                    }}
                    inputMode="text"
                />
                {showPassword ?
                    <FaEyeSlash style={{color: 'white', height: '15px', marginLeft: '15px'}}
                                onClick={() => setShowPassword(!showPassword)}/> :
                    <FaEye style={{color: 'white', marginLeft: '15px', height: '15px'}}
                           onClick={() => setShowPassword(!showPassword)}/>}
                <br/>
                <button className="panel-button"
                        onClick={() => fetchLoginData()}
                        disabled={isLoading}>
                    {isLoading ? 'Загрузка...' : 'Поехали'}
                </button>
                { ErrorMsg ? (<><br/><span style={{color: 'red'}}>{ErrorMsg}</span></>) : (<></>)

                }
            </div>
        </div>
    </div>
);
}

export default LoginusPrima;
