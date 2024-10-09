import {Box, Center, Text, Flex, Avatar, Stack, List, ListItem, ListIcon, Button, useColorModeValue,} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons'
import { FaUser } from 'react-icons/fa';

const Pricing = () => {
    const [imageExists, setImageExists] = useState(false);
    const photoUrl = localStorage.getItem('photoURL');

    useEffect(() => {
        // Функция для проверки наличия изображения
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

    const pay = (price) => {
        const widget = new window.cp.CloudPayments();
        const receipt = {
            Items: [
                {
                    label: 'Доступ к сервису gostlink.ru',
                    price: price,
                    quantity: 1.00,
                    amount: price,
                    vat: 20,
                    method: 0,
                    object: 0,
                }
            ],
            taxationSystem: 0,
            email: 'pk_f9271576545f4a2a5a96ef79140ae',
            phone: '',
            isBso: false,
            amounts: {
                electronic: price,
                advancePayment: 0.00,
                credit: 0.00,
                provision: 0.00
            }
        };

        const data = {
            CloudPayments: {
                CustomerReceipt: receipt,
                recurrent: {
                    interval: 'Day', // Month
                    period: 1,
                    customerReceipt: receipt
                }
            }
        };

        widget.charge({
                publicId: 'pk_f9271576545f4a2a5a96ef79140ae',
                description: 'Подписка на ежемесячный доступ к сервису gostlink.ru',
                amount: price,
                currency: 'RUB',
                accountId: localStorage.getItem('email'),
                invoiceId: localStorage.getItem('uid'),
                data: data
            },
            function (options) { // success
                // действие при успешной оплате
            },
            function (reason, options) { // fail
                // действие при неуспешной оплате
            });
    };

    const payYear = (price) => {
        const widget = new window.cp.CloudPayments();
        const receipt = {
            Items: [
                {
                    label: 'Доступ к сервису gostlink.ru',
                    price: price,
                    quantity: 1.00,
                    amount: price,
                    vat: 20,
                    method: 0,
                    object: 0,
                }
            ],
            taxationSystem: 0,
            email: 'pk_f9271576545f4a2a5a96ef79140ae',
            phone: '',
            isBso: false,
            amounts: {
                electronic: price,
                advancePayment: 0.00,
                credit: 0.00,
                provision: 0.00
            }
        };

        const data = {
            CloudPayments: {
                CustomerReceipt: receipt,
                recurrent: {
                    interval: 'Month',
                    period: 12,
                    customerReceipt: receipt
                }
            }
        };

        widget.charge({
                publicId: 'pk_f9271576545f4a2a5a96ef79140ae',
                description: 'Подписка на eжегодный платеж для доступа к сервису gostlink.ru',
                amount: price,
                currency: 'RUB',
                accountId: localStorage.getItem('email'),
                invoiceId: localStorage.getItem('uid'),
                data: data
            },
            function (options) { // success
                // действие при успешной оплате
            },
            function (reason, options) { // fail
                // действие при неуспешной оплате
            });
    };


    const monthIndex = new Date().getMonth();
    const months = [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
    ];
    const currentMonth = months[monthIndex];


    return (
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
                    <Text color="white" fontSize={{ base: '18px', md: '24px' }}>Подписка до: хх.хх.хх</Text>
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
                        <FaUser size="60%" color="gray" />
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

            <Box
                bg={useColorModeValue('green.400', 'gray.800')}
                p={2}
                borderRadius="md"
                mb={4}
                textAlign="center"
                w={'full'}
            >
                <Text fontSize="xl" fontWeight="bold" color="white" lineHeight={0.8}>
                    Только в этот {currentMonth}, скидки до 50%!
                </Text>
            </Box>

            {/* Stack to align the other boxes in a row */}
            <Stack direction={{base: "column", md: "row"}} spacing={4} width="100%" justifyContent="center" alignContent="center">
            <Box
                maxW={{base: "500px", md: "330px"}}
                w={'full'}
                margin="auto"
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Stack
                    textAlign={'center'}
                    p={2}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('green.100', 'green.900')}
                        p={0}
                        px={1}
                        color={'green.600'}
                        rounded={'full'}>
                        Скидка 40%
                    </Text>
                    <Text lineHeight={0.8}>Месячная подписка</Text>
                    <Stack direction={'row'} align={'center'} justify={'center'} px={1}>
                        <Text
                            fontSize={'4xl'}
                            fontWeight={800}
                            lineHeight={1.2}
                        >
                            470
                        </Text>
                        <Text fontWeight={600}  lineHeight={0.8}>₽/мес</Text>
                    </Stack>
                    <Text fontSize={'md'} fontWeight={600} textDecoration="line-through" color={'darkgray'} lineHeight={0.2}>
                        790 ₽/мес
                    </Text>
                </Stack>


                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={3} py={4} >
                    <List spacing={2} fontSize={'xs'} fontWeight={500}>
                        <ListItem>
                                <ListIcon as={CheckIcon} color="green.400" />
                                ∞ GB/мес
                        </ListItem>
                        <ListItem ><ListIcon as={CheckIcon} color="green.400" />Безграничный доступ к иностранным сервисам</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Работают банковские приложения</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Без ограничений скорости</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Без рекламы</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Подключение с двух устройств</ListItem>
                    </List>

                    <Button
                        onClick={() => {pay(470)}}
                        mt={4}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{bg: 'green.500',}}
                        _focus={{bg: 'green.500',}}>
                        Выбрать
                    </Button>
                </Box>
            </Box>

            <Box
                maxW={{base: "500px", md: "330px"}}
                w={'full'}
                margin="auto"
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Stack
                    textAlign={'center'}
                    p={2}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('yellow.100', 'yellow.900')}
                        p={0}
                        px={1}
                        color={'yellow.600'}
                        rounded={'full'}>
                        Скидка 50%
                    </Text>
                    <Text lineHeight={0.8}>Годовая подписка</Text>
                    <Stack direction={'row'} align={'center'} justify={'center'} px={1}>
                        <Text
                            fontSize={'4xl'}
                            fontWeight={800}
                            lineHeight={1.2}
                        >
                            395
                        </Text>
                        <Text lineHeight={0.8}>₽/мес</Text>
                    </Stack>
                    <Text fontSize={'md'} fontWeight={500} color={'darkgray'} lineHeight={0.2}>
                        4740 ₽/год
                    </Text>
                </Stack>


                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={3} py={4} >
                    <List spacing={2} fontSize={'xs'} fontWeight={500}>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />∞ GB/мес</ListItem>
                        <ListItem ><ListIcon as={CheckIcon} color="green.400" />Безграничный доступ к иностранным сервисам</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Работают банковские приложения</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Без ограничений скорости</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Без рекламы</ListItem>
                        <ListItem><ListIcon as={CheckIcon} color="green.400" />Подключение с трех устройств</ListItem>
                    </List>

                    <Button
                        onClick={() => {payYear(4740)}}
                        mt={4}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{bg: 'green.500',}}
                        _focus={{bg: 'green.500',}}>
                        Выбрать
                    </Button>
                </Box>
            </Box>

            {/*<Box*/}
            {/*    maxW={{base: "500px", md: "330px"}}*/}
            {/*    w={'full'}*/}
            {/*    margin="auto"*/}
            {/*    bg={useColorModeValue('white', 'gray.800')}*/}
            {/*    boxShadow={'2xl'}*/}
            {/*    rounded={'md'}*/}
            {/*    overflow={'hidden'}>*/}
            {/*    <Stack*/}
            {/*        textAlign={'center'}*/}
            {/*        p={2}*/}
            {/*        color={useColorModeValue('gray.800', 'white')}*/}
            {/*        align={'center'}>*/}
            {/*        <Text*/}
            {/*            fontSize={'sm'}*/}
            {/*            fontWeight={500}*/}
            {/*            bg={useColorModeValue('orange.100', 'orange.900')}*/}
            {/*            p={0}*/}
            {/*            px={1}*/}
            {/*            color={'orange.600'}*/}
            {/*            rounded={'full'}>*/}
            {/*            Скидка 65%*/}
            {/*        </Text>*/}
            {/*        <Text lineHeight={0.8}>Подписка на 2 года</Text>*/}
            {/*        <Stack direction={'row'} align={'center'} justify={'center'} px={1}>*/}
            {/*            <Text*/}
            {/*                fontSize={'4xl'}*/}
            {/*                fontWeight={800}*/}
            {/*                lineHeight={1.2}*/}
            {/*            >*/}
            {/*                275*/}
            {/*            </Text>*/}
            {/*            <Text lineHeight={0.8}>₽/мес</Text>*/}
            {/*        </Stack>*/}
            {/*        <Text fontSize={'md'} fontWeight={500} color={'darkgray'} lineHeight={0.2}>*/}
            {/*            3300 ₽/год*/}
            {/*        </Text>*/}
            {/*    </Stack>*/}


            {/*    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={3} py={4} >*/}
            {/*        <List spacing={2} fontSize={'xs'} fontWeight={500}>*/}
            {/*            <ListItem><ListIcon as={CheckIcon} color="green.400" />∞ GB/мес</ListItem>*/}
            {/*            <ListItem ><ListIcon as={CheckIcon} color="green.400" />Безграничный доступ к иностранным сервисам</ListItem>*/}
            {/*            <ListItem><ListIcon as={CheckIcon} color="green.400" />Работают банковские приложения</ListItem>*/}
            {/*            <ListItem><ListIcon as={CheckIcon} color="green.400" />Без ограничений скорости</ListItem>*/}
            {/*            <ListItem><ListIcon as={CheckIcon} color="green.400" />Без рекламы</ListItem>*/}
            {/*            <ListItem><ListIcon as={CheckIcon} color="green.400" />Подключение с пяти устройств</ListItem>*/}
            {/*        </List>*/}

            {/*        <Button*/}
            {/*            onClick={() => {pay(6600)}}*/}
            {/*            mt={4}*/}
            {/*            w={'full'}*/}
            {/*            bg={'green.400'}*/}
            {/*            color={'white'}*/}
            {/*            rounded={'xl'}*/}
            {/*            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}*/}
            {/*            _hover={{bg: 'green.500',}}*/}
            {/*            _focus={{bg: 'green.500',}}*/}
            {/*        >*/}
            {/*            Выбрать*/}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
            </Stack>
        </Center>
    )
}

export default Pricing;
