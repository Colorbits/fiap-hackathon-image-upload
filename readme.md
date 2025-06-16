# Documentação - FIAP Hackathon Image Upload Service


## Running Instructions

### Env
setup a mongo db database URL in ur .env using the DATABASE_URL value

### Node
npm install
npx prisma generate
npm run dev

### Docker
docker build . -t gabrielumbelino/fiap-hackathon-image-upload-service:latest
docker run -p 3001:3001 gabrielumbelino/fiap-hackathon-image-upload-service:latest