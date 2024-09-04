FROM node:20.8.0

WORKDIR /app

COPY package*.json .

RUN npm i 

COPY . .

EXPOSE 6001

CMD [ "node", "app.js" ]