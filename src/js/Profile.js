import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../languages/i18n';
import {FaAndroid, FaApple, FaDesktop, FaGhost, FaLinux, FaPlus, FaMicrosoft} from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePhoto from '../images/profile.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './elements/User';
import {color} from "framer-motion";
import {SiMacos} from "react-icons/si";
import {IoIosArrowForward, IoLogoAndroid} from "react-icons/io";
import {MdDiscount} from "react-icons/md";

function Profile() {
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [availableDevices, setAvailableDevices] = useState(0);

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchLoginData(requestData);
    }, []);

    const fetchLoginData = (requestData) => {
        fetch(`https://gostlink.ru/api/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.text())
            .then((text) => {
                if (text) {
                    const data = JSON.parse(text);
                    if (data.success) {
                        localStorage.setItem('expirationDate', data.userInfo.expirationDate);
                        localStorage.setItem('subscriptionIsActive', data.userInfo.subscriptionIsActive);
                        setUserData(data.userInfo)
                        setDeviceData(data.devices);
                        setAvailableDevices(data.availableDevices);
                        console.log(data)
                    } else {
                        // Handle failure
                    }
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle error
            });
    };

    const fetchUnblockDevice = (id, name) => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
            deviceId: id,
        };

        fetch(`https://gostlink.ru/api/profile/detachDevice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.text())
            .then((text) => {
                const data = JSON.parse(text);
                if (data.success) {
                    setDeviceData(data.devices);
                    setAvailableDevices(data.availableDevices);
                    console.log(data)
                    toast.success(`${name} откреплен.`);

                } else {
                    navigate(`/`);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };

    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'android':
                return <IoLogoAndroid size='100%'/>;
            case 'ios':
                return <FaApple size='100%' />;
            case 'desktop':
                return <FaDesktop size='100%' />;
            default:
                return <FaGhost size='100%' />;
        }
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} - ${minutes}:${hours}`;
    };

    return (
        <div className="container-main">
            <ToastContainer toastStyle={{ color: '#fff', backgroundColor: '#333' }} />
            <User/>
            {deviceData.length > 0 || availableDevices > 0 ? (
                <div style={{width: '100%'}}>
                    {userData.subscriptionIsActive ? (
                        <div style={{width: '100%'}}>
                            <span className="device-title">
                                Следующее списание {userData.amount} {userData.currency}
                            </span>
                            {/*<div className="device-box" onClick={() => navigate('/promo')}>*/}
                            {/*    <div className="device-flex" >*/}
                            {/*        <div className="device-icon">*/}
                            {/*            <MdDiscount size='100%'/>*/}
                            {/*        </div>*/}
                            {/*        <div className="device-info">*/}
                            {/*            <span className="device-title" style={{fontStyle: 'italic'}}>*/}
                            {/*                Пользуйся сервисом бесплатно!*/}
                            {/*            </span> <br/>*/}
                            {/*            <span className="device-subtext" style={{fontStyle: 'italic'}}>*/}
                            {/*                твоя текущая скидка {userData.discount}%*/}
                            {/*            </span>*/}
                            {/*        </div>*/}
                            {/*        <div className="device-icon">*/}
                            {/*            <IoIosArrowForward size='100%'/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    ) : (
                        <></>
                    )}

                    {availableDevices > 0 ? (
                        <div className="device-box">
                            <span className="device-subtext" style={{color: 'black', fontStyle: 'italic'}}>
                                у тебя {availableDevices} не активированных устройств
                            </span> <br/>
                            <span className="device-title">
                                Скачать приложение
                            </span> <br/>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '15px'}}>
                                {/*TODO: add links to install files*/}
                                <IoLogoAndroid size={66} color="#222222" onClick={() => window.open('https://gostlink.ru/get/apps/gostlink.apk', '_blank')}/>
                                <FaMicrosoft size={48} color="#777777" onClick={() => toast('Приложение для этой платформы в разработке')}/>
                                <FaApple size={48} color="#777777" onClick={() => toast('Приложение для этой платформы в разработке')}/>
                                <FaLinux size={48} color="#777777" onClick={() => toast('Приложение для этой платформы в разработке')}/>
                                <SiMacos size={60} color="#777777" onClick={() => toast('Приложение для этой платформы в разработке')}/>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {deviceData.length > 0 ? (
                        <ul style={{listStyleType: 'none', margin: '0', padding: '0', width: '100%'}}>
                            {deviceData.map((device) => (
                                <li key={device.id} className="device-item" style={{width: '100%'}}>
                                    <div className="device-box">
                                        <div className="device-flex">
                                            <div className="device-icon">
                                                {getPlatformIcon(device.platform)}
                                            </div>
                                            <div className="device-info">
                                                <span className="device-title">
                                                    {device.deviceName.length > 20 ? `${device.deviceName.slice(0, 17)}...` : device.deviceName}
                                                </span> <br/>
                                                <span className="device-subtext">
                                                    {device.deviceId.slice(0, 16)} - {formatDateTime(device.firstActivation)}
                                                </span>
                                            </div>
                                            <div className="device-icon">
                                                <ImCross size='50%' onClick={() => fetchUnblockDevice(device.id, device.deviceName)}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <></>
                    )}

                    {availableDevices === 0 && availableDevices < 5 ? (
                        <div onClick={() => toast.error('Изменение подписки с добавлением нового устройства. Не работает с тестовым эквайрингом.')}>
                            <div className="device-box">
                                <div className="device-flex">
                                    <div className="device-icon">
                                        <FaPlus size='80%'/>
                                    </div>
                                    <div className="device-info">
                                        <span className="device-title" style={{fontStyle: 'italic'}}>
                                            Добавить устройство?
                                        </span> <br/>
                                        <span className="device-subtext" style={{fontStyle: 'italic'}}>
                                            +128 рублей в месяц к подписке
                                        </span>
                                    </div>
                                    <div className="device-icon">
                                        <IoIosArrowForward size='100%'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <>
                    { deviceData.length > 0 ? (
                        <div className='device-box'>
                            <span>
                                Нет активных устройств
                            </span> <br/>
                            <button className='button_dark' onClick={() => {navigate('/shop')}}>
                                Перейти в магазин
                            </button>
                        </div>
                    ) : (
                        <span>Loading...</span>
                    )}
                </>
            )}
        </div>
    )
        ;
}

export default Profile;
