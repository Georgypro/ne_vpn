import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
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

    const customTheme = extendTheme({
        fonts: {
            heading: "'Poiret One', sans-serif", // for headings
            body: "'Poiret One', sans-serif",    // for body text
        },
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ChakraProvider theme={customTheme}>
                <Pricing/>
            </ChakraProvider>
        </div>
    );
}

export default Shop;
