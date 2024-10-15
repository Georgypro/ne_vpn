import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {Avatar, Box, Center, ChakraProvider, extendTheme, Flex, Text, useColorModeValue} from '@chakra-ui/react';
import Pricing from "./Pricing";
import {FaAndroid, FaApple, FaGhost, FaPlus, FaPlusCircle, FaUser, FaWindows} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import DefaultProfilePhoto from "./profile.svg";
import './css/custom-toast.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ImCross} from "react-icons/im";
import User from "./User";

function Profile() {

    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState([]);

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
                    // navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // navigate(`/`);
            });
    };
    const fetchUnblockDevice = (id, name) => {

        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
            deviceId: id,
        };


        fetch(`https://gostlink.ru/api/profile/detachDevice`, {
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
                    toast.success(name + ' откреплен.')
                } else {
                    navigate(`/`);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate(`/`);
            });
    };
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
    function formatDateTime(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} - ${minutes}:${hours}`;
    }

    const customTheme = extendTheme({
        fonts: {
            heading: "'Poiret One', sans-serif", // for headings
            body: "'Poiret One', sans-serif",    // for body text
        },
    });

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ToastContainer toastStyle={{color: '#ffffff', backgroundColor: '#333333'}}/>
            <ChakraProvider theme={customTheme}>
                <Center py={9} flexDirection="column"
                        maxW={"calc(2 * 330px + 2 * 16px)"}
                        w={'90%'}>

                    <User/>

                    {deviceData ? (
                        <div>
                        <ul>
                            {deviceData.map(device => (
                                <li key={device.id} style={{borderBottom: 'none', marginBottom: '0', color: 'transparent'}}>
                                    <Box
                                        bg={"white"}
                                        p={2}
                                        borderRadius="md"
                                        mb={4}
                                        px={10}
                                        textAlign="center"
                                        position="relative"
                                        w={'full'}
                                    >
                                        {device.deviceName === "" ? (
                                            <Flex align="center" justify="center">
                                                <Box position="absolute" left="15px">
                                                    {getPlatformIcon(device.platform)}
                                                </Box>
                                                <Box ml={10} mr={10}>
                                                    <Text fontSize="xl" fontWeight="bold" color="#222222" lineHeight={1} >
                                                        Доступно новое устройство
                                                    </Text>
                                                    <Text fontSize="sm" fontStyle="italic" fontWeight="light" color="#666666" lineHeight={1.2} mt={1}>
                                                        скачать приложение
                                                    </Text>
                                                </Box>
                                                <Box position="absolute" right="15px">
                                                    {/*<ImCross style={{color: '#222222', height: '38px', marginRight: '15px'}}*/}
                                                    {/*         onClick={() => fetchUnblockDevice(device.id, device.deviceName)}/>*/}
                                                </Box>
                                            </Flex>
                                        ) : (
                                            <Flex align="center" justify="center">
                                                <Box position="absolute" left="15px">
                                                    {getPlatformIcon(device.platform)}
                                                </Box>
                                                <Box ml={10} mr={10}>
                                                    <Text fontSize="xl" fontWeight="bold" color="#222222" lineHeight={1} >
                                                        {device.deviceName.length > 20 ? device.deviceName.slice(0, 17) + '...' : device.deviceName}
                                                    </Text>
                                                    <Text fontSize="sm" fontStyle="italic" fontWeight="light" color="#666666" lineHeight={1.2} mt={1}>
                                                        {device.deviceId.slice(0, 16)} - {formatDateTime(device.firstActivation)}
                                                    </Text>
                                                </Box>
                                                <Box position="absolute" right="15px">
                                                    <ImCross style={{color: '#222222', height: '38px', marginRight: '15px'}}
                                                             onClick={() => fetchUnblockDevice(device.id, device.deviceName)}/>
                                                </Box>
                                            </Flex>
                                        )}
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
