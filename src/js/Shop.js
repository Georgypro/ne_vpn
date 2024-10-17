import React, { useEffect } from 'react';
import '../languages/i18n';
import Pricing from "./Pricing";
import {useNavigate} from "react-router-dom";

function Shop() {
    const navigate = useNavigate();

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

    useEffect(() => {
        if (localStorage.getItem('subscriptionIsActive') === 'true'){
            navigate('/profile');
        }
    }, [navigate]);
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Pricing/>
        </div>
    );
}

export default Shop;
