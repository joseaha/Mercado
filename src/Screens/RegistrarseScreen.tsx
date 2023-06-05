import { StackScreenProps } from '@react-navigation/stack'
import { Box, FormControl, Input, Stack, WarningOutlineIcon, Checkbox, Modal, Button as NButton } from 'native-base'
import { useState } from 'react';
import { Image, ImageBackground, Button, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { addUser} from "../Api/api";
interface Props extends StackScreenProps<any, any> { }
interface User {
    Usuario: string;
    Pss: string;
    Correo: string;
    numeroTarjeta: string;
    codigoSeguridad: number;
    fechaVencimiento: string;
  }

export const RegistrarseScreen = ({ navigation }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [usuario, setusuario] = useState('');
    const [pss, setpss] = useState('');
    const [correo, Setcorreo] = useState('');
    const [numTarjeta, setnumTarjet] = useState('');
    const [cc, setcc] = useState('');
    const [fechaVecimiento, setFecha] = useState('');

    const agregarUser = () => {
        // Check if any required field is empty
        if (!usuario || !pss || !correo || !numTarjeta || !cc || !fechaVecimiento) {
          Alert.alert('Error', 'Por favor complete todos los campos.');
          return;
        }
      
        const data: User = {
          Usuario: usuario,
          Pss: pss,
          Correo: correo,
          numeroTarjeta: numTarjeta,
          codigoSeguridad: parseInt(cc),
          fechaVencimiento: fechaVecimiento
        };
      
        // Call the addUser function and handle the response
        addUser(data)
          .then(() => {
            Alert.alert('Éxito', 'El usuario se registró exitosamente.');
            setusuario('');
            setpss('');
            setFecha('');
            setcc('');
            setnumTarjet('');
            setFecha('');
            Setcorreo('');
          })
          .catch(error => {
            Alert.alert('Error', 'Error al insertar el usuario.');
            console.error(error);
          });
      };
      
    const handleAgregarTarjeta = () => {
        setShowModal(true); // Reemplaza con la lógica adecuada para mostrar/ocultar el modal
    };
    
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/bg.gif')} style={styles.image}>
                <Box alignItems="center">
                    <Box w="100%" maxWidth="300px">
                        <FormControl isRequired>
                            <Stack mx="6">
                                <View><Image style={styles.brand} source={require('../img/user.png')} /></View>
                                <FormControl.Label>Usuario:</FormControl.Label>
                                <Input value={usuario} onChangeText={setusuario} variant="rounded" placeholder="Usuario" />
                                <FormControl.Label>Password</FormControl.Label>
                                <Input  value={pss} onChangeText={setpss} variant="rounded" type="password" placeholder="Contraseña" />
                                <FormControl.Label>Correo:</FormControl.Label>
                                <Input  value={correo} onChangeText={Setcorreo} variant="rounded" placeholder="Correo" />
                                <View style={[{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }]}>
                                    <TouchableOpacity onPress={handleAgregarTarjeta}>
                                        <Image source={require('../img/credit-card.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleAgregarTarjeta}>
                                        <Text style={{ color: 'black', marginLeft: 10 }}>Agregar Tarjeta</Text>
                                    </TouchableOpacity>
                                </View>
                                <Checkbox shadow={1} value="test" accessibilityLabel="This is a dummy checkbox" defaultIsChecked>
                                    Acepta los terminos y condiciones</Checkbox>
                            </Stack>
                        </FormControl>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>Tarejata de credito o debito</Modal.Header>
                                <Modal.Body>
                                    <FormControl>
                                        <FormControl.Label>Numero Tarjeta:</FormControl.Label>
                                        <Input  value={numTarjeta} onChangeText={setnumTarjet} variant="rounded"  placeholder="Numero tarjeta" />
                                        <FormControl.Label>Codigo Seguridad:</FormControl.Label>
                                        <Input  value={cc} onChangeText={setcc} variant="rounded"  placeholder="Codigo Seguridad" />
                                        <FormControl.Label>Fecha vencimiento</FormControl.Label>
                                        <Input  value={fechaVecimiento} onChangeText={setFecha} variant="rounded" placeholder="Fecha Vencimiento" />
                                    </FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <NButton.Group space={2}>
                                        <NButton variant="ghost" colorScheme="blueGray" onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            Cancel
                                        </NButton>
                                        <NButton onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            Save
                                        </NButton>
                                    </NButton.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </Box>
                </Box>
                <View style={styles.containerBtn}>
                    <Button
                        color={'#274186'}
                        title='  Registrarse '
                        onPress={() => {agregarUser()
                        navigation.navigate('Login')}}
                    />
                </View>
            </ImageBackground>
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
    containerBtn: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }, brand: {
        marginLeft: '40%',
        marginBottom: 10
    },
    containerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    }, brandIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#274186',
        fontSize: 16,
    },
});