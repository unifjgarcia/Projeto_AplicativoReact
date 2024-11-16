import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historico = () => {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      const historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];
      setPartidas(historico);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico.');
    }
  };

  const limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem('historicoPartidas');
      setPartidas([]);
      Alert.alert('Sucesso', 'Histórico limpo com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível limpar o histórico.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={estilos.item}>
      <Text style={estilos.texto}>
        <Text style={estilos.rotulo}>Data:</Text> {new Date(item.data).toLocaleDateString()}
      </Text>
      <Text style={estilos.texto}>
        <Text style={estilos.rotulo}>Gols:</Text> {item.gols}
      </Text>
      <Text style={estilos.texto}>
        <Text style={estilos.rotulo}>Assistências:</Text> {item.assistencias}
      </Text>
      {item.observacao ? (
        <Text style={estilos.texto}>
          <Text style={estilos.rotulo}>Observação:</Text> {item.observacao}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Histórico de Partidas</Text>
      {partidas.length === 0 ? (
        <Text style={estilos.mensagem}>Nenhuma partida registrada ainda.</Text>
      ) : (
        <FlatList
          data={partidas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity style={estilos.botao} onPress={limparHistorico}>
        <Text style={estilos.textoBotao}>Limpar Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  mensagem: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#34495e',
  },
  rotulo: {
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Historico;
