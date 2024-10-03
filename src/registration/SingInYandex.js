// SignInButton.jsx
import React from 'react';

const SignInYandex = () => {
    const handleYandexSignIn = () => {
        window.YaAuthSuggest.init(
            {
                client_id: "7fd395f0a6944763b7ef425780b76e24",
                response_type: "token",
                redirect_uri: "https://gostlink.ru"
            },
            "https://gostlink.ru",
            { view: "default" }
        )
            .then(({ handler }) => handler())
            .then(data => console.log('Сообщение с токеном', data))
            .catch(error => console.log('Обработка ошибки', error));
    };

    return (
        <button onClick={handleYandexSignIn}>
            Sign in with Yandex
        </button>
    );
};

export default SignInYandex;
