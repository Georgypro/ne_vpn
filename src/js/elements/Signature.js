import React from 'react';
import '../../css/Signature.css';
import '../../languages/i18n';
import 'react-toastify/dist/ReactToastify.css';
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function Signature() {

    const handleTelegramClick = () => {
        const formatEmail = (email) => btoa(email);
        const email = localStorage.getItem('email');
        const encodedEmail = email ? formatEmail(email) : '';
        window.open('https://t.me/gostlink_support_bot?start=' + encodedEmail, '_blank');
    };

    return (
        <div className="signature">
            <hr className='full-line'/>
            <div className="support" onClick={handleTelegramClick}>
                <span>Написать в круглосуточную поддержку </span>
                <FaTelegramPlane style={{color: 'white'}}/>
            </div>

            <div className="support" onClick={() => window.location.href = 'mailto:info@gostlink.ru'}>
                <span>Написать на почту info@gostlink.ru </span>
                <IoIosMail style={{color: 'white'}}/>
            </div>
            <div className="company-info">
                <span>© 2021 — 2024 ООО "Каннт" </span>
                <span> ИНН: 4011033196</span><br/>
            </div>

            <div className="company-files" onClick={() => window.open('https://gostlink.ru/docs/oferta_kannt.pdf', '_blank')}>
                <span >публичная офера</span>
            </div>
        </div>
    );
}

export default Signature;
