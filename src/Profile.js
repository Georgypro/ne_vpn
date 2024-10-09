import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {Avatar, Box, Center, ChakraProvider, Flex, Text} from '@chakra-ui/react';
import Pricing from "./Pricing";
import { FaUser } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import DefaultProfilePhoto from "./profile.svg";

function Profile() {

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

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchLoginData(requestData);
    }, []);

    const fetchLoginData = (requestData) => {

        fetch(`https://gostlink.ru/api/profile`, {
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
                    console.log(data)
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // navigate(`/`);
            });
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ChakraProvider>
                <Center py={9} flexDirection="column"
                        maxW={"calc(2 * 330px + 2 * 16px)"}
                        w={'90%'}>

                    <Flex
                        width="100%"
                        direction="row"
                        justify="flex-end"
                        mb="30px"
                    >
                        <Box textAlign="right">
                            <Text color="white" fontSize={{ base: '18px', md: '24px' }}>{localStorage.getItem('email')}</Text>
                            { localStorage.getItem('subscriptionIsActive') === 'true' ? (
                                <Text color="white" fontSize={{ base: '18px', md: '24px' }}>Подписка до: {localStorage.getItem('expirationDate')}</Text>
                            ) : (
                                <Text color="white" fontSize={{ base: '18px', md: '24px' }}>{localStorage.getItem('expirationDate')}</Text>
                            )}
                            <Text color="gray" fontStyle={"italic"} fontSize={{ base: '12px', md: '12px' }}>сменить аккаунт</Text>
                            {/*TODO add home emoji*/}
                        </Box>

                        <Flex
                            width={{base: '50px', md: '70px'}}
                            height={{base: '50px', md: '70px'}}
                            bg="white"
                            borderRadius="full"
                            ml="30px"
                            justify="center"
                            align="center"
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
                    {/*TODO: Тут будет список устройств*/}
                    {/*TODO: иконка типа устройства (эпл/android/win)*/}
                    {/*TODO: имя устройства*/}
                    {/*TODO: Контрольная закупка устройств*/}
                    {/*TODO: Отмена подписки*/}
                    <Text></Text>
                </Center>
            </ChakraProvider>
        </div>
    );
}

export default Profile;
