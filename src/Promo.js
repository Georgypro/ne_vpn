import React, { useState, useEffect } from 'react';
import './App.css';
import './languages/i18n';
import {
    Box,
    Center,
    Stack,
    Button,
    ChakraProvider,
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import './css/custom-toast.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "./User";
import { QRCodeCanvas } from 'qrcode.react';

function Promo() {

    const navigate = useNavigate();
    const [Refferal, setRefferal] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .catch((error) => {
                console.error('Failed to copy: ', error);
            });
        toast.success("Скопировано в буфер обмена")
    };

    useEffect(() => {
        const requestData = {
            uid: localStorage.getItem('uid'),
            email: localStorage.getItem('email'),
        };
        fetchPromo(requestData);
    }, []);

    const handleDownload = () => {
        const canvas = document.querySelector('.qr-code > canvas');
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'gostlink_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fetchPromo = (requestData) => {

        fetch(`https://gostlink.ru/api/profile/getReferralCode`, {
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
                    localStorage.setItem('referral', data.referralCode);
                    console.log(data);
                    setRefferal(data.referralCode);
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

                    { Refferal.length > 10 ? (
                        <Box
                            bg='white'
                            p={2}
                            borderRadius="md"
                            mb={4}
                            textAlign="center"
                            w={'full'}
                        >
                            <Stack direction="row" spacing={4} width="100%" justifyContent="center" alignContent="center">

                            <div
                                className="qr-code"
                                onClick={handleDownload}
                            >
                                <QRCodeCanvas
                                    value={"https://gostlink.ru/?token=" + Refferal}
                                    size={300}
                                    bgColor={"#FFFFFF"}
                                    fgColor={"#000000"}
                                    level={"L"}
                                    includeMargin={true}
                                    minVersion={5}
                                    imageSettings={{
                                        src: "/logo512.png",
                                        x: undefined,
                                        y: undefined,
                                        height: 64,
                                        width: 64,
                                        opacity: 1,
                                        excavate: true,
                                    }}
                                />
                            </div>

                                <Stack direction="column" m={1} mb={4} mr={4} spacing={0} width="100%" justifyContent="center" alignContent="center">
                                    <Button
                                        onClick={() => {}}
                                        mt={4}
                                        w={'full'}
                                        bg={'#111821'}
                                        color={'white'}
                                        rounded={'xl'}
                                        boxShadow={'0 5px 20px 0px rgb(22 31 43 / 43%)'}
                                        _hover={{bg: '#1A2533',}}
                                        _focus={{bg: '#223041',}}>
                                        Поделиться
                                    </Button>
                                    <Button
                                        onClick={() => {copyToClipboard("https://gostlink.ru/?token=" + Refferal)}}
                                        mt={4}
                                        w={'full'}
                                        bg={'#111821'}
                                        color={'white'}
                                        rounded={'xl'}
                                        boxShadow={'0 5px 20px 0px rgb(22 31 43 / 43%)'}
                                        _hover={{bg: '#1A2533',}}
                                        _focus={{bg: '#223041',}}>
                                        Скопировать ссылку
                                    </Button>
                                    <Button
                                        onClick={() => {handleDownload()}}
                                        mt={4}
                                        w={'full'}
                                        bg={'#111821'}
                                        color={'white'}
                                        rounded={'xl'}
                                        boxShadow={'0 5px 20px 0px rgb(22 31 43 / 43%)'}
                                        _hover={{bg: '#1A2533',}}
                                        _focus={{bg: '#223041',}}>
                                        Скачать QR код
                                    </Button>
                                </Stack>
                        </Stack>

                        </Box>
                    ) : (
                        <div>Загрузка...</div>
                    )}

                </Center>
            </ChakraProvider>
        </div>
    );
}

export default Promo;
