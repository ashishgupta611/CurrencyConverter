import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="CurrencyConverter" 
          component={CurrencyConverterScreen}
          options={{ title: 'Currency Converter' }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen}
          options={{ title: 'Conversion History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}