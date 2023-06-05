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
export const CarneScreen = () => {
    const data = [{
        id: "c1",
        fullName: "Carne Molida",
        Precio: "5650",
        img: 'https://www.informador.mx/__export/1641927000980/sites/elinformador/img/2022/01/11/carne_molida_2_crop1641927000396.jpg_1902800913.jpg'
    }, {
        id: "c2",
        fullName: "Chuleta cerdo",
        Precio: "3850",
        img: 'https://walmartcr.vtexassets.com/arquivos/ids/164325/Chuleta-La-Hacienda-Especial-De-Cerdo-1kg-1-39058.jpg?v=637536134851100000'
    }, {
        id: "c3",
        fullName: "Muslo pollo",
        Precio: "4200",
        img: "https://walmartcr.vtexassets.com/arquivos/ids/397824/Muslo-Pollo-Fresco-Nacional-Bandeja-1Kg-1-26845.jpg?v=1771937798"
    }, {
        id: "c4",
        fullName: "Salchicha",
        Precio: "4000",
        img: 'https://walmartcr.vtexassets.com/arquivos/ids/327734/Salchicha-Cinta-Azul-Hot-Dog-Paquete-480Gr-1-32113.jpg?v=637935070398170000'
    }, {
        id: "c5",
        fullName: "Filet pescado",
        Precio: "2830",
        img: "https://walmartcr.vtexassets.com/arquivos/ids/292172/Filete-Don-Cristobal-De-Tilapia-Congelado-454Gr-1-29264.jpg?v=637822318276530000"
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
                                    color: 'black'
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