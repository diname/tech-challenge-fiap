FROM node:18-alpine
WORKDIR /app

COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm cache clean --force

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
