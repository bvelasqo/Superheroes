FROM node:18-alpine3.15

COPY package.json .

RUN npm i --quiet

COPY . .

COPY production.env .

RUN npm install pm2 -g

CMD ["pm2-runtime", "dist/server/index.js"]

EXPOSE 8080
