
# Map-Challenge

Desafio proposto no processo seletivo da empresa x

## Deploy

- [Acessar](https://map-challenge.marcielfelipe.com/)

## Sobre o desafio 🤯

 Existe uma grande demanda para registrar áreas de propriedades dos nossos clientes. Para resolver esse problema, gostaríamos que fosse criada uma plataforma com as seguintes funcionalidades:

- Tela inicial com a renderização do Mapa;
- Consiga desenhar no mapa, a área da propriedade. [Polígono];
- Ao completar o desenho de uma área, exibir modal com um formulário com o sequintes campos:
  - Nome da propriedade
  - Nome do proprietário
  - Endereço - [Rua, Bairro, Cidade, Estado e País];
- Buscar endereço  na "Google Geocoding API" e preencher os campos [Rua, Bairro, Cidade, Estado e País] de forma automática.
- Salvar dados da Propriedade;
- Ao pressionar na Área da propriedade, exibir um modal com o detalhes da propriedade.
- Opção de deletar e editar a área e informações da propriedade.
- Dados devem ser salvo no local storage.

## Demostração

![Alt text](screenshot.png)
![Alt text](screenshot2.png)

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/marcielfelipe/map-challenge.git

Entre no diretório do projeto

```bash
  cd map-challenge
```

Instale as dependências

```bash
  npm install
  or
  yarn
```

Inicie o servidor

```bash
  npm run start
  or
  yarn start
```

## Stack utilizada

- [react](https://react.dev/)
- [next.js](https://nextjs.org/)
- [styled-components](https://styled-components.com/docs)
- [leaflet](https://leafletjs.com/)
- [react-leaflet](https://react-leaflet.js.org/)
- [react-leaflet-draw](https://www.npmjs.com/package/react-leaflet-draw)
- [react-leaflet-draw](https://www.npmjs.com/package/react-leaflet-draw)
- [react-hook-form](https://www.npmjs.com/package/react-leaflet-draw)
