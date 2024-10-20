import React, { useEffect } from 'react';
import '../languages/i18n';
import Pricing from "./elements/Pricing";
import {useNavigate} from "react-router-dom";
import User from "./elements/User";


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

    // useEffect(() => {
    //     if (localStorage.getItem('subscriptionIsActive') === 'true'){
    //         navigate('/profile');
    //     }
    // }, [navigate]);
    
    return (
        <div className="container-main">
            <User />
            <Pricing/>
        </div>
    );
}

export default Shop;
