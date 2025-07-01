# FIAP Hackathon Image Upload Service

Um microserviço responsável pelo upload e gerenciamento de imagens para o projeto do Hackathon FIAP. Este serviço permite o armazenamento, recuperação e manipulação de imagens para uso em toda a aplicação.

## Funcionalidades

- **Upload de Imagens**: API para upload de arquivos de imagem
- **Validação de Formatos**: Suporte para formatos JPG, PNG, GIF e outros formatos comuns de imagem
- **Armazenamento Seguro**: Armazenamento persistente de imagens com suporte a MongoDB
- **Recuperação de Imagens**: Endpoints para recuperar imagens por ID ou outros critérios
- **Tratamento de Imagens**: Suporte para redimensionamento e otimização (opcional)
- **Integração com outros Serviços**: APIs para uso em outros microserviços do projeto

## Tecnologias Utilizadas

- Node.js
- Express.js
- Prisma ORM
- MongoDB
- Docker

## Instruções de Execução

### Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB
- Docker (opcional, para execução em contêiner)

### Configuração de Ambiente

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/fiap-hackathon-image-upload-service.git
cd fiap-hackathon-image-upload-service
```

2. Configure o arquivo `.env` com a URL do seu banco de dados MongoDB:
```
DATABASE_URL="mongodb://username:password@localhost:27017/imagedb"
PORT=3001
```

### Execução com Node.js

1. Instale as dependências:
```
npm install
```

2. Gere os modelos Prisma:
```
npx prisma generate
```

3. Inicie o servidor:
```
npm run dev
```

O serviço estará disponível em `http://localhost:3001`

### Execução com Docker

1. Construa a imagem Docker:
```
docker build . -t gabrielumbelino/fiap-hackathon-image-upload-service:latest
```

2. Execute o contêiner:
```
docker run -p 3001:3001 -e DATABASE_URL="sua_url_mongodb" gabrielumbelino/fiap-hackathon-image-upload-service:latest
```

## Endpoints da API

### Upload de Imagem
```
POST /api/upload
```
- Multipart form data com campo `image`
- Retorna o ID da imagem armazenada

### Recuperação de Imagem
```
GET /api/images/:id
```
- Retorna a imagem pelo ID especificado

### Listagem de Imagens
```
GET /api/images
```
- Retorna lista de metadados das imagens disponíveis

## Contribuição

Para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.