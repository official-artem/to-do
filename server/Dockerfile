FROM node:18-alpine

WORKDIR /dist

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]
