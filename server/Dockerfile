FROM node:23

WORKDIR /data/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]
