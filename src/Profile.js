import React, { useState, useEffect } from 'react';
import './App.css';
import './css/button.css'
import './languages/i18n';
import { FaAndroid, FaApple, FaGhost, FaPlus, FaWindows } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePhoto from './profile.svg';
import './css/custom-toast.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './User';
import {color} from "framer-motion";

function Profile() {
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState([]);

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
                        setDeviceData(data.devices);
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
                return <FaWindows size={48} color="#222" />;
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

                {deviceData.length ? (
                    <div>
                        <ul>
                            {deviceData.map((device) => (
                                <li key={device.id} className="device-item">
                                    <div className="device-box">
                                        {device.deviceName === '' ? (
                                            <div className="device-flex">
                                                <div className="device-icon">{getPlatformIcon(device.platform)}</div>
                                                <div className="device-info">
                                                    <p className="device-name">Доступно новое устройство</p>
                                                    <p className="device-subtext">скачать приложение</p>
                                                </div>
                                                <div className="device-cross">
                                                    {/* Uncomment this line if needed */}
                                                    {/* <ImCross onClick={() => fetchUnblockDevice(device.id, device.deviceName)} /> */}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="device-flex">
                                                <div className="device-icon">{getPlatformIcon(device.platform)}</div>
                                                <div className="device-info">
                                                    <p className="device-name">
                                                        {device.deviceName.length > 20 ? `${device.deviceName.slice(0, 17)}...` : device.deviceName}
                                                    </p>
                                                    <p className="device-subtext">
                                                        {device.deviceId.slice(0, 16)} - {formatDateTime(device.firstActivation)}
                                                    </p>
                                                </div>
                                                <div className="device-cross">
                                                    <ImCross onClick={() => fetchUnblockDevice(device.id, device.deviceName)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="device-box" onClick={() => toast.error('ОТКРЫЛАСЯ ДОКУПОЧКА')}>
                            <div className="device-flex">
                                <div className="device-icon">
                                    <FaPlus size={42} />
                                </div>
                                <div className="device-info">
                                    <p className="device-name">Добавить новое устройство?</p>
                                    <p className="device-subtext">+128 рублей в месяц к подписке</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{color:'black', alignItems:'center', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '20px', maxWidth: '700px', margin: 'auto', borderRadius: '20px'}}>
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
