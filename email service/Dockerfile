FROM node:20.8.0

WORKDIR /app

COPY package*.json .

RUN npm i 

COPY . .

EXPOSE 6008

CMD [ "node", "app.js" ]