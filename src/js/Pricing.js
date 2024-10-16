import React, { useState, useEffect } from 'react';
import User from "./User";
import {BsStars} from "react-icons/bs";
import '../css/Pricing.css'

const Pricing = () => {

    const pay = (price) => {
        const widget = new window.cp.CloudPayments();
        const receipt = {
            Items: [
                {
                    label: 'Доступ к сервису gostlink.ru',
                    price: price,
                    quantity: 1.00,
                    amount: price,
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
                electronic: price,
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
                amount: price,
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
            });
    };

    const payYear = (price) => {
        const widget = new window.cp.CloudPayments();
        const receipt = {
            Items: [
                {
                    label: 'Доступ к сервису gostlink.ru',
                    price: price,
                    quantity: 1.00,
                    amount: price,
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
                electronic: price,
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
                amount: price,
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
            });
    };

    return (
        <div className="container-main">
            <User />
            <div className="row-main">
                <div className="card">
                    <div className="card-header">
                        <span className="discount-badge" style={{backgroundColor: '#e6f4ea', color: '#2f855a'}}>Скидка 40%</span>
                        <h3 className="card-title">Подписка на 2 устройства</h3>
                        <div className="price">
                            <span className="price-value">299</span>
                            <span className="price-symbol">₽/мес</span>
                        </div>
                        <div className="price-old">498 ₽/мес</div>
                    </div>
                    <div className="card-body">
                        <span className="feature"><BsStars/> ∞ GB/мес</span><br/>
                        <span className="feature"><BsStars/> Безграничный доступ к иностранным сервисам</span><br/>
                        <span className="feature"><BsStars/> Работают банки</span><br/>
                        <span className="feature"><BsStars/> Без ограничений скорости</span><br/>
                        <span className="feature"><BsStars/> Без рекламы</span>
                        <button onClick={() => pay(299)} style={{marginTop: '30px'}} className="button_dark">Выбрать
                        </button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="discount-badge" style={{backgroundColor: '#fefcbf', color: '#d69e2e'}}>Скидка 50%</span>
                        <h3 className="card-title">Подписка на 3 устройства</h3>
                        <div className="price">
                            <span className="price-value">399</span>
                            <span className="price-symbol">₽/мес</span>
                        </div>
                        <div className="price-old">799 ₽/мес</div>
                    </div>
                    <div className="card-body">
                        <span className="feature"><BsStars/> ∞ GB/мес</span><br/>
                        <span className="feature"><BsStars/> Безграничный доступ к иностранным сервисам</span><br/>
                        <span className="feature"><BsStars/> Работают банки</span> <br/>
                        <span className="feature"><BsStars/> Без ограничений скорости</span> <br/>
                        <span className="feature"><BsStars/> Без рекламы</span>
                        <button onClick={() => payYear(399)} style={{marginTop: '30px'}}
                                className="button_dark">Выбрать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
