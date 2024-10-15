import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {Avatar, Box, Flex, Text} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import DefaultProfilePhoto from "./profile.svg";
import './css/custom-toast.css';
import 'react-toastify/dist/ReactToastify.css';

function User() {

    const navigate = useNavigate();
    const [imageExists, setImageExists] = useState(false);
    const photoUrl = localStorage.getItem('photoURL');

    useEffect(() => {
        const checkImage = (url) => {
            const img = new Image();
            img.onload = () => setImageExists(true);
            img.onerror = () => setImageExists(false);
            img.src = url;
        };

        if (photoUrl) {
            checkImage(photoUrl);
        } else {
            setImageExists(false);
        }
    }, [photoUrl]);

    return (
        <Flex width="100%" direction="row" justify="flex-end" mb="30px">
            <Box textAlign="right">
                <Text color="white" fontSize={{ base: '18px', md: '24px' }} onClick={() => navigate('/profile')}>{localStorage.getItem('email')}</Text>
                { localStorage.getItem('subscriptionIsActive') === 'true' ? (
                    <Text color="white" fontSize={{ base: '18px', md: '24px' }} onClick={() => navigate('/profile')}>
                        Подписка до: {localStorage.getItem('expirationDate')}</Text>
                ) : (
                    <Text color="white" fontSize={{ base: '18px', md: '24px' }} onClick={() => navigate('/profile')}>
                        {localStorage.getItem('expirationDate')}</Text>
                )}
                <Text color="lightgray" fontStyle={"italic"} textDecoration="underline" fontSize={{ base: '14px', md: '14px' }}
                      onClick={() => navigate('/')}>сменить аккаунт</Text>
            </Box>

            <Flex
                width={{base: '60px', md: '80px'}}
                height={{base: '60px', md: '80px'}}
                bg="white"
                borderRadius="full"
                ml="30px"
                mt="10px"
                justify="center"
                align="center"
                onClick={() => navigate('/profile')}
            >
                {!imageExists ? (
                    <img src={DefaultProfilePhoto} alt="Profile"/>
                ) : (
                    <Avatar
                        src={photoUrl}
                        width="90%"
                        height="90%"
                        borderRadius="full"
                    />
                )}
            </Flex>
        </Flex>
    );
}

export default User;
