import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { UserContext } from './UseProvaider';
import { Box, Button, HStack, Heading, Spacer, VStack } from 'native-base';
import { deleteCarritoItem, getCarrito,compra } from "../Api/api";
import { useIsFocused } from '@react-navigation/native';
interface ListaItem {
  id: string;
  fullName: string;
  precio: string;
}
interface Compra {
  usuario: string;
  total: number;
  fecha:string;
}



export const CarritoScreen = () => {
  const { user } = useContext(UserContext);

  const [carritoData, setcarritoData] = useState<ListaItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);


  const handleCompra = () => {
  const date = new Date().toISOString().split('T')[0].toString()
    const data: Compra = {
      usuario: user ? user.Usuario : '',
      total: totalPrice,
      fecha: date,
    };
    console.log(data)
    compra(data)
  };

  const isFocused = useIsFocused();

  const calculateTotalPrice = (data: ListaItem[]) => {
    const totalPrice = data.reduce((acc, item) => acc + parseFloat(item.precio), 0);
    setTotalPrice(totalPrice);
  };

  const handleDeleteCarritoItem = (id:string) => {
    deleteCarritoItem(id); // Llama a la función deleteCarritoItem con el ID como argumento
    getCarrito()
    .then(data => {
      if (data) {
        setcarritoData(data);
        calculateTotalPrice(data); // Vuelve a calcular la suma de los precios

      }
    })
  };
  useEffect(() => {
      if (isFocused) {
          // La pantalla está enfocada, puedes realizar acciones aquí
          console.log('La pantalla está enfocada');
          getCarrito()
      .then(data => {
        if (data) {
          setcarritoData(data);
          calculateTotalPrice(data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del carrito:', error);
      });
      }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/bg4.jpg')} style={styles.image}>
        <Text style={styles.text}>
          Usuario: {user ? user.Usuario : 'No hay usuario disponible'}
        </Text>
        <Text style={styles.text}>
          Numero de Cuenta: {user ? user.numeroTarjeta : 'No hay numero de cuenta disponible'}
        </Text>
        <Text style={styles.text}>
          Correo: {user ? user.numeroTarjeta : 'No hay Correo disponible'}
        </Text>
        <Box>
          <Heading fontSize="xl" p="4" pb="3">
            Productos de la compra:
          </Heading>
          <Heading fontSize="xl" p="4" pb="3">
            Total:{totalPrice}
          </Heading>
          <Button onPress={() => handleCompra()}>Realizar Compra</Button>
          <FlatList
            data={carritoData}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{ borderColor: "muted.50" }}
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack  justifyContent="space-between">
                    <Text style={styles.text}> {item.fullName}</Text>
                    <Text style={styles.text}>₡{item.precio}</Text>
                    <Button onPress={() => handleDeleteCarritoItem(item.id)}>Eliminar</Button> 
                </HStack>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});