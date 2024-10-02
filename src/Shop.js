import React, { useEffect } from 'react';
import './App.css';
import './languages/i18n';

function Shop() {
    useEffect(() => {
        // Dynamically load CloudPayments widget script
        const script = document.createElement('script');
        script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Define the payment function
    const pay = () => {
        const widget = new window.cp.CloudPayments();
        widget.pay('charge',
            {
                publicId: localStorage.getItem('uid'),
                description: 'Покупочка вот такая',
                amount: 100,
                currency: 'RUB',
                accountId: localStorage.getItem('email'),
                invoiceId: '1234567',
                skin: "modern",
                data: { myProp: 'myProp value' }
            },
            {
                onSuccess: function (options) {
                    console.log('Payment succeeded', options);
                },
                onFail: function (reason, options) {
                    console.error('Payment failed', reason, options);
                },
                onComplete: function (paymentResult, options) {
                    console.log('Payment completed', paymentResult, options);
                }
            }
        );
    };

    return (
        <div>
            <button id="checkout" onClick={pay}>TAKE MY MONEY</button>
        </div>
    );
}

export default Shop;

