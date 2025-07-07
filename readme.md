
# Documentação - Hack SOAT 9
### Grupo 5 - 9SOAT

 - Gabriel Ferreira Umbelino



## Introdução
Este projeto é parte de um sistema de processamento de vídeos que permite extrair frames de imagens a partir de vídeos carregados pelos usuários. O serviço de upload de imagens é responsável por receber e armazenar os frames capturados durante o processamento de vídeo, organizá-los e disponibilizá-los para download em formato ZIP.

O sistema funciona como um microserviço integrado com uma API de processamento de vídeos, onde após a extração dos frames, estes são enviados para este serviço que os armazena de forma organizada. Os usuários podem então visualizar e baixar todas as imagens extraídas em um único arquivo compactado, facilitando o uso posterior.

Este serviço utiliza PostgreSQL para armazenar metadados dos arquivos e referências aos frames salvos, garantindo escalabilidade e performance mesmo com grandes volumes de dados. A arquitetura é projetada para funcionar em ambientes Kubernetes, proporcionando alta disponibilidade e resiliência.

## Escopo do Sistema

### Recebimento de Imagens
- Recebimento de frames de imagens extraídos de vídeos:
  - Armazenamento organizado por vídeo de origem
  - Metadados associados a cada imagem (timestamp, sequência, etc.)
  - Suporte a diferentes formatos de imagem (JPG, PNG)

### Armazenamento
- Sistema de armazenamento seguro:
  - Gestão eficiente de arquivos no sistema de arquivos
  - Indexação de metadados no banco de dados PostgreSQL
  - Associação entre usuários e seus conteúdos

### Geração de ZIP
- Compactação automática de imagens:
  - Agrupamento de frames por vídeo de origem
  - Nomenclatura organizada e sequencial
  - Processamento assíncrono para arquivos grandes

### API RESTful
- Endpoints para manipulação das imagens:
  - Upload de frames individuais
  - Listagem de frames por vídeo
  - Download do arquivo ZIP com todas as imagens
  - Informações de metadados e estatísticas

### Integração com Outros Serviços
- Comunicação com serviços relacionados:
  - Integração com API de processamento de vídeos
  - Sistema de notificação para alertas de erros
  - Registro de logs e telemetria

### Diagramas

#### Diagrama de Entidade e Relacionamento
![DER](https://github.com/Fiap-Tech-Challenge-SOAT/fiap-pos-tech-challenge/blob/main/docs/Fase%203/fiap-pos-tech-challenge-DER.png?raw=true)

O diagrama representa a modelagem do banco de dados para uma API de restaurante, estruturando as principais entidades e seus relacionamentos. Abaixo, detalhamos cada uma das tabelas e suas funções dentro do sistema.

###### 1. User
A tabela User contém os usuários do sistema, que podem ser administradores ou funcionários. Cada usuário possui um identificador único (id).

###### 2. Customer
A entidade Customer representa os clientes do restaurante. Cada cliente tem um id, nome (name), documento (document), número de telefone (phone_number) e e-mail (email).

###### 3. Order
A tabela Order armazena os pedidos realizados no restaurante. Ela possui um id, status (status), preço total (total_price) e uma referência ao usuário que registrou o pedido (userId).

###### 4. OrderItem
Cada pedido pode conter múltiplos itens, que são representados pela entidade OrderItem. Esta tabela possui um id e campos que indicam a quantidade (quantity), preço unitário do produto (product_price), além de referências ao productId (produto) e orderId (pedido ao qual pertence).

###### 5. Product
A entidade Product armazena os itens disponíveis no restaurante, com campos como id, name (nome do produto), price (preço), status (se está ativo ou não), description (descrição do produto) e um vínculo à categoria (categoryId).

###### 6. Category
A tabela Category organiza os produtos em categorias distintas. Contém um id e um campo name para o nome da categoria.

###### 7. ProductImage
Cada produto pode conter uma ou mais imagens, armazenadas na tabela ProductImage, que contém um id, o caminho da imagem (path) e um vínculo ao productId.

##### Relacionamentos:
- User e Order possuem um relacionamento 1:N, pois um usuário pode registrar vários pedidos.
- Order e OrderItem têm uma relação 1:N, onde um pedido pode conter vários itens.
- OrderItem e Product estão relacionados, pois cada item do pedido está associado a um produto específico.
- Product e Category têm um relacionamento 1:N, pois um produto pertence a uma única categoria, mas uma categoria pode ter vários produtos.
- Product e ProductImage possuem um relacionamento 1:N, pois um produto pode ter várias imagens.
- Essa modelagem fornece uma estrutura sólida para a API, garantindo escalabilidade e organização eficiente dos dados do restaurante.




##### Arquitetura Clean

![Arquitetura Clean](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%202/clean-architecture.jpg?raw=true)

##### Diagrama de Arquitetura
![Diagrama de Arquitetura](https://github.com/Colorbits/fiap-pos-tech-challenge/blob/main/docs/Fase%204/microservice-diagram.png?raw=true)



##### Kubernetes

![Diagrama Kubernetes](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%202/kubernetes-diagram.jpg?raw=true)
[Video Demonstrativo da Arquitetura](https://youtu.be/Jc-Y4U1lrHw)




##### Domain Storytelling

![Diagrama 1 - Cadastro de cliente](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/01%20-%20Cadastro%20cliente_2024-09-14.png?raw=true)

![Diagrama 2 - Pedido](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/02%20-%20Pedido_2024-09-26.png?raw=true)

![Diagrama 3 - Pagamento](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/03%20-%20Pagamento_2024-09-25.png?raw=true)

![Diagrama 4 - Acompanhamento do Pedido](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/04%20-%20Acompanhamento%20de%20pedido_2024-09-25.png?raw=true)

![Diagrama 5 - Acompanhamento (cozinha)](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/05%20-%20Acompanhamento%20(cozinha)_2024-09-25.png?raw=true)

![Diagrama 6 - Entrega](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/06%20-%20Entrega_2024-09-25.png?raw=true)


![Diagrama 7 - Gerenciar produtos e categorias](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Domain%20Storytelling/07%20-%20Gerenciar%20produtos%20e%20categorias_2024-09-15.png?raw=true)


##### Event Storming (Miro)
![Diagrama 1](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP%20(2).jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/board/uXjVKiHE9p8=/?moveToViewport=-273,173,5636,1057&embedId=817689355251)



![Diagrama 2](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP.jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/live-embed/uXjVKiHE9p8=/?moveToViewport=-645,2257,5324,2449&embedId=118695308647)



![Diagrama 3](https://github.com/GabrielUmbelino/fiap-pos-tech-challenge/blob/main/docs/Fase%201/Event%20Storming/Event%20Storming%20P%C3%93S%20TECH%20FIAP%20(3).jpg?raw=true)

[Veja esse diagrama no Miro](https://miro.com/app/live-embed/uXjVKiHE9p8=/?moveToViewport=5518,2442,1255,1365&embedId=549875798417)


### Dicionário de linguagem Ubíqua

 - Frame: Imagem individual extraída de um vídeo em um momento específico.

 - Usuário: Pessoa que interage com o sistema, fazendo upload de vídeos e recebendo frames processados.

 - Sistema: Conjunto de microserviços responsáveis pelo processamento de vídeos e gerenciamento de imagens.

 - VideoZip: Arquivo compactado contendo todos os frames extraídos de um vídeo específico.

 - Serviço de Upload: Componente responsável por receber e armazenar frames de imagem.

 - Serviço de Processamento: Componente que extrai frames de um vídeo enviado pelo usuário.

 - Frame Rate: Taxa de extração de frames de um vídeo (ex: 1 frame a cada 2 segundos).

 - Metadados: Informações associadas a cada frame, como timestamp, sequência e vídeo de origem.

 - Notificação: Alerta enviado ao usuário sobre o status do processamento (sucesso ou erro).

 - Upload Batch: Conjunto de frames enviados em uma única operação.

 - Storage: Sistema de armazenamento onde os frames são salvos fisicamente.


### Tech Stack

- Node.js 20
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Alpine 3.20
- Docker
- Kubernetes
- AWS EKS (para implantação em produção)


## Instalação do projeto
### DOCKER
Este projeto pode ser executado em um ambiente Docker, dispensando qualquer instalação adicional.
Se você não possui o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker).

#### 1 - Crie um arquivo .env na raiz do projeto

#### 2 - Adicione o seguinte conteúdo ao arquivo criado

```
# PostgreSQL Credentials
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=fiapuser
POSTGRES_PASSWORD=5@PtC6h6
POSTGRES_DATABASE=image-upload

# PostgreSQL Connection String
DATABASE_URL="postgresql://fiapuser:5@PtC6h6@localhost:5432/image-upload?schema=public"

# API Port
PORT=3001
```

#### 3 - Inicialize o projeto executando o seguinte comando no terminal
```
# Inicie o banco de dados PostgreSQL
docker-compose -f docker-compose.dev.yml up -d

# Execute o script para configurar o ambiente de desenvolvimento
./scripts/setup-dev.sh

# Inicie a aplicação
npm run dev
```

## Comandos Docker

-   `docker-compose -f docker-compose.dev.yml up -d`: Inicializa o banco de dados PostgreSQL em um contêiner para desenvolvimento.

-   `docker-compose -f docker-compose.dev.yml down`: Desliga o contêiner do banco de dados sem destruir o volume, preservando os dados.

-   `docker-compose -f docker-compose.dev.yml down -v`: Desliga o contêiner e descarta o volume associado, eliminando todos os dados.

-   `docker build -t fiap-hackathon-image-upload-service .`: Constrói a imagem Docker da aplicação.

-   `docker run -p 3001:3001 -e DATABASE_URL=postgresql://fiapuser:5@PtC6h6@host.docker.internal:5432/image-upload fiap-hackathon-image-upload-service`: Executa o contêiner da aplicação conectando a um banco PostgreSQL local.

O script de inicialização `start.sh` foi implementado para garantir que a aplicação só inicie quando o banco de dados estiver pronto para receber conexões, aplicando as migrações necessárias automaticamente.


### Kubernetes
Este projeto pode ser executado em um ambiente kubernetes, dispensando qualquer instalação adicional.
Se você não possui o Kubernetes instalado, siga as instruções para seu sistema operacional na [documentação oficial do Kubernetes](https://kubernetes.io/docs/tasks/tools/).

#### 1 - Inicialize o projeto executando o seguinte comando no terminal
```
npm run start:kubernetes
```
Acesse o projeto em: [http://localhost:30000/api](http://localhost:30000/api)

### Node.js
Este projeto pode ser executado utilizando node.js em sua maquina.
Se você não possui o Node.js instalado, siga as instruções para seu sistema operacional na [documentação oficial do Node.js](https://nodejs.org/en/download).

#### 1 - Inicialize o projeto executando o seguinte comando no terminal
```
npm install

npm run start
```

## Endpoints da API

O serviço disponibiliza os seguintes endpoints principais:

### Listar Frames de um Vídeo

```
GET /api/images/video/:videoUuid
```

Retorna a lista de todos os frames associados a um determinado vídeo.

### Download de ZIP com Frames

```
GET /api/zip/video/:videoUuid
```

Gera e retorna um arquivo ZIP contendo todos os frames de um vídeo específico.

### Verificar Status de Processamento

```
GET /api/zip/status/:videoUuid
```

Retorna o status atual do processamento de um ZIP (pendente, em andamento, concluído, erro).

## Deployment no Kubernetes

O serviço está configurado para implantação em um cluster Kubernetes usando os manifestos disponíveis no diretório `/kubernetes`. Para implantar o serviço:

```bash
# Aplicar configurações no namespace fiap
kubectl apply -f kubernetes/01-namespace.yml

# Aplicar segredos e configmaps
kubectl apply -f kubernetes/02-db-secret.yaml
kubectl apply -f kubernetes/03-image-upload-api-configmap.yaml
kubectl apply -f kubernetes/04-db-configmap-image-upload.yaml

# Implantar banco de dados
kubectl apply -f kubernetes/05-db-image-upload.yaml
kubectl apply -f kubernetes/07-svc-db-image-upload.yaml

# Implantar serviço
kubectl apply -f kubernetes/08-image-upload-api-deployment.yaml
kubectl apply -f kubernetes/06-1-svc-image-upload-service-api.yaml
```
