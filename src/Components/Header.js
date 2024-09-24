import React, { useState, useEffect } from 'react';
import "./Header.css";
import { useTranslation } from "react-i18next";




const FullWidthBlock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 650) {
                setIsOpen(false); // Автоматически скрывает меню при увеличении экрана
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleItems = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const { t } = useTranslation();


    return (
        <div id="Header_body">

            <div id="Header" className={`full-width-block ${isOpen ? 'expanded' : 'collapsed'}`} onMouseLeave={closeMenu}>
                <div id="Media_block">
                    <p id="Name_US">?VPN</p>
                    <button id="Menu_button" className={`toggle-button ${isOpen || windowWidth > 650 ? 'hide' : ''}`} onClick={toggleItems}>
                        {isOpen ? t('Header.Close') : t('Header.Menu')}
                    </button>
                </div>

                <div id="Link_block" className={`items-list ${isOpen || windowWidth > 650 ? 'show' : ''}`}>
                    <a href="#" className="Link" onClick={closeMenu}>
                        <p>{t('Header.About')}</p>
                    </a>
                    <a href="#" className="Link" onClick={closeMenu}>
                        <p>{t('Header.Services')}</p>
                    </a>
                    <a href="#" className="Link" onClick={closeMenu}>
                        <p>{t('Header.Contacts')}</p>
                    </a>
                </div>
            </div>
            <div id="Header_border"></div>
        </div>
    );
};

export default FullWidthBlock;