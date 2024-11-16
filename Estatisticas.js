import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Estatisticas = () => {
  const [estatisticas, setEstatisticas] = useState({
    totalGols: 0,
    totalAssistencias: 0,
    partidas: 0,
    mediaGols: 0,
    mediaAssistencias: 0,
  });

  useEffect(() => {
    calcularEstatisticas();
  }, []);

  const calcularEstatisticas = async () => {
    try {
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      const historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];

      if (historico.length === 0) {
        Alert.alert('Sem dados', 'Nenhuma partida registrada para calcular as estatísticas.');
        return;
      }

      const totalGols = historico.reduce((acc, partida) => acc + partida.gols, 0);
      const totalAssistencias = historico.reduce((acc, partida) => acc + partida.assistencias, 0);
      const partidas = historico.length;
      const mediaGols = (totalGols / partidas).toFixed(2);
      const mediaAssistencias = (totalAssistencias / partidas).toFixed(2);

      setEstatisticas({
        totalGols,
        totalAssistencias,
        partidas,
        mediaGols,
        mediaAssistencias,
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível calcular as estatísticas.');
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Estatísticas</Text>

      {estatisticas.partidas === 0 ? (
        <Text style={estilos.mensagem}>Nenhuma partida registrada.</Text>
      ) : (
        <View>
          <Text style={estilos.texto}>
            <Text style={estilos.rotulo}>Total de Partidas:</Text> {estatisticas.partidas}
          </Text>
          <Text style={estilos.texto}>
            <Text style={estilos.rotulo}>Total de Gols:</Text> {estatisticas.totalGols}
          </Text>
          <Text style={estilos.texto}>
            <Text style={estilos.rotulo}>Total de Assistências:</Text> {estatisticas.totalAssistencias}
          </Text>
          <Text style={estilos.texto}>
            <Text style={estilos.rotulo}>Média de Gols por Partida:</Text> {estatisticas.mediaGols}
          </Text>
          <Text style={estilos.texto}>
            <Text style={estilos.rotulo}>Média de Assistências por Partida:</Text> {estatisticas.mediaAssistencias}
          </Text>
        </View>
      )}
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
  texto: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  rotulo: {
    fontWeight: 'bold',
  },
});

export default Estatisticas;
