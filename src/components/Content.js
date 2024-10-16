import React, {useEffect, useState} from 'react';
import './Content.css';
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import logo from "../logo.svg";
import SignInButton from "../registration/SignInButton";
import {useLocation, useNavigate} from "react-router-dom";
import Yandex from "../YandexLogo.svg";
import YandexAuth from "../registration/YandexAuth";

function Content() {
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
            <>
                <div className="Content" style={{marginTop: '30px'}}>
                    <h1 id="TitleSite">GOSTLINK</h1>
                    <img style={{marginLeft:'20px'}} src={logo} id="LogoSite"/>
                </div>
                <div className="Content" style={{height: '5vh', marginBottom: '30px', marginTop: '10px'}}>
                    <h2 id="DescriptionSite">Самый быстрый в обитаемой вселенной!</h2>
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
                        <h2>Войти с помощью:</h2>
                        <SignInButton/>
                        <div style={{
                            width: '50%',
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
            </>
        );
}

export default Content;
