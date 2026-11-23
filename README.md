# 🥗 Meu Nutri

**Seu plano alimentar organizado em um só lugar.**

O Meu Nutri é uma aplicação web progressiva (PWA) desenvolvida para
facilitar o acompanhamento da alimentação diária. O sistema permite
consultar o plano alimentar, visualizar alimentos equivalentes,
registrar refeições e acompanhar o cardápio do Restaurante Universitário
(RU) da UFMS.

O projeto foi desenvolvido com foco em praticidade, acessibilidade e uso
em diferentes dispositivos.

## ✨ Funcionalidades

-   **Início:** visão geral do plano alimentar e da rotina diária.
-   **Meu plano:** consulta das refeições, horários e porções
    recomendadas.
-   **Substituição de alimentos:** consulta de alimentos equivalentes
    conforme a lista de substituição nutricional.
-   **Alimentos:** pesquisa e consulta dos alimentos organizados por
    grupos.
-   **Diário alimentar:** registro e acompanhamento das refeições.
-   **Cardápio do RU:** importação de arquivos PDF do Restaurante
    Universitário.
-   **Organização por dia:** visualização do cardápio por dia da semana
    e por refeição.
-   **Armazenamento local:** preservação dos dados no próprio
    dispositivo.
-   **PWA:** possibilidade de instalação em computadores e dispositivos
    móveis.
-   **Modo offline:** acesso às funcionalidades armazenadas localmente,
    mesmo sem conexão com a internet.

## 🛠️ Tecnologias utilizadas

  Tecnologia         Aplicação
  ------------------ -----------------------------------------
  HTML5              Estrutura da aplicação
  CSS3               Estilização e responsividade
  JavaScript         Lógica e funcionalidades
  LocalStorage       Armazenamento dos dados
  Service Worker     Cache e funcionamento offline
  Web App Manifest   Instalação como PWA
  PDF.js             Leitura e extração de conteúdo dos PDFs

## 📂 Estrutura do projeto

``` text
meu-nutri/
│
├── index.html          # Estrutura principal
├── styles.css          # Estilos da aplicação
├── app.js              # Funcionalidades e lógica principal
├── foods.js            # Base de alimentos e equivalências
├── plan.js             # Plano alimentar
├── manifest.json       # Configurações da PWA
├── sw.js               # Service Worker
├── icon.svg            # Ícone da aplicação
│
└── README.md
```

## 🚀 Como executar

O projeto utiliza tecnologias web e não exige instalação de dependências
para sua execução básica.

1.  Clone o repositório:

``` bash
git clone https://github.com/SEU-USUARIO/meu-nutri.git
```

2.  Entre na pasta:

``` bash
cd meu-nutri
```

3.  Inicie um servidor local. Uma opção é utilizar a extensão Live
    Server do Visual Studio Code.

4.  Abra o endereço local disponibilizado pelo servidor.

**Importante:** para testar os recursos de PWA, Service Worker e
instalação, utilize um servidor local ou publique a aplicação em um
ambiente com HTTPS.

## 📱 Instalação

O Meu Nutri funciona como uma Progressive Web App.

Para instalar:

1.  Abra a aplicação pelo navegador.
2.  Acesse as opções de instalação disponibilizadas pelo navegador.
3.  Selecione **Instalar aplicativo** ou **Adicionar à tela inicial**.
4.  Abra o Meu Nutri diretamente pelo dispositivo.

## 💾 Armazenamento de dados

O projeto utiliza o LocalStorage do navegador para armazenar informações
como:

-   Registros do diário alimentar.
-   Substituições de alimentos.
-   Cardápios importados do Restaurante Universitário.

Os dados permanecem no dispositivo e no navegador utilizados. Limpar os
dados do navegador pode apagar essas informações.

## 🎯 Objetivo do projeto

O Meu Nutri surgiu com a proposta de tornar o acompanhamento nutricional
mais simples e acessível, reunindo em uma única aplicação o plano
alimentar, as opções de substituição de alimentos e o cardápio do
Restaurante Universitário.

A aplicação utiliza como referência a lista de substituição e
equivalentes do Atendimento Nutricional Ambulatorial (A.N.A.) da
Universidade Federal de Mato Grosso do Sul (UFMS).

## 🔮 Melhorias futuras

-   Aprimorar a identificação automática dos alimentos nos cardápios em
    PDF.
-   Melhorar a sincronização e o gerenciamento dos dados.
-   Adicionar relatórios de acompanhamento alimentar.
-   Aprimorar a experiência de uso em dispositivos móveis.
-   Expandir as opções de personalização.

## 👨‍💻 Desenvolvimento

Projeto acadêmico e pessoal desenvolvido por **Vitor Alex Calisto**,
estudante de Sistemas de Informação da Universidade Federal de Mato
Grosso do Sul (UFMS).

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Desenvolvido com dedicação para facilitar o acompanhamento alimentar. 💚
```{=html}
</p>
```
