FROM node:18-alpine
WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN rm -rf node_modules

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
