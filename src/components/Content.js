import React, {useEffect, useState} from 'react';
import './Content.css';
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import logo from "../logo.svg";
import SignInButton from "../registration/SignInButton";
import {useNavigate} from "react-router-dom";

function Content() {
    const {t} = useTranslation();
    const descriptions = t('Description', {returnObjects: true});
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {

        const token = localStorage.getItem("yandexToken");
        const isAuth = localStorage.getItem("isYandexAuth") === "true";

        if (token && isAuth) { // todo also check mail, photo and uid
            // Если токен и состояние авторизации сохранены, используем их
            navigate('/shop')
        }
    }, []);

    // Initialize Yandex Auth button
    useEffect(() => {
        window.YaAuthSuggest.init(
            {
                client_id: "7fd395f0a6944763b7ef425780b76e24",
                response_type: "token",
                redirect_uri: "https://gostlink.ru/yauth"
            },
            "https://gostlink.ru",
            {
                view: "button",
                parentId: "buttonContainerId",
                buttonSize: 'm',
                buttonView: 'main',
                buttonTheme: 'dark',
                buttonBorderRadius: "22",
                buttonIcon: 'ya',
            }
        )
            .then(({handler}) => handler())
            .then(data => console.log('Сообщение с токеном', data))
            .catch(error => console.log('Обработка ошибки', error))
    }, []);

        return (
            <>
                <div className="Content" style={{height: '15vh', marginTop: '30px'}}>
                    <img src={logo} id="LogoSite"/>
                    <h1 id="TitleSite">GOSTLINK</h1>
                </div>
                <div className="Content" style={{height: '5vh', marginBottom: '10px', marginTop: '10px'}}>
                    <h2 id="DescriptionSite">Самый быстрый в обитаемой вселенной!</h2>
                </div>
                <div className="Content" style={{alignItems: "flex-start", marginBottom: '20px'}}>
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

                    <div id="RegistrationBlock" style={{width:'100%'}}>
                        <span>Войти с помощью</span>
                        <SignInButton/>
                        <div id="buttonContainerId"></div>
                    </div>
                </div>
            </>
        );
}

export default Content;
