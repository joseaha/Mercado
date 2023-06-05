import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from '../Screens/HomeScreen';
import { AbarrotesScreen } from '../Screens/AbarrotesScreen';
import { CarneScreen } from '../Screens/CarneScreen';

const Tab = createMaterialTopTabNavigator();

const TabTopNavigatior =()=> {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarLabelStyle: { fontSize: 12,color:'white' },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#29448b' },
      }}
    >
      <Tab.Screen name="Verduras" component={HomeScreen} />
      <Tab.Screen name="Abarrotes" component={AbarrotesScreen} />
      <Tab.Screen name="Carnes" component={CarneScreen} />

    </Tab.Navigator>
  );
}
export default TabTopNavigatior;