import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';
import InicioScreen from './screens/Pantalla_Inicio';
import AgregarGastoScreen from './screens/Agregar_gasto';
import DetalleGastoScreen from './screens/detalle_gasto';

const Stack = createNativeStackNavigator();

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    inputBackground: '#fff',
    inputText: '#000',
    card: '#f5f5f5',
    border: '#ccc',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    inputBackground: '#333',
    inputText: '#fff',
    card: '#444',
    border: '#666',
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? CustomDarkTheme : CustomLightTheme;

  return (
    <NavigationContainer theme={theme}>
      <View style={{ flex: 1 }}>
        <Button
          title={`Modo ${isDarkMode ? 'Claro' : 'Oscuro'}`}
          onPress={() => setIsDarkMode(!isDarkMode)}
        />
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="AgregarGasto" component={AgregarGastoScreen} options={{ title: 'Agregar Gasto' }} />
          <Stack.Screen name="DetalleGasto" component={DetalleGastoScreen} options={{ title: 'Detalle del Gasto' }} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}