import { StackScreenProps } from '@react-navigation/stack'
import { Box, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base'
import { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, Button, View, StyleSheet, Alert } from 'react-native'
import { getUsers } from "../Api/api";
import { UserContext } from './UseProvaider';
import { useIsFocused } from '@react-navigation/native';


interface Props extends StackScreenProps<any, any> { }

interface User {
    Usuario: string;
    Pss: string;
    Correo: string;
    numeroTarjeta: string;
    codigoSeguridad: number;
    fechaVencimiento: string;
}

export const LoginScreen = ({ navigation }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const { setUser } = useContext(UserContext);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // La pantalla está enfocada, puedes realizar acciones aquí
            getUsers()
            .then(data => {
                if (data) {
                    setUsers(data);
                    
                }
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
            console.log('La pantalla está enfocada');
        }
    }, [isFocused]);

    useEffect(() => {
        getUsers()
            .then(data => {
                if (data) {
                    setUsers(data);
                    
                }
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const [user, setuser] = useState('');
    const [pss, setpss] = useState('');

    const handleLogin = () => {
        const foundUser = users.find(u => u.Usuario === user && u.Pss === pss);
        if (foundUser) {
            setUser(foundUser);
            console.log(foundUser)
            navigation.navigate('Home');
        } else {
            Alert.alert('Error', 'Credenciales inválidas', [{ text: 'OK' }]);
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/bg.gif')} style={styles.image}>
                <Box alignItems="center">
                    <Box w="100%" maxWidth="300px">
                        <FormControl isRequired>
                            <Stack mx="6">
                                <View><Image style={styles.brand} source={require('../img/shopping-bag.png')} /></View>
                                <FormControl.Label>Usuario:</FormControl.Label>
                                <Input value={user} variant="rounded" placeholder="Usuario" onChangeText={setuser} />
                                <FormControl.Label>Password</FormControl.Label>
                                <Input value={pss} variant="rounded" type="password" placeholder="Contraseña" onChangeText={setpss} />
                                <FormControl.HelperText>
                                    Debe tener como mínimo 6 caracteres.                                </FormControl.HelperText>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Se requieren al menos 6 caracteres.
                                </FormControl.ErrorMessage>
                            </Stack>
                        </FormControl>
                    </Box>
                </Box>
                <View style={styles.containerBtn}>
                    <Button
                        color={'#274186'}
                        title='Iniciar sesion'
                        onPress={handleLogin}
                    />
                </View>
                <View style={styles.containerBtn}>
                    <Button
                        color={'#274186'}
                        title='  Registrarse '
                        onPress={() => navigation.navigate('Registro')}
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
        marginLeft: 50,
        marginBottom: 10
    }
});
