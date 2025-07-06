FROM node:20-alpine3.20 as builder

# Criando diretório base da aplicação para o build
WORKDIR /usr/src/app

# Copiando arquivos do projeto para gerar distribuição
COPY package*.json ./

# Instalando dependências do projeto
RUN npm ci

# Copiando o restante dos arquivos
COPY . .

# Compilar o projeto
RUN npm run build

# Imagem final
FROM node:20-alpine3.20

# Instalando curl para usar comando de health check.
RUN apk add curl

# Criando diretório base da aplicação
WORKDIR /usr/src/app

# Copiar arquivos de build e dependências de produção
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Criar diretórios necessários para arquivos
RUN mkdir -p /usr/src/app/uploads

# Porta da aplicação
EXPOSE 3001

# Copiar os arquivos do prisma
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiar script de inicialização
COPY --from=builder /usr/src/app/scripts/start.sh ./scripts/start.sh
RUN chmod +x ./scripts/start.sh

# Gerar o cliente Prisma na construção da imagem
RUN npx prisma generate

# Comando para executar a aplicação com migração
CMD [ "./scripts/start.sh" ]
