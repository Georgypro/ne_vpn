import React, { useState } from 'react';
import './Content.css';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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

    return (
        <div id="Content">
            <div id="Description">
                {descriptions.map((item, index) => (
                    <div className="DescriptionElement" key={index}>
                        <div className="TitleDescription" onClick={() => handleToggle(index)}>
                            <h1>{item.title}</h1>
                            <FaAngleRight color='#93959E'  className={`icon ${activeIndex === index ? 'rotated' : ''}`} />
                        </div>
                        <div className={`DescriptionText ${activeIndex === index ? 'active' : ''}`}>
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div id="InteractionBlock">
                <div className="InteractionElement" style={{ transform: showAuthorization ? 'translateX(-100%)' : 'translateX(0)'}}>
                    <div id="Button" style={{width: '250px', height: '100px'}}>
                        <button onClick={handleGoClick}>
                            <p>Поехали</p>
                            <FaAngleRight color='E0E0E4' style={{position: 'absolute', right: '10px'}}/>
                        </button>
                    </div>
                </div>
                <div className="InteractionElement" style={{ transform: showAuthorization ? 'translateX(0)' : 'translateX(100%)' }}>
                    <div id="Authorization">
                        <h1>Авторизация</h1>
                        <table id="AuthTable">
                            <tr>
                                <td><h2>Укажите электронную почту:</h2></td>
                                <td><input type="email" /></td>
                            </tr>
                            <tr>
                                <td><h2>Придумайте пароль:</h2></td>
                                <td><input type="password" /></td>
                            </tr>
                            <tr>
                                <td><h2>Введите еще раз:</h2></td>
                                <td><input type="password" /></td>
                            </tr>
                        </table>

                        <div id="Button" style={{width: '300px', height: '60px'}}><button>
                            <p style={{fontSize: '20px'}}>Зарегистрироваться</p>
                        </button></div>
                        <div id="ButtonBack" onClick={handleBackClick}>
                            <FaAngleLeft size="20px"/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default BackgroundBlock;
