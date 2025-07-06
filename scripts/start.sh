#!/bin/sh
set -e

echo "🔄 Esperando o banco de dados iniciar..."
# Aguarda até 30 segundos pelo banco de dados
max_retries=30
counter=0
while ! npx prisma db push --skip-generate --accept-data-loss 2>/dev/null; do
    echo "⏳ Aguardando banco de dados estar disponível... ($counter/$max_retries)"
    counter=$((counter+1))
    if [ $counter -eq $max_retries ]; then
        echo "❌ Tempo esgotado esperando banco de dados"
        exit 1
    fi
    sleep 1
done

echo "✅ Banco de dados está pronto!"

echo "🔄 Aplicando migrações do banco de dados..."
npx prisma migrate deploy

echo "✅ Migrações aplicadas com sucesso!"

echo "🚀 Iniciando a aplicação..."
exec node dist/index.js
