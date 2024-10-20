import React from 'react';
import Yandex from "../images/YandexLogo.svg";

function YandexAuth() {

    const handleAuthClick = () => {
        const clientId = "7fd395f0a6944763b7ef425780b76e24";
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}`;
    };

    return (
            <button className="RegistrationButton" onClick={() => handleAuthClick()}>
                <div className='RegistrationBlock_logo'><img src={Yandex} width='100%' alt={'Y'}/></div>
                <p>Войти через Yandex</p>
                {/*<div className='RegistrationBlock_logo'></div>*/}
            </button>
    );
}

export default YandexAuth;
