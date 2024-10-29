# Desafio Técnico - Fullstack com NestJS e React

Este repositório contém a solução para o teste técnico utilizando **NestJS** para o backend e **React** para o frontend. Abaixo você encontra instruções para configurar, rodar e explorar o projeto.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para a construção do backend, escolhido por sua abordagem opinativa e robusta na criação de rotas e controllers.
- **MySQL**: Banco de dados relacional, conforme solicitado.
- **Prisma ORM**: Ferramenta de ORM com integração facilitada com TypeScript, queries tipadas e Prisma Studio para gerenciamento de dados.
- **Class Transformer e Class Validator**: Utilizadas no NestJS para validação de dados e manipulação de objetos, proporcionando um controle refinado sobre os dados recebidos e enviados pela API.
- **ReactJS**: Framework utilizado para o frontend, acompanhado da biblioteca **Chakra UI** para estilização e componentes prontos.
- **Axios**: Biblioteca para realizar requisições HTTP no frontend, simplificando a comunicação com a API.
- **Zod**: Biblioteca de validação de dados, usada para estruturar e validar esquemas de dados de forma consistente.
- **React Router Dom**: Biblioteca de roteamento para React, facilitando a navegação entre as páginas da aplicação.
- **React Toastify**: Ferramenta para exibir notificações de forma elegante e personalizada no frontend.

## Funcionalidades Desenvolvidas

Para o projeto escolhi o NestJS ao invés do express por se tratar de um framework mais opinativo que me proporciona ferramentas poderosas para aumentar minha eficiência no desenvolvimento, como:

- Módulos de gerenciamento de leads (`leads module`), incluindo controllers e serviços gerados com NestJS:
  - `npx nest generate module leads`
  - `npx nest generate service leads`
  - `npx nest generate controller leads`

**Funcionalidades pedidas no desafio:**:
- [x] Página para submissão do formulário /simular
- [x] Página de consulta /listagem
- [x] Endpoint para registrar uma nova simulação
- [x] Endpoint para listar todas as simulações (com opção de filtro por nome, email, codigo da unidade consumidora etc)
- [x] Endpoint para listar uma simulação baseado no id do lead, etc...
- [x] Modelar domínio com os agregados a seguir:
- [x] Fazer validação dos dados transitados na API.
- [x] Configurar ambiente docker para rodar a aplicação.

**Funcionalidades extras não pedidas no desafio**:
- [x] Rota para deletar leads
- [x] Middlewares de validação (email, codigoDaUnidadeConsumidora)
- [x] HomePage de apresentação
- [x] Tela para mostrar históricos das unidades consumidoras
- [x] Toastify para notificar erros e sucessos
- [x] Validação dos campos do formulário
- [ ] Autenticação e validação com JWT.
- [ ] Rotas e telas para cadastro/login.
- [ ] Pipeline CI/CD e deploy em Cloud.

## Como Rodar o Projeto

Siga as instruções abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados na máquina, além de **Node.js** e **npm**.

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/notoriousgabrielrd/desafio-dev-fullstack

2. Acesse a pasta raiz do projeto:
   ```bash
    cd desafio-dev-fullstack

3. Inicialize o backend:
   ```bash
    cd new-sun-energy
    cp .env.example .env
    npm install

4. Inicialize o frontend:
   ```bash
    cd ../newsun-energy-frontend
    cp .env.example .env
    npm install

5. Suba o ambiente completo com Docker:
   ```bash
    cd ..
    docker-compose up --build

6. <u>Caso queira rodar separadamente o backend</u>:
   ```bash
    cd new-sun-energy
    cp .env.example .env
    npm install
    npm run start
   
 7. <u>Caso queira rodar separadamente o frontend</u>:
    ```bash
    cd ../newsun-energy-frontend
    cp .env.example .env
    npm install
    npm run start
   
### Estrutura de pastas:
- /new-sun-energy: Backend desenvolvido com NestJS.
- /newsun-energy-frontend: Frontend desenvolvido com React e Chakra UI.
- /prisma: Configuração do Prisma ORM.

### Links Úteis:
- [Documentação do NestJS](https://docs.nestjs.com "Ir para a documentação oficial do NestJS")
- [Documentação do Prisma](https://www.prisma.io/docs "Ir para a documentação oficial do Prisma")
- [Documentação do React](https://reactjs.org "Ir para a documentação oficial do React")
- [Documentação do Chakra UI](https://chakra-ui.com "Ir para a documentação oficial do Chakra UI")


#### Considerações

Espero que aprecie o desenvolvimento deste projeto. O desafio foi bastante interessante, especialmente porque, embora eu tenha menos familiaridade com o NestJS em comparação ao Express, achei estimulante utilizá-lo para explorar novas abordagens e soluções.


