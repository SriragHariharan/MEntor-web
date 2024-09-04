FROM node:20.8.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6006

CMD ["node", "app.js"]