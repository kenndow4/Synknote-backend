# SynkNote 📝
Este es el backend del chat en tiempo real de SynkNote
API construida con Node.js, TypeScript, Express y MongoDB.  
Incluye soporte para WebSockets (Socket.IO).

## 🚀 Tecnologías
- Node.js
- TypeScript
- Express
- MongoDB
- Socket.IO
- Docker
- dotenv

## 📦 Requisitos
- Node.js 
- Docker y Docker Compose
- npm

# Comandos para Levantar la app por primera vez
npm install
npm run dev

# Comandos para levandar la base de datos con compose
Docker compose up -d (Esto lo que hara es decirle a docker que ejecute el comando que esta en el archivo docker-compose.yml)
Docker ps (Para ver si la imagen de mongo esta corriendo)

OJO tienes que tener la variables de entorno correcta
```env
PORT=4000
DATABASE_URL=
MONGO_USER=
MONGO_PASS=
