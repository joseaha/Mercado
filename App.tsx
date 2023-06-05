import 'react-native-gesture-handler';
import { Box, NativeBaseProvider } from 'native-base';
import React from 'react';
import { LoginScreen } from './src/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/Navigation/StackNavigator';
import { UserProvider } from './src/Screens/UseProvaider';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <UserProvider>
          <MyStack />
        </UserProvider>
      </NativeBaseProvider>
    </NavigationContainer>

  )
}
export default App;