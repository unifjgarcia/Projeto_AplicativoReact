import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historico = ({ navigation }) => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      setHistorico(historicoSalvo ? JSON.parse(historicoSalvo) : []);
    };
    carregarHistorico();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.texto}>
        <Text style={styles.label}>Partida {index + 1}:</Text>
      </Text>
      <Text style={styles.texto}>Gols: {item.gols}</Text>
      <Text style={styles.texto}>Assistências: {item.assistencias}</Text>
      {item.observacao ? <Text style={styles.texto}>Obs: {item.observacao}</Text> : null}
      <Text style={styles.data}>Data: {new Date(item.data).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('./Imagem2.webp')}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotaoVoltar}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.titulo}>Histórico de Partidas</Text>
        {historico.length > 0 ? (
          <FlatList
            data={historico}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.lista}
          />
        ) : (
          <Text style={styles.texto}>Nenhuma partida registrada ainda.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  textoBotaoVoltar: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  data: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default Historico;
