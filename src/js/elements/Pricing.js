import React, { useState, useEffect } from 'react';
import {BsStars} from "react-icons/bs";
import '../../css/Pricing.css'
import {useNavigate} from "react-router-dom";
import {HiOutlineArrowSmallRight} from "react-icons/hi2";

const Pricing = () => {
    const [shopData, setShopData] = useState([]);
    const navigate = useNavigate();
    const [isPromoInput, setIsPromoInput] = useState(false);
    const [promo, setPromo] = useState("");
    const [msgFromPromo, setMsgFromPromo] = useState("");

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchShopData(requestData);
    }, []);

    const fetchShopData = (userData) => {

        fetch(`https://gostlink.ru/shop/getShop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(text => {
                console.log(text);
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    setShopData(data);
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };
    const fetchPromo = () => {
        const promoData = {
            email: localStorage.getItem('email'),
            promo: promo,
        };
        fetch(`https://gostlink.ru/shop/applyPromo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(promoData),
        })
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(text => {
                console.log(text);
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    const requestData = {
                        uid: localStorage.getItem('uid'),
                        email: localStorage.getItem('email'),
                    };
                    fetchShopData(requestData)
                } else {
                    setMsgFromPromo(data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };
    const pay = (firstPrice, subPrice) => {
        const widget = new window.cp.CloudPayments();
        const receipt = {
            Items: [
                {
                    label: 'Доступ к сервису gostlink.ru',
                    price: firstPrice,
                    quantity: 1.00,
                    amount: firstPrice,
                    vat: 20,
                    method: 0,
                    object: 0,
                }
            ],
            taxationSystem: 0,
            email: 'pk_4a8b35334f78ae1f4ca1dbd3650c4',
            phone: '',
            isBso: false,
            amounts: {
                electronic: firstPrice,
                advancePayment: 0.00,
                credit: 0.00,
                provision: 0.00
            }
        };

        const data = {
            CloudPayments: {
                CustomerReceipt: receipt,
                recurrent: {
                    interval: 'Month',
                    period: 1,
                    customerReceipt: receipt
                }
            }
        };

        widget.charge({
                publicId: 'pk_4a8b35334f78ae1f4ca1dbd3650c4',
                description: 'Подписка на ежемесячный доступ к сервису gostlink.ru',
                amount: subPrice,
                currency: 'RUB',
                accountId: localStorage.getItem('email'),
                invoiceId: localStorage.getItem('uid'),
                data: data
            },
            function (options) {
                if (!window.kmpJsBridge) {
                    console.warn("kmpJsBridge not found. Doing nothing.");
                    return;
                }
                const data = {
                    success: true,
                    options: options,
                    reason: 'no_reason'
                };
                window.kmpJsBridge.callNative(
                    "pay",
                    JSON.stringify(data),
                    function (data) {
                        document.getElementById("subtitle").innerText = data;
                        console.log("Response from Native: " + data);
                    }
                );
            },
            function (reason, options) {
                if (!window.kmpJsBridge) {
                    console.warn("kmpJsBridge not found. Doing nothing.");
                    return;
                }
                const data = {
                    success: true,
                    options: options,
                    reason: reason
                };
                window.kmpJsBridge.callNative(
                    "pay",
                    JSON.stringify(data),
                    function (data) {
                        document.getElementById("subtitle").innerText = data;
                        console.log("Response from Native: " + data);
                    }
                );
                navigate('/profile');
            });
    };

return (
    <div className="row-main">
        { shopData.success ? (
            <div className="card">
                {shopData.firstPayment === shopData.monthlyPayment ? (
                    <div className="card-header">
                        <span className="discount-badge" style={{
                            backgroundColor: '#e6f4ea',
                            color: '#2f855a'
                        }}>Скидка {shopData.discount}%</span>
                        <h3 className="card-title">Месячная подписка</h3>
                        <div className="price">
                            <span className="price-value">{shopData.firstPayment} </span><br/>
                            <span className="price-symbol">₽/мес</span>
                        </div>
                        <div className="price-old">{shopData.strikethroughPrice} ₽/мес</div>
                    </div>
                ) : (
                    <div className="card-header">
                        <span className="discount-badge" style={{
                            backgroundColor: '#e6f4ea',
                            color: '#2f855a'
                        }}>Скидка {shopData.discount}%</span>
                        <h3 className="card-title">Месячная подписка</h3>
                        <div className="price">
                            <span className="price-value">Первый месяц {shopData.firstPayment} </span><br/>
                            <span className="price-symbol">₽</span>
                        </div>
                        <div className="price">
                            <span className="price-value">Далее {shopData.monthlyPayment} </span><br/>
                            <span className="price-symbol">₽/мес</span>
                        </div>
                        <div className="price-old">{shopData.strikethroughPrice} ₽/мес</div>
                    </div>
                )}
                <div className="card-body">
                    <table>
                        <tr><td><BsStars class="icon"/></td><td><span className="feature">∞ GB и без ограничений скорости</span></td></tr>
                        <tr><td><BsStars class="icon"/></td><td><span className="feature">Доступ к иностранным сервисам</span></td></tr>
                        <tr><td><BsStars class="icon"/></td><td><span className="feature">Работают российские банки</span></td></tr>
                        <tr><td><BsStars class="icon"/></td><td><span className="feature">Без рекламы в приложении</span></td></tr>
                    </table>
                </div>
                {shopData.promoActivated === false ? (
                    <>
                    {isPromoInput ? (
                        <div className="card-input">
                            <div className="input-flex">
                                <span style={{marginRight: '5px'}}>Введи промокод: </span>
                                <input
                                    className="promo-input"
                                    type="text"
                                    value={promo}
                                    onChange={(e) => {
                                        let newValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                                        setPromo(newValue);
                                    }}
                                    inputMode="text"
                                    onKeyDown={(e) => {
                                        // console.log(e.key);
                                        if (e.key === 'Enter') {
                                            fetchPromo();
                                        }
                                    }}
                                    onBlur={() => {
                                        fetchPromo();
                                    }}
                                />
                                    <div className="go-icon" onClick={() => fetchPromo()}>
                                        <HiOutlineArrowSmallRight
                                            style={{height: '30px', width: '30px'}}/>
                                    </div>
                            </div>
                            <div>
                                { msgFromPromo.length > 1 ? (
                                    <span style={{color: 'red'}}>{msgFromPromo}</span>
                                ) : (
                                    <></>
                                )}
                            </div>
                            </div>
                            ) : (
                            <div onClick={() => setIsPromoInput(true)} className="card-promotion">
                                <span>Есть промокод?</span>
                            </div>
                            )}
                        </>
                ) : (
                    <div onClick={() => setIsPromoInput(true)} className="card-promotion-complete">
                        <span style={{color: 'green'}}>Промокод успешно активирован</span>
                    </div>
                )}
                <div className="card-body">
                    <button onClick={() => pay(shopData.firstPayment, shopData.monthlyPayment)}
                                style={{marginTop: '0', maxWidth: '300px', width: '100%'}}
                                className="button_dark">
                            Оплатить
                    </button>
                </div>
            </div>
        ) : (
            <span>Loading...</span>
        )}

    </div>

);
}

export default Pricing;
