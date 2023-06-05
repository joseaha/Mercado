import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { HomeScreen } from '../Screens/HomeScreen';
import { RegistrarseScreen } from '../Screens/RegistrarseScreen';
import MyTabs from './TabNavigator';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator 
    initialRouteName='Login'
    
     screenOptions={{
      headerShown: false, // Oculta el header en todas las pantallas
        cardStyle: {
          backgroundColor: 'white'
        },
        headerStyle: {
          elevation: 0,
          backgroundColor:'#29448b',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="Registro" component={RegistrarseScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;