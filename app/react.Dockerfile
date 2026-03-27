FROM node:20-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Installer dépendances systèmes nécessaires pour Cypress
RUN apk add --no-cache \
    bash \
    curl \
    xvfb \
    libgtk-3 \
    libnotify \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    && npm install -g pnpm

# Copier seulement les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

EXPOSE 5173