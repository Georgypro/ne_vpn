import React from 'react';
import '../css/App.css';
import '../languages/i18n';
import '../css/custom-toast.css';
import 'react-toastify/dist/ReactToastify.css';
import {FaTelegramPlane} from "react-icons/fa";
import {IoIosMail} from "react-icons/io";

function Signature() {

    const formatEmail = (email) => {
        return email
            .replace(/@/g, '7ARH5OdXUl8erAZv')
            .replace(/\./g, '4wIPiFXwd91gLO84');
    };

    const email = formatEmail(localStorage.getItem('email'));

    return (
        <div className="signateiner" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
            <hr className='full-line'/>
            <div className="support" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                 onClick={() => window.open('https://t.me/gostlink_support_bot?start=' + email, '_blank')}>
                <span style={{
                    color: "white",
                    fontStyle: 'italic',
                    fontSize: '16px',
                    marginRight: '10px',
                    textDecoration: 'underline'
                }}>Написать в круглосуточную поддержку </span>
                <FaTelegramPlane style={{color: 'white'}}/>
            </div>

            <div className="support" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                 onClick={() => window.location.href = 'mailto:info@gostlink.ru'}
            >
                <span style={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontSize: '16px',
                    marginRight: '10px',
                    textDecoration: 'underline'
                }}>Написать на почту info@gostlink.ru </span>
                <IoIosMail style={{color: 'white'}}/>
            </div>

            <span style={{color: '#999999', fontStyle: 'italic', fontSize: '16px', marginRight: '10px', marginTop: '10px'}}>© 2021 — 2024 ООО "Каннт"</span>
            <span style={{
                color: '#999999',
                fontStyle: 'italic',
                fontSize: '16px',
                marginRight: '10px',
                marginBottom: '20px'
            }}>ИНН: 4011033196</span>
        </div>
    );
}

export default Signature;
