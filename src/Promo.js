import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {Avatar, Box, Center, ChakraProvider, Flex, Text, useColorModeValue} from '@chakra-ui/react';
import Pricing from "./Pricing";
import {FaAndroid, FaApple, FaGhost, FaPlus, FaPlusCircle, FaUser, FaWindows} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import DefaultProfilePhoto from "./profile.svg";
import './css/custom-toast.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ImCross} from "react-icons/im";
import User from "./User";

function Promo() {

    const navigate = useNavigate();

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchPromo(requestData);
    }, []);


    const fetchPromo = (requestData) => {

        fetch(`https://gostlink.ru/api/profile/promo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
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
                    localStorage.setItem('expirationDate', data.userInfo.expirationDate);
                    localStorage.setItem('subscriptionIsActive', data.userInfo.subscriptionIsActive);
                    // TODO: save promo qr + link
                    console.log(data)
                    // toast.success(name + ' откреплен.')
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ToastContainer toastStyle={{color: '#ffffff', backgroundColor: '#333333'}}/>
            <ChakraProvider>
                <Center py={9} flexDirection="column"
                        maxW={"calc(2 * 330px + 2 * 16px)"}
                        w={'90%'}>

                    <User/>

                    {/*TODO: get promo info*/}
                </Center>
            </ChakraProvider>
        </div>
    );
}

export default Promo;
