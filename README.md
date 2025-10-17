# 📱 App de Receitas Favoritas

Um aplicativo mobile desenvolvido em React Native com Expo para gerenciar suas receitas favoritas, permitindo adicionar, visualizar e organizar receitas de forma prática e intuitiva.

## 🎯 Objetivo do Projeto

Desenvolvimento de um aplicativo mobile como parte do Check Point (CP) da disciplina **Desenvolvimento Mobile** do 1º Semestre da FIAP.

## ✨ Funcionalidades

- **📋 Listagem de Receitas** - Visualize todas as suas receitas cadastradas
- **➕ Adicionar Nova Receita** - Formulário com validação para cadastrar novas receitas
- **🔍 Detalhes da Receita** - Visualização completa dos detalhes de cada receita
- **💾 Persistência Local** - Dados salvos localmente no dispositivo
- **✅ Validação de Formulário** - Verificação em tempo real dos dados inseridos

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Superset JavaScript com tipagem estática
- **Expo Router** - Roteamento baseado em arquivos
- **Async Storage** - Armazenamento local de dados
- **React Hooks** - Gerenciamento de estado e efeitos

## 📱 Navegação

### Tab Navigation
- **Todas as Receitas** - Lista com todas as receitas cadastradas
- **Adicionar Receita** - Formulário para cadastrar novas receitas

### Stack Navigation  
- **Detalhes da Receita** - Tela modal com informações completas da receita selecionada

## 🎨 Interface

### Telas Principais

1. **Tela Inicial (Todas as Receitas)**
   - Lista de receitas em cards
   - Indicador de tempo de preparo
   - Badge para receitas que precisam de geladeira
   - Lista vazia com mensagem educativa

2. **Formulário de Adição**
   - Campo para nome da receita (obrigatório)
   - Área de texto para ingredientes (separados por vírgula)
   - Campo numérico para tempo de preparo (obrigatório)
   - Switch para indicar se precisa de geladeira
   - Validação em tempo real

3. **Detalhes da Receita**
   - Nome da receita em destaque
   - Tempo de preparo e informações de armazenamento
   - Lista completa de ingredientes

## ✅ Validações Implementadas

- **Nome da Receita**: Campo obrigatório não vazio
- **Tempo de Preparo**: Número positivo obrigatório
- **Feedback Visual**: Mensagens de erro e estilos diferenciados para campos inválidos

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente
- Emulador Android/iOS ou dispositivo físico com Expo Go

### Instalação
```bash
# Clone o repositório
git clone https://github.com/RafaelDevProjects/ReceitaShare_app_reactNative.git

# Entre na pasta do projeto
cd ReceitasFavoritas

# Instale as dependências
npm install

# Execute o projeto
npx expo start
```
## 📊 Requisitos Atendidos (CP)

### Navegação (4 pontos)
- ✅ **Tab Navigation** com duas abas funcionais
- ✅ **Stack Navigation** para detalhes das receitas

### Formulário e Validação (4 pontos)  
- ✅ **Campos**: Nome, Ingredientes, Tempo de Preparo, Geladeira
- ✅ **Validação com useState** para campos obrigatórios
- ✅ **Feedback visual** para o usuário

### Demonstração (2 pontos)
- ✅ **Vídeo e imagens** do funcionamento do app


### 👥 Integrantes do Grupo
Rafael De Almeida Sigoli - RM554019

Giovanna Franco Gaudino Rodrigues - RM553701

Rafael Jorge Del Padre - RM552765
