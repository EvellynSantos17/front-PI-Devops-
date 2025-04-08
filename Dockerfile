FROM node:22-alpine

ARG BACKEND_SERVICE_NAME="pi-dev-ops-backend.default"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
