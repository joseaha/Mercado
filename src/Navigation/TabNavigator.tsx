import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../Screens/HomeScreen';
import React from 'react';
import { Image } from 'react-native';
import { PagoScreen } from '../Screens/PagoScreen';
import { CarritoScreen } from '../Screens/CarritoScreen';
import TabTopNavigatior from './TapTopNavigatior';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // Oculta el header en todas las pantallas
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={TabTopNavigatior}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../img/home-button.png')} />
                    ),
                }}
            />
            <Tab.Screen
                name="CarritoScreen"
                component={CarritoScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../img/shopping-cart.png')} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default MyTabs;