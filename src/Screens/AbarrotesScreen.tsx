import { useIsFocused } from '@react-navigation/native';
import { Avatar, Box, HStack, Heading, Image, Modal, Spacer, Stack, Text, VStack } from 'native-base';
import React, { useState, useEffect } from 'react'
import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { carritoTem } from '../Api/api';

interface Item {
    id: string;
    fullName: string;
    Precio: string;
    img: string;
}
interface ListaItem {
    id: string;
    fullName: string;
    precio: string;
}
export const AbarrotesScreen = () => {
    const data: Item[] = [{
        id: "a1",
        fullName: "Atún suli",
        Precio: "600",
        img: "https://walmartcr.vtexassets.com/arquivos/ids/221681/Atun-Suli-Trocitos-En-Aceite-140gr-1-26746.jpg?v=637626935519100000"
    }, {
        id: "a2",
        fullName: "Arroz indiana",
        Precio: "1650",
        img: 'https://walmartcr.vtexassets.com/arquivos/ids/278811/Arroz-Indiana-Premium-Grano-Entero-99-1800gr-2-28608.jpg?v=637778254288000000'
    }, {
        id: "a3",
        fullName: "Frijol negro tio pelon",
        Precio: "1200",
        img: 'https://organicoasucasa.com/image/cache/catalog/Frijoles%20Negros%20Tio%20Pelon-500x500.jpg'
    }, {
        id: "a4",
        fullName: "Café",
        Precio: "6600",
        img: 'https://walmartcr.vtexassets.com/arquivos/ids/284353/Cafe-Volio-Clasico-Molido-Fino-1000gr-2-31668.jpg?v=637798777344600000'
    }, {
        id: "a5",
        fullName: "Aceite Clover",
        Precio: "2350",
        img: "https://walmartcr.vtexassets.com/arquivos/ids/208405/Aceite-Clover-De-Soya-950ml-1-28134.jpg?v=637593941119930000"
    }];
    
    const [number, setNumber] = useState('0');
    const [total, setTotal] = useState('0');

    const [selectedItem, setSelectedItem] = useState<Item>({
        id: '',
        fullName: '',
        Precio: '',
        img: '',
    });
    const handleNumberChange = (text: string) => {
        // Verificar si el texto ingresado es un número válido
        const parsedNumber = parseInt(text);
        if (!isNaN(parsedNumber)) {
            setNumber(text);
        }
    };
    const SumarCantidad = (text: string, precio: string) => {
        // Verificar si el texto ingresado es un número válido
        const parsedPrecio = parseInt(precio);
        const parsedNumber = parseInt(text);
        if (!isNaN(parsedNumber) && parsedNumber >= 0) {
            const incrementedNumber = parsedNumber + 1;
            const precioTotal = parsedPrecio * incrementedNumber;
            setTotal(precioTotal.toString());
            setNumber(incrementedNumber.toString());
        }
    };
    const RestarCantidad = (text: string, precio: string) => {
        // Verificar si el texto ingresado es un número válido
        const parsedPrecio = parseInt(precio);
        const parsedNumber = parseInt(text);
        if (!isNaN(parsedNumber) && parsedNumber > 0) {
            const decrementedNumber = parsedNumber - 1;
            const precioTotal = parsedPrecio * decrementedNumber;
            setTotal(precioTotal.toString());
            setNumber(decrementedNumber.toString());
        }
    };
    const [showModal, setShowModal] = useState(false);

    const handleAgregarCompra = (item: Item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // La pantalla está enfocada, puedes realizar acciones aquí
            console.log('La pantalla está enfocada');
        }
    }, [isFocused]);

    const handleConfirmarCompra = () => {
        if (!selectedItem.id || !selectedItem.fullName || !selectedItem.Precio) {
            return;
        }
        const listaItem: ListaItem = {
            id: selectedItem.id,
            fullName: selectedItem.fullName,
            precio: total
        };
        console.log(listaItem)
        carritoTem(listaItem);
        setNumber('0');
        setTotal('0');
        setShowModal(false);
    };
    return (

        <View style={styles.container}>
            <ImageBackground source={require('../img/bg4.jpg')} style={styles.image}>
                <Box>
                    <FlatList data={data} renderItem={({
                        item
                    }) => <Box bg={'light.100'} mt='5' mx={{
                        base: "auto",
                        md: 0
                    }} rounded="lg" borderColor="coolGray.200" borderWidth="1" mb={'1'}  >
                            <HStack space={[2, 3]} justifyContent="space-between">
                                <VStack>
                                    <Image source={{
                                        uri: item.img
                                    }} alt="Alternate Text"
                                        width={250}
                                        height={200} />
                                    <Text fontSize="xl" _dark={{
                                        color: "warmGray.50"
                                    }} color="coolGray.800" bold>
                                        {item.fullName}
                                    </Text>
                                    <Text bold fontSize="xl"
                                        color="black" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                        Precio:  ₡{item.Precio}
                                    </Text>
                                    <TouchableOpacity style={[{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 40
                                    }]} onPress={() => { handleAgregarCompra(item) }}  >
                                        <Image source={require('../img/add-to-cart.png')} alt='img' />
                                        <Text style={{ color: 'green', marginLeft: 10 }}>Agregar al carrito</Text>
                                    </TouchableOpacity>
                                </VStack>
                            </HStack>
                        </Box>} keyExtractor={item => item.id} />
                </Box>
            </ImageBackground>
            <Modal isOpen={showModal} onClose={() => {
                setShowModal(false)
                setNumber('0')
                setTotal('0')
            }}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Ingrese  la cantidad a comprar</Modal.Header>
                    <Modal.Body>
                        <Text fontSize="xl" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {selectedItem.fullName}
                        </Text>
                        <Text fontSize="xl" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            Precio: ₡ {selectedItem.Precio}
                        </Text>
                        <Text fontSize="xl" _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            Total: ₡ {total}
                        </Text>
                        <View style={[{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }]}>
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10// Relleno en todos los lados
                                }}
                                onPress={() => {
                                    SumarCantidad(number, selectedItem.Precio)
                                }}
                            >
                                <Image source={require('../img/add.png')} alt='img' />
                            </TouchableOpacity>
                            <TextInput
                                value={number}
                                onChangeText={handleNumberChange}
                                keyboardType="numeric"
                                style={{
                                    borderWidth: 1, // Ancho del borde
                                    borderColor: 'gray', // Color del borde
                                    marginHorizontal: 50, // Relleno en todos los lados
                                    width: 40,
                                    height: 40,
                                    textAlign: 'center', // Centrar el texto
                                    fontSize: 18,
                                    fontWeight: 'bold', // Agregar negrita al texto
                                    color:'black'
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 10// Relleno en todos los lados
                                }}
                                onPress={() => { RestarCantidad(number, selectedItem.Precio) }}
                            >
                                <Image source={require('../img/minus.png')} alt='img' />
                            </TouchableOpacity>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <TouchableOpacity style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 40
                        }]}
                            onPress={() => {
                                handleConfirmarCompra()
                            }}>
                            <Image source={require('../img/add-to-cart.png')} alt='img' />
                            <Text style={{ color: 'green', marginLeft: 10 }}>Agregar al carrito</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})