import React, {useEffect, useState} from 'react';
import '../css/StartPage.css';
import '../languages/i18n';
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import logo from "../images/logo.svg";
import SignInButton from "./elements/SignInButton";
import {useLocation, useNavigate} from "react-router-dom";
import Yandex from "../images/YandexLogo.svg";
import YandexAuth from "../registration/YandexAuth";

function StartPage() {
    const {t} = useTranslation();
    const descriptions = t('Description', {returnObjects: true});
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('promo', token);
        }
    }, [location.search]);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='page-block'>
            <div id='header-site'>
                <div style={{display: 'flex', flexDirection: 'row', gap: '30px'}}>
                    <h1 id="title-site">GOSTLINK</h1>
                    <img src={logo} id="logo-site"/>
                </div>
                <span id="description-site">Самый быстрый в обитаемой вселенной!</span>
            </div>
            <div className="content">
                <div id="description">
                    {descriptions.map((item, index) => (
                        <div className="description-element" key={index}>
                            <div className="title-description" onClick={() => handleToggle(index)}>
                                <h1>{item.title}</h1>
                                <GoChevronRight className={`icon ${activeIndex === index ? 'rotated' : ''}`}/>
                            </div>
                            <div className={`description-text ${activeIndex === index ? 'active' : ''}`}>
                                <p style={{marginBottom: '0'}}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div id="registration-block">
                    <h2>Войти с помощью:</h2>
                    <SignInButton/>
                    <div style={{margin: '10px', width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <hr className='line'/>
                        <span>или</span>
                        <hr style={{rotate: '180deg'}} className='line'/>
                    </div>
                    <YandexAuth/>
                </div>
            </div>
        </div>
    );
}

export default StartPage;
