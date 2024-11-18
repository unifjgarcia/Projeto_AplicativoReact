import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const TelaInicial = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./ImagemMenu.webp')}
      style={estilos.container}
      resizeMode="cover"
    >
      <View style={estilos.overlay}>
        <Text style={estilos.titulo}>Minha Carreira</Text>
        <Text style={estilos.subtitulo}>Gerencie sua carreira e veja seus desempenhos!</Text>

        <View style={estilos.botoesContainer}>
          <TouchableOpacity
            style={estilos.botao}
            onPress={() => navigation.navigate('RegistrarPartida')}
          >
            <Text style={estilos.textoBotao}>Registrar Partida</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botao, estilos.botaoSecundario]}
            onPress={() => navigation.navigate('Historico')}
          >
            <Text style={estilos.textoBotao}>Ver Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botao, estilos.botaoTerciario]}
            onPress={() => navigation.navigate('Estatisticas')}
          >
            <Text style={estilos.textoBotao}>Estatísticas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#f0f0f0',
    marginBottom: 30,
    textAlign: 'center',
  },
  botoesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#2ecc71',
  },
  botaoTerciario: {
    backgroundColor: '#e74c3c',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaInicial;
