FROM node:20-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copier seulement les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm exec cypress install

EXPOSE 5173