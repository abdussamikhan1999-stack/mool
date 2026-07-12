# MOOL web app — Node/Express, served in a container.
FROM node:lts-alpine
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# App source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
