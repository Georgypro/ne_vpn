import React, { useState } from 'react';
import './Content.css';
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Logo from "../Logo.svg";
// import Logo from "../Logo222222.svg";

function BackgroundBlock() {
    const { t } = useTranslation();
    const descriptions = t('Description', { returnObjects: true });
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


    const [showAuthorization, setShowAuthorization] = useState(false);

    const handleGoClick = () => {
        setShowAuthorization(true);
    };

    const handleBackClick = () => {
        setShowAuthorization(false);
    };





    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Некорректный формат электронной почты');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Пароль должен содержать минимум 8 символов, включая буквы и цифры');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Пароли не совпадают');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        setIsSubmitted(true);

        if (valid) {
            // Дальнейшая обработка данных
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (isSubmitted) {
            if (password !== e.target.value) {
                setConfirmPasswordError('Пароли не совпадают');
            } else {
                setConfirmPasswordError('');
            }
        }
    };

    return (
        <>
            <div className="Content" style={{height: '15vh', marginTop: '50px'}}>
                <img src={Logo} id="LogoSite"/>
                <h1 id="TitleSite">GOSTLINK</h1>
            </div>
            <div className="Content" style={{height: '5vh', marginBottom: '50px'}}>
                <h2 id="DescriptionSite">Что с тобой сделал интернет???????</h2>
            </div>
            <div className="Content" style={{alignItems: "flex-start", marginBottom: '20px'}}>
                <div id="Description">
                    {descriptions.map((item, index) => (
                        <div className="DescriptionElement" key={index}>
                            <div className="TitleDescription" onClick={() => handleToggle(index)}>
                                <h1>{item.title}</h1>
                                <GoChevronRight color='#93959E'  className={`icon ${activeIndex === index ? 'rotated' : ''}`} />
                            </div>
                            <div className={`DescriptionText ${activeIndex === index ? 'active' : ''}`}>
                                <p style={{marginBottom: '0'}}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div id="InteractionBlock">
                    <div className="InteractionElement" style={{ transform: showAuthorization ? 'translateX(-100%)' : 'translateX(0)'}}>
                        <div className="Button" style={{width: '350px', height: '200px'}}>
                            <button onClick={handleGoClick}>
                                <p style={{fontSize: '48px'}}>Поехали</p>
                                <GoChevronRight size='40px' color='E0E0E4' style={{position: 'absolute', right: '10px', marginTop: '10px'}}/>
                            </button>
                        </div>
                    </div>
                    <div className="InteractionElement" style={{ transform: showAuthorization ? 'translateX(0)' : 'translateX(100%)' }}>
                        <div id="Authorization">
                            <h1>Авторизация</h1>
                            <form onSubmit={handleSubmit} style={{ width: '100%', padding: '0', margin: '0' }}>
                                <table id="AuthTable">
                                    <tbody>
                                    <tr>
                                        <td><h2>Электронная почта:</h2></td>
                                        <td>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{emailError && <p>{emailError}</p>}</td>
                                    </tr>
                                    <tr>
                                        <td><h2>Введите пароль:</h2></td>
                                        <td style={{ position: 'relative' }}>
                                            <input type={showPassword ? 'text' : 'password'} value={password}
                                                onChange={(e) => setPassword(e.target.value)}/>
                                            <button className="PasswordButton" type="button" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <GoEye color='white' size='100%'/> : <GoEyeClosed color='white' size='100%'/>}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><p>{passwordError && <p>{passwordError}</p>}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h2>Введите еще раз:</h2></td>
                                        <td style={{ position: 'relative' }}>
                                            <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}/>
                                            <button className="PasswordButton" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                {showConfirmPassword ? <GoEye color='white' size='100%'/> : <GoEyeClosed color='white' size='100%'/>}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{confirmPasswordError && <p>{confirmPasswordError}</p>}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="Button" style={{ width: '350px', height: '60px' }}>
                                    <button type="submit">
                                        <p style={{ fontSize: '22px' }}>Зарегистрироваться</p>
                                    </button>
                                </div>
                            </form>
                            <div id="ButtonBack" onClick={handleBackClick}>
                                <GoChevronLeft size="20px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BackgroundBlock;
