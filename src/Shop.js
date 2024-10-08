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

    // useEffect(() => {
    //     // Function to check if image exists using Image object
    //     const checkImage = (url) => {
    //         const img = new Image();
    //         img.onload = () => setImageExists(true);
    //         img.onerror = () => setImageExists(false);
    //         img.src = url;
    //     };
    //
    //     if (photoUrl) {
    //         checkImage(photoUrl);
    //     } else {
    //         setImageExists(false);
    //     }
    // }, [photoUrl]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {/*<div style={{width: 'calc(3 * 330px + 4 * 16px)', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '30px'}}>*/}
            {/*    <div style={{textAlign: 'right'}}>*/}
            {/*        <p style={{color: 'white'}}>Логин: {localStorage.getItem('email')}</p>*/}
            {/*        <p style={{color: 'white'}}>Подписка до: хх.хх.хх</p>*/}
            {/*    </div>*/}
            {/*    <div style={{width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', marginLeft: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*        {!imageExists && <FaUser size='60%' color='gray' />}*/}
            {/*        {imageExists && <img src={photoUrl} style={{width: '90%', height: '90%', borderRadius: '50%'}} alt='User Avatar' />}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <ChakraProvider>
                <Pricing/>
            </ChakraProvider>
        </div>
    );
}

export default Shop;
