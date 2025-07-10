
# Documentação - Fiap Hackathon Image Processing Service  
### Grupo 5 - 9SOAT
 - Gabriel Ferreira Umbelino

## Introdução
Este projeto é parte de um sistema de processamento de vídeos. O Image Processing Service é responsável por receber e armazenar os frames capturados durante o processamento de vídeo, organizá-los e disponibilizá-los para download em formato ZIP.

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
  - Informações de metadados


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


### Node.js
Este projeto pode ser executado utilizando node.js em sua maquina.
Se você não possui o Node.js instalado, siga as instruções para seu sistema operacional na [documentação oficial do Node.js](https://nodejs.org/en/download).

#### 1 - Inicialize o projeto executando o seguinte comando no terminal
```bash
npm install

npm run typeorm migration:run

npx prisma generate

npm run start
```

### Kubernetes

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
