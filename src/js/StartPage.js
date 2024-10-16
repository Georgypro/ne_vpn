import React, {useEffect, useState} from 'react';
import '../css/App.css';
import '../languages/i18n';
import '../css/Content.css';
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import logo from "../images/logo.svg";
import SignInButton from "../registration/SignInButton";
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
        <div>
            <div className="Content" style={{marginTop: '30px'}}>
                <h1 id="TitleSite">GOSTLINK</h1>
                <img style={{marginLeft:'5px'}} src={logo} id="LogoSite"/>
            </div>
            <div className="Content" style={{height: '5vh', marginBottom: '30px', marginTop: '10px'}}>
                <span id="DescriptionSite">Самый быстрый в обитаемой вселенной!</span>
            </div>
            <div className="Content ColumnContent" style={{alignItems: "flex-start", marginBottom: '20px'}}>
                <div id="Description">
                    {descriptions.map((item, index) => (
                        <div className="DescriptionElement" key={index}>
                            <div className="TitleDescription" onClick={() => handleToggle(index)}>
                                <h1>{item.title}</h1>
                                <GoChevronRight color='#93959E'
                                                className={`icon ${activeIndex === index ? 'rotated' : ''}`}/>
                            </div>
                            <div className={`DescriptionText ${activeIndex === index ? 'active' : ''}`}>
                                <p style={{marginBottom: '0'}}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div id="RegistrationBlock">
                    <span>Войти с помощью:</span>
                    <SignInButton/>
                    <div style={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <hr className='Line'/>
                        <p style={{margin: '10px'}}>или</p>
                        <hr style={{rotate: '180deg'}} className='Line'/>
                    </div>

                    <YandexAuth/>
                </div>
            </div>
        </div>
    );
}

export default StartPage;
