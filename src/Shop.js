import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import { ChakraProvider } from '@chakra-ui/react';
import Pricing from "./Pricing";
import { FaUser } from "react-icons/fa";

function Shop() {
    const [imageExists, setImageExists] = useState(false);
    const photoUrl = localStorage.getItem('photoURL');

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


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ChakraProvider>
                <Pricing/>
            </ChakraProvider>
        </div>
    );
}

export default Shop;
