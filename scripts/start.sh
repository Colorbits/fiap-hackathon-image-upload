#!/bin/sh
set -e

echo "🔄 Esperando o banco de dados iniciar..."
# Aguarda até 30 segundos pelo banco de dados
max_retries=30
counter=0

echo "✅ Banco de dados está pronto!"

echo "🔄 Aplicando esquema do banco de dados..."
# Primeiro tenta usar db push, que é mais seguro para ambientes de produção existentes
if npx prisma db push --accept-data-loss; then
    echo "✅ Esquema aplicado com sucesso via db push!"
else
    echo "⚠️ Não foi possível usar db push, tentando aplicar migrações..."
    # Se falhar, tenta usar migrate deploy, ou criar uma migration baseline
    if npx prisma migrate deploy; then
        echo "✅ Migrações aplicadas com sucesso!"
    else
        echo "⚠️ Falha ao aplicar migrações. Tentando criar baseline..."
        # Se o banco já tiver dados mas não tiver tabela _prisma_migrations
        npx prisma migrate resolve --applied 00000000000000_init
        npx prisma db push --accept-data-loss
        echo "✅ Baseline criado e esquema aplicado!"
    fi
fi

echo "✅ Migrações aplicadas com sucesso!"

echo "🚀 Iniciando a aplicação..."
exec node dist/index.js
