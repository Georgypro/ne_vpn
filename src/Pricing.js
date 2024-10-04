import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const Pricing = () => {
    return (
        <Center py={9} >
            <Box
                maxW={'330px'}
                w={'full'}
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
                        bg={useColorModeValue('green.50', 'green.900')}
                        p={0}
                        px={1}
                        color={'green.500'}
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
                        <ListItem >
                            <ListIcon as={CheckIcon} color="green.400" />
                            Безграничный доступ к иностранным сервисам
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="green.400" />
                            Работают банковские приложения
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="green.400" />
                            Без ограничений скорости
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="green.400" />
                            Без рекламы
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="green.400" />
                            Подключение с двух устройств
                        </ListItem>
                    </List>

                    <Button
                        mt={4}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}>
                        Выбрать
                    </Button>
                </Box>
            </Box>

            <Box
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                m={4}>
                <Stack
                    textAlign={'center'}
                    p={2}
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('yellow.50', 'yellow.900')}
                        p={0}
                        px={1}
                        color={'yellow.500'}
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
                        <ListItem>
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            ∞ GB/мес
                        </ListItem>
                        <ListItem >
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            Безграничный доступ к иностранным сервисам
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            Работают банковские приложения
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            Без ограничений скорости
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            Без рекламы
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="yellow.400" />
                            Подключение с трех устройств
                        </ListItem>
                    </List>

                    <Button
                        mt={4}
                        w={'full'}
                        bg={'yellow.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'yellow.500',
                        }}
                        _focus={{
                            bg: 'yellow.500',
                        }}>
                        Выбрать
                    </Button>
                </Box>
            </Box>

            <Box
                maxW={'330px'}
                w={'full'}
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
                        bg={useColorModeValue('orange.50', 'orange.900')}
                        p={0}
                        px={1}
                        color={'orange.500'}
                        rounded={'full'}>
                        Скидка 65%
                    </Text>
                    <Text lineHeight={0.8}>Подписка на 2 года</Text>
                    <Stack direction={'row'} align={'center'} justify={'center'} px={1}>
                        <Text
                            fontSize={'4xl'}
                            fontWeight={800}
                            lineHeight={1.2}
                        >
                            275
                        </Text>
                        <Text lineHeight={0.8}>₽/мес</Text>
                    </Stack>
                    <Text fontSize={'md'} fontWeight={500} color={'darkgray'} lineHeight={0.2}>
                        3300 ₽/год
                    </Text>
                </Stack>


                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={3} py={4} >
                    <List spacing={2} fontSize={'xs'} fontWeight={500}>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="red.400" />
                            ∞ GB/мес
                        </ListItem>
                        <ListItem >
                            <ListIcon as={CheckIcon} color="red.400" />
                            Безграничный доступ к иностранным сервисам
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="red.400" />
                            Работают банковские приложения
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="red.400" />
                            Без ограничений скорости
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="red.400" />
                            Без рекламы
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckIcon} color="red.400" />
                            Подключение с пяти устройств
                        </ListItem>
                    </List>

                    <Button
                        mt={4}
                        w={'full'}
                        bg={'red.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                            bg: 'red.500',
                        }}
                        _focus={{
                            bg: 'red.500',
                        }}>
                        Выбрать
                    </Button>
                </Box>
            </Box>

        </Center>
    )
}

export default Pricing;
