import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const RegistrarPartida = ({ navigation }) => {
  const [gols, setGols] = useState('');
  const [assistencias, setAssistencias] = useState('');
  const [observacao, setObservacao] = useState('');

  // Função para tocar o som
  const tocarSom = async (som) => {
    const { sound } = await Audio.Sound.createAsync(som);
    await sound.playAsync();
  };

  const salvarPartida = async () => {
    if (!gols || !assistencias) {
      await tocarSom(require('./erro.mp3')); 
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const novaPartida = {
      gols: parseInt(gols, 10),
      assistencias: parseInt(assistencias, 10),
      observacao: observacao || '',
      data: new Date().toISOString(),
    };

    try {
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      const historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];
      historico.push(novaPartida);
      await AsyncStorage.setItem('historicoPartidas', JSON.stringify(historico));
      await tocarSom(require('./somApito.wav')); 
      Alert.alert('Sucesso', 'Partida salva com sucesso!');
      resetar();
    } catch (error) {
      console.error(error);
      await tocarSom(require('./erro.mp3'));
      Alert.alert('Erro', 'Não foi possível salvar a partida.');
    }
  };

  const resetar = () => {
    setGols('');
    setAssistencias('');
    setObservacao('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('./Imagem2.webp')}
          style={estilos.container}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={estilos.overlay}>
            {/* Botão de Voltar */}
            <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
              <Text style={estilos.textoBotaoVoltar}>{"<"}</Text>
            </TouchableOpacity>

            <Text style={estilos.titulo}>Registrar Partida</Text>

            <TextInput
              style={estilos.input}
              placeholder="Número de Gols"
              keyboardType="numeric"
              value={gols}
              onChangeText={setGols}
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={estilos.input}
              placeholder="Número de Assistências"
              keyboardType="numeric"
              value={assistencias}
              onChangeText={setAssistencias}
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={[estilos.input, estilos.inputGrande]}
              placeholder="Observação (opcional)"
              multiline
              numberOfLines={4}
              value={observacao}
              onChangeText={setObservacao}
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={estilos.botao} onPress={salvarPartida}>
              <Text style={estilos.textoBotao}>Salvar Partida</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  inputGrande: {
    height: 100,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrarPartida;

