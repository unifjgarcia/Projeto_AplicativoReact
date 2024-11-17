import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar telas
import TelaInicio from './TelaInicio';
import RegistrarPartida from './RegistrarPartida';
import Historico from './Historico';
import Estatisticas from './Estatisticas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TelaInicio"
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho em todas as telas
        }}
      >
        <Stack.Screen name="TelaInicio" component={TelaInicio} />
        <Stack.Screen name="RegistrarPartida" component={RegistrarPartida} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Estatisticas" component={Estatisticas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


