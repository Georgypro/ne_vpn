import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../languages/i18n';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "./elements/User";
import { QRCodeCanvas } from 'qrcode.react';
import { PiStarFourFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import {ImCross} from "react-icons/im";

function Promo() {

    const navigate = useNavigate();
    const [Refferal, setRefferal] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .catch((error) => {
                console.error('Failed to copy: ', error);
            });
        toast.success("Скопировано в буфер обмена");
    };

    const handleShareQr = async (shareMessage, shareUrl) => {
        try {
            const canvas = document.querySelector('.qr-code > canvas');
            const imageUrl = canvas.toDataURL('image/png');

            if (navigator.share) {
                await navigator.share({
                    title: 'Поделиться',
                    text: shareMessage,
                    url: shareUrl,
                    files: [new File([await fetch(imageUrl).then(r => r.blob())], 'gostlink_qr.png', { type: 'image/png' })],
                });
            } else {
                toast.error('Ваше устройство не поддерживает функцию "Поделиться".');
            }
        } catch (error) {
            toast.error('Ошибка при попытке поделиться:', error);
        }
    };

    const handleShare = async (shareMessage, shareUrl) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Поделиться',
                    text: shareMessage,
                    url: shareUrl,
                });
            } else {
                toast.error('Ваше устройство не поддерживает функцию "Поделиться".');
            }
        } catch (error) {
            toast.error('Ошибка при попытке поделиться:', error);
        }
    };

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchPromo(requestData);
    }, []);

    const handleDownload = () => {
        const canvas = document.querySelector('.qr-code > canvas');
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'gostlink_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fetchPromo = (requestData) => {
        fetch(`https://gostlink.ru/api/profile/getReferralCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.text())
            .then(text => {
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                if (data.success) {
                    localStorage.setItem('referral', data.referralCode);
                    setRefferal(data.referralCode);
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };

    return (
        <div className="container-main">
            <ToastContainer toastStyle={{ color: '#ffffff', backgroundColor: '#333333' }} />
            <User />
            {Refferal.length > 10 ? (
                <div style={{width: '100%'}}>
                    <div className="device-box">
                        <div className="device-flex">
                            <div className="device-icon">
                                <BsStars size='100%'/>
                            </div>
                            <span className="device-description">
                                Приглашай друзей и получай скидку вплоть до 100% к платежам за подписку!
                            </span>
                        </div>
                    </div>

                    <div className="device-box">
                        <div className="device-flex">
                            <div className="device-icon">
                                <h2>1</h2>
                            </div>
                            <span className="device-description">
                                Поделись своей уникальной ссылкой-приглашением в сервис GOSTLINK со знакомым, друзьями или семьей
                            </span>
                        </div>
                    </div>

                    <div className="device-box">
                        <div className="device-flex">
                            <div className="device-icon">
                                <h2>2</h2>
                            </div>
                            <span className="device-description">
                                    Когда твой приглашенный начнет пользоваться сервисом, ты получишь скидку на оплату подписки в 25% от полной стоимости
                            </span>
                        </div>
                    </div>

                    <div className="device-box">
                        <div className="device-flex">
                            <div className="device-icon">
                                <h2>3</h2>
                            </div>
                            <span className="device-description">
                                    Скидки от нескольких приглашенных складываются (не более 100%), время проведения акции не ограничено
                            </span>
                        </div>
                    </div>

                    <div className="device-box">
                        <div className="device-flex flex-change" style={{justifyContent: 'center', gap: '30px'}}>
                            <div className="qr-code" onClick={() => handleShareQr("Сервис gostlink для безопасного и быстрого доступа в интернет ", "https://gostlink.ru/?token=" + Refferal)}>
                                <QRCodeCanvas
                                    value={"https://gostlink.ru/?token=" + Refferal}
                                    size={256} /* Размер, который будет подстраиваться */
                                    bgColor={"#FFFFFF"}
                                    fgColor={"#000000"}
                                    level={"H"}
                                    marginSize={4}
                                />
                            </div>
                            <div style={{textAlign: 'center', width: '200px'}}>
                                <button className='button_dark' onClick={() => handleShare("Сервис gostlink для безопасного и быстрого доступа в интернет ", "https://gostlink.ru/?token=" + Refferal)}>
                                    Поделиться
                                </button>
                                <button className='button_dark' onClick={() => copyToClipboard("https://gostlink.ru/?token=" + Refferal)}>
                                    Скопировать ссылку
                                </button>
                                <button className='button_dark' onClick={handleDownload}>
                                    Скачать QR код
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Загрузка...</div>
            )}
        </div>
    );
}

export default Promo;
