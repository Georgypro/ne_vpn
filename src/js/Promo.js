import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../languages/i18n';
import { useNavigate } from "react-router-dom";
import '../css/custom-toast.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "./User";
import { QRCodeCanvas } from 'qrcode.react';
import { PiStarFourFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";

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
                    <div className="row-main">
                        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <div className="device-box">
                                <div className="device-flex" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                    <div className="device-icon" style={{
                                        marginLeft: '15px',
                                        marginRight: '15px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <BsStars height="100%" width="100%"/>
                                    </div>
                                        <span style={{marginRight: '30px', fontSize: '12pt'}}>Приглашай друзей и получай скидку вплоть до 100% к платежам за подписку!</span>
                                    </div>
                                </div>

                                <div className="device-box">
                                    <div className="device-flex" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                    <h2 style={{marginLeft: '20px', marginRight: '20px', marginTop: '0', marginBottom: '0'}}>1</h2>
                                    <span style={{marginRight: '30px', fontSize: '12pt'}}>Поделись своей уникальной ссылкой-приглашением в сервис GOSTLINK со знакомым, друзьями или семьей</span>
                                </div>
                            </div>

                            <div className="device-box">
                                <div className="device-flex" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                    <h2 style={{
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        marginTop: '0',
                                        marginBottom: '0'
                                    }}>2</h2>
                                    <span style={{marginRight: '30px', fontSize: '12pt'}}>
                                        Когда твой приглашенный начнет пользоваться сервисом, ты получишь скидку на оплату подписки в 25% от полной стоимости</span>
                                </div>
                            </div>

                            <div className="device-box">
                                <div className="device-flex" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                    <h2 style={{
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        marginTop: '0',
                                        marginBottom: '0'
                                    }}>3</h2>
                                    <span style={{marginRight: '30px', fontSize: '12pt'}}>
                                        Скидки от нескольких приглашенных складываются (не более 100%), время проведения акции не ограничено</span>
                                </div>
                            </div>

                            <div className="device-box">
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div
                                        className="qr-code"
                                        onClick={() => handleShareQr("Сервис gostlink для безопасного и быстрого доступа в интернет ", "https://gostlink.ru/?token=" + Refferal)}
                                        style={{marginRight: '5px'}}
                                    >
                                        <QRCodeCanvas
                                            value={"https://gostlink.ru/?token=" + Refferal}
                                            size={180}
                                            bgColor={"#FFFFFF"}
                                            fgColor={"#000000"}
                                            level={"H"}
                                            marginSize={4}
                                            // imageSettings={{
                                            //     src: "/logo512.png",
                                            //     height: 36,
                                            //     width: 36,
                                            //     excavate: true,
                                            // }}
                                        />
                                    </div>

                                    <div style={{marginLeft: '5px', textAlign: 'center'}}>
                                        <button
                                            onClick={() => handleShare("Сервис gostlink для безопасного и быстрого доступа в интернет ", "https://gostlink.ru/?token=" + Refferal)}
                                            style={buttonStyle}
                                        >
                                            Поделиться
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard("https://gostlink.ru/?token=" + Refferal)}
                                            style={buttonStyle}
                                        >
                                            Скопировать ссылку
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            style={buttonStyle}
                                        >
                                            Скачать QR код
                                        </button>
                                    </div>
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

const buttonStyle = {
    display: 'block',
    width: '100%',
    backgroundColor: '#111821',
    color: 'white',
    padding: '12px',
    borderRadius: '12px',
    marginTop: '8px',
    cursor: 'pointer',
    boxShadow: '0 5px 20px 0px rgb(22 31 43 / 43%)',
    border: 'none',
    textAlign: 'center'
};

export default Promo;
