import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrarPartida = () => {
  const [gols, setGols] = useState('');
  const [assistencias, setAssistencias] = useState('');
  const [observacao, setObservacao] = useState('');

  const salvarPartida = async () => {
    if (!gols || !assistencias) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const novaPartida = {
      gols: parseInt(gols, 10),
      assistencias: parseInt(assistencias, 10),
      observacao: observacao || '',
      data: new Date().toISOString(), // Salva a data atual
    };

    try {
      // Recupera o histórico atual
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      const historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];

      // Adiciona a nova partida
      historico.push(novaPartida);

      // Salva o histórico atualizado
      await AsyncStorage.setItem('historicoPartidas', JSON.stringify(historico));

      Alert.alert('Sucesso', 'Partida salva com sucesso!');
      limparCampos();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a partida.');
    }
  };

  const limparCampos = () => {
    setGols('');
    setAssistencias('');
    setObservacao('');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Registrar Partida</Text>

      <TextInput
        style={estilos.input}
        placeholder="Número de Gols"
        keyboardType="numeric"
        value={gols}
        onChangeText={setGols}
      />

      <TextInput
        style={estilos.input}
        placeholder="Número de Assistências"
        keyboardType="numeric"
        value={assistencias}
        onChangeText={setAssistencias}
      />

      <TextInput
        style={[estilos.input, estilos.inputGrande]}
        placeholder="Observação (opcional)"
        multiline
        numberOfLines={4}
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={estilos.botao} onPress={salvarPartida}>
        <Text style={estilos.textoBotao}>Salvar</Text>
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
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputGrande: {
    height: 100,
    textAlignVertical: 'top', // Alinha o texto no topo do campo
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrarPartida;

