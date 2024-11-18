import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Estatisticas = ({ navigation }) => {
  const [totalGols, setTotalGols] = useState(0);
  const [totalAssistencias, setTotalAssistencias] = useState(0);
  const [mediaGols, setMediaGols] = useState(0);
  const [mediaAssistencias, setMediaAssistencias] = useState(0);

  useEffect(() => {
    const calcularEstatisticas = async () => {
      const historicoSalvo = await AsyncStorage.getItem('historicoPartidas');
      const historico = historicoSalvo ? JSON.parse(historicoSalvo) : [];

      let gols = 0;
      let assistencias = 0;

      historico.forEach((partida) => {
        gols += partida.gols || 0;
        assistencias += partida.assistencias || 0;
      });

      const partidas = historico.length;

      setTotalGols(gols);
      setTotalAssistencias(assistencias);
      setMediaGols(partidas > 0 ? (gols / partidas).toFixed(2) : 0);
      setMediaAssistencias(partidas > 0 ? (assistencias / partidas).toFixed(2) : 0);
    };

    calcularEstatisticas();
  }, []);

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
        <Text style={styles.titulo}>Estatísticas do Jogador</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Total de Gols:</Text>
          <Text style={styles.valor}>{totalGols}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total de Assistências:</Text>
          <Text style={styles.valor}>{totalAssistencias}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Média de Gols por Partida:</Text>
          <Text style={styles.valor}>{mediaGols}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Média de Assistências por Partida:</Text>
          <Text style={styles.valor}>{mediaAssistencias}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '80%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  valor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});

export default Estatisticas;
