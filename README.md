# Aplicativo Minha Carreira

Ideia geral do App:
- Minha Carreira é um aplicativo criado com React para auxiliar jogadores de futebol a gerenciar suas próprias carreiras e analisar seus desempenhos individuais.
- No aplicativo, o usuário tem a possibilidade registrar todas suas estatísticas de todo jogo, como gols, assitências e observações gerais sobre a partida.
- O aplicativo é capaz de armazenar um histórico de partidas registradas no celular do usuário.
- O aplicativo faz as estatísticas do jogador, como total de gols, total de assistências, média de gols e média de assistências.

Motivação:
- A motivação para a criação desse aplicativo se deve à necessidade e a importância dos jogadores de futebol terem acesso fáceis as suas marcas gerais das partidas. Com o próprio jogador registrando suas partidas, ele consegue analisar melhor seus pontos fracos, pontos fortes e seus desempenhos individuais, e a escassez desse tipo de app foi uma gigante motivação para a criação, além da paixão pelo futebol e esportes, querendo acrescentar nesse mundo.

Objetivos:
- Registrar as estatísticas de cada partida.
- Consultar um histórico completo dos jogos realizados.
- Observar métricas como total de gols, total de assistências, média de gols e média de assistências.
- Tornar a experiência mais interativa com sons e um design envolvente.

Funcionalidades:
1. Tela Inicial (Menu):
- Apresenta todos os botões para navegar pelo app (Registrar Partida, Histórico, Estatísticas).
![Tela Inicial](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Menu.jpg)

2. Tela Registrar Partida:
- Permite que o usuário digite seus gols, assitências e observações da partida.
![Tela Registrar Partida](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Registro.jpg)
- Após o usuário salvar o registro, mostra mensagem de sucesso e emite som de apito.
![Registro com Sucesso](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Sucesso.jpg)
- Caso o usuário não digite todas as informações obrigatórias (gols e assistências), mostra mensagem de erro e emite som de erro.

![Registro com Erro](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Erro.jpg)


3. Tela Histórico:
- Permite que o usuário veja todos os registros feitos, que são salvos com AsyncStorage, que armazena todo o historico ja registrado naquele dispositivo.

![Tela Historico](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Historico.jpg)

4. Tela Estatísticas:
- Permite que o usuário veja suas estatísticas gerais calculadas pelo aplicativo de acordo com seus registros, como médias e total de gols e assistências.

![Tela Estatísticas](https://github.com/unifjgarcia/Projeto_AplicativoReact/raw/main/imagens/Estatistica.jpg)

