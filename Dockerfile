###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copiar o node_modules e dist da etapa de build
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Copiar o arquivo .env para o container de produção
# COPY --chown=node:node .env .env

USER node

CMD [ "node", "dist/main.js" ]
