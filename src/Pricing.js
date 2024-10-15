import React, { useState, useEffect } from 'react';
import User from "./User";
import {BsStars} from "react-icons/bs";

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
                // success handler
            },
            function (reason, options) {
                // fail handler
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
                // success handler
            },
            function (reason, options) {
                // fail handler
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <User />

            <div style={{ width: '100%', backgroundColor: '#fff', padding: '10px', textAlign: 'center', marginBottom: '20px' }}></div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
                <div style={{ width: '330px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f4f7', color: '#333' }}>
                        <span style={{ backgroundColor: '#e6f4ea', color: '#2f855a', padding: '5px', borderRadius: '10px', fontWeight: 'bold' }}>Скидка 40%</span>
                        <h3 style={{ margin: '10px 0', fontWeight: 'bold' }}>Подписка на 2 устройства</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '36px', fontWeight: 'bold' }}>299</span>
                            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>₽/мес</span>
                        </div>
                        <div style={{ textDecoration: 'line-through', color: 'darkgray', fontSize: '14px' }}>498 ₽/мес</div>
                    </div>
                    <div style={{padding: '20px', backgroundColor: '#f9fafb', color: 'black'}}>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> ∞ GB/мес
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Безграничный доступ к иностранным сервисам
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Работают банки
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Без ограничений скорости
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Без рекламы
                        </span>


                        <button onClick={() => pay(470)} style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#48bb78',
                            color: 'white',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}>Выбрать
                        </button>
                    </div>
                </div>

                <div style={{
                    width: '330px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#f0f4f7', color: '#333'}}>
                        <span style={{
                            backgroundColor: '#fefcbf',
                            color: '#d69e2e',
                            padding: '5px',
                            borderRadius: '10px',
                            fontWeight: 'bold'
                        }}>Скидка 50%</span>
                        <h3 style={{margin: '10px 0', fontWeight: 'bold'}}>Подписка на 3 устройства</h3>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
                            <span style={{fontSize: '36px', fontWeight: 'bold'}}>399</span>
                            <span style={{fontWeight: 'bold', fontSize: '16px'}}>₽/мес</span>
                        </div>
                        <div style={{ textDecoration: 'line-through', color: 'darkgray', fontSize: '14px' }}>799 ₽/мес</div>
                    </div>
                    <div style={{ padding: '20px', backgroundColor: '#f9fafb', color: 'black' }}>
                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> ∞ GB/мес
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Безграничный доступ к иностранным сервисам
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Работают банки
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Без ограничений скорости
                        </span> <br/>

                        <span style={{marginRight: '5px', fontSize: '20px'}}>
                          <BsStars/> Без рекламы
                        </span>
                        <button onClick={() => payYear(630)} style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#48bb78',
                            color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Выбрать</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
