import React, { useState, useEffect } from 'react';
import './App.css';
import './css/button.css'
import './css/block.css'
import './languages/i18n';
import {FaAndroid, FaApple, FaDesktop, FaGhost, FaLinux, FaPlus, FaWindows} from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePhoto from './profile.svg';
import './css/custom-toast.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './User';
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
        switch (platform) {
            case 'android':
                return <FaAndroid size={48} color="#222" />;
            case 'ios':
                return <FaApple size={48} color="#222" />;
            case 'desktop':
                return <FaDesktop size={48} color="#222" />;
            default:
                return <FaGhost size={48} color="#222" />;
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
        <div className="profile-container">
            <ToastContainer toastStyle={{ color: '#fff', backgroundColor: '#333' }} />
            <div className="profile-content">
                <User />

                {deviceData.length > 0 || availableDevices > 0 ? (
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>

                        {userData.subscriptionIsActive ? (
                            <div>
                                <span style={{marginTop: '10px'}}>Следующее списание {userData.amount} {userData.currency}</span>
                                <div className="device-box" onClick={() => navigate('/promo')}>
                                    <div className="device-flex" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}>
                                        <div className="device-icon" style={{
                                            marginLeft: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '0px'
                                        }}><MdDiscount size={48} color="#222"/>
                                        </div>
                                            <div className="device-info">
                                                <span style={{
                                                    color: 'black',
                                                    fontStyle: 'italic',
                                                    fontSize: '24px',
                                                    marginLeft: '10px'
                                                }}>
                                                        Пользуйся сервисом бесплатно!
                                                    </span> <br/>
                                                <span style={{
                                                    color: '#222222',
                                                    fontStyle: 'italic',
                                                    fontSize: '18px',
                                                    margin: '4px'
                                                }} >твоя текущая скидка {userData.discount}%</span>
                                            </div>
                                            <div className="device-icon" style={{
                                                marginLeft: '20px',
                                                marginRight: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '0px'
                                            }}><IoIosArrowForward size={48} color="#222"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ) : (<></>
                        )}

                        {availableDevices > 0 ? (
                            <div className="device-box">
                                <span style={{
                                    color: 'black',
                                    fontStyle: 'italic',
                                    fontSize: '18px'
                                }}>
                                    у тебя {availableDevices} не активированных устройств
                                </span> <br/>
                                <span>Скачай приложение</span> <br/>
                                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                    {/*TODO: add links to install files*/}
                                    <IoLogoAndroid size={66} color="#222" style={{marginRight: '15px'}}/>
                                    <FaWindows size={48} color="#222" style={{marginRight: '15px'}}/>
                                    <FaApple size={48} color="#222" style={{marginRight: '15px'}}/>
                                    <FaLinux size={48} color="#222" style={{marginRight: '15px'}}/>
                                    <SiMacos size={60} color="#222" style={{marginRight: '15px'}}/>
                                </div>

                            </div>
                        ) : (<></>)}

                        {deviceData.length > 0 ? (
                            <ul style={{listStyleType: 'none', margin: '0', padding: '0'}}>
                                {deviceData.map((device) => (
                                    <li key={device.id} className="device-item">
                                        <div className="device-box">
                                            <div className="device-flex" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '100%'
                                            }}>
                                                <div className="device-icon" style={{
                                                    marginLeft: '30px',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    {getPlatformIcon(device.platform)}
                                                </div>
                                                <div className="device-info">
                                                    <p className="device-name" style={{margin: '4px'}}>
                                                        {device.deviceName.length > 20 ? `${device.deviceName.slice(0, 17)}...` : device.deviceName}
                                                    </p>
                                                    <p className="device-subtext" style={{
                                                        color: '#222222',
                                                        fontStyle: 'italic',
                                                        fontSize: '18px',
                                                        margin: '4px'
                                                    }}>
                                                        {device.deviceId.slice(0, 16)} - {formatDateTime(device.firstActivation)}
                                                    </p>
                                                </div>
                                                <div className="device-cross" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginRight: '30px'
                                                }}>
                                                    <ImCross
                                                        onClick={() => fetchUnblockDevice(device.id, device.deviceName)}/>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (<></>)}

                        <div onClick={() => toast.error('ОТКРЫЛАСЯ ДОКУПОЧКА')}>
                            <div className="device-box"
                                 style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                                <div className="device-icon">
                                    <FaPlus size={42} style={{marginLeft: '20px', marginRight: '20px'}}/>
                                </div>
                                <div className="device-info" style={{marginLeft: '40px', marginRight: '40px'}}>
                                    <p className="device-name" style={{margin: '10px'}}>Добавить новое устройство?</p>
                                    <p className="device-subtext"
                                       style={{fontSize: '18px', color: '#222222', fontStyle: 'italic', margin: '8px'}}>+128 рублей в месяц к подписке</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='block'>
                        <span >Нет активных устройств</span> <br/>
                        <button
                            className='button_dark'
                            onClick={() => {navigate('/shop')}}>
                            Перейти в магазин
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
