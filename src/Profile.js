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

function Profile() {

    const navigate = useNavigate();
    const [imageExists, setImageExists] = useState(false);
    const photoUrl = localStorage.getItem('photoURL');
    const [deviceData, setDeviceData] = useState([]);

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
                    setDeviceData(data.devices)
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

    // Function to get the platform icon
    const getPlatformIcon = (platform) => {
        switch (platform) {
            case 'android':
                return <FaAndroid size={48} color="#222222"/>;
            case 'ios':
                return <FaApple size={48} color="#222222" />;
            case 'desktop':
                return <FaWindows size={48} color="#222222" />;
            default:
                return <FaGhost size={48} color="#222222" />;
        }
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ToastContainer toastStyle={{color: '#ffffff', backgroundColor: '#333333'}}/>
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
                            <Text color="gray" fontStyle={"italic"} textDecoration="underline" fontSize={{ base: '12px', md: '12px' }} onClick={() => navigate('/')}>сменить аккаунт</Text>
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

                    {deviceData ? (
                        <div>
                        <ul>
                            {deviceData.map(device => (
                                <li key={device.id} style={{borderBottom: 'none', marginBottom: '0'}} onClick={() => toast(device.id)}>
                                    <Box
                                        bg={"white"}
                                        p={2}
                                        borderRadius="md"
                                        mb={4}
                                        px={10}
                                        textAlign="center"
                                        position="relative"
                                        w={'full'}
                                        onClick={() => toast.error('ОТБЛАКИРОВКА УСТРОСТВА')}
                                    >
                                            <Flex align="center" justify="center">
                                                <Box position="absolute" left="15px">
                                                    {getPlatformIcon(device.platform)}
                                                </Box>
                                                <Box ml={10} mr={10}>
                                                    <Text fontSize="xl" fontWeight="bold" color="#222222" lineHeight={1} >
                                                        {device.deviceName.length > 20 ? device.deviceName.slice(0, 17) + '...' : device.deviceName}
                                                    </Text>
                                                    <Text fontSize="sm" fontStyle="italic" fontWeight="light" color="#666666" lineHeight={1.2} mt={1}>
                                                        {device.deviceId.slice(0, 10)} - {device.created}
                                                    </Text>
                                                </Box>
                                                <Box position="absolute" right="15px">
                                                    <ImCross style={{color: '#222222', height: '38px', marginRight: '15px'}}
                                                             onClick={() => toast('typa clear')}/>
                                                </Box>
                                            </Flex>
                                            {/*{device.deviceId.slice(0, 10)} - {device.created}*/}
                                    </Box>
                                </li>
                            ))}
                        </ul>
                        <Box
                            bg={"white"}
                            p={2}
                            borderRadius="md"
                            mb={4}
                            px={10}
                            textAlign="center"
                            position="relative"
                            w={'full'}
                            onClick={() => toast.error('ОТКРЫЛАСЯ ДОКУПОЧКА')}
                        >
                            <Flex align="center" justify="center" >
                                <Box position="absolute" left="15px">
                                    <FaPlus  style={{color: '#222222', height: '42px', width: '42px', marginRight: '15px'}}/>
                                </Box>
                                <Box ml={10} mr={10}>
                                    <Text fontSize="xl" fontWeight="bold" color="#222222" lineHeight={1} >
                                        Добавить новое устройство?
                                    </Text>
                                    <Text fontSize="sm" fontStyle="italic" fontWeight="light" color="#666666" lineHeight={1.2} mt={1}>
                                        +128 рублей в месяц к подписке
                                    </Text>
                                </Box>

                            </Flex>
                            {/*{device.deviceId.slice(0, 10)} - {device.created}*/}
                        </Box>
                        </div>
                    ) : (
                        <span>Нет активных устройств</span>
                    )}

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
