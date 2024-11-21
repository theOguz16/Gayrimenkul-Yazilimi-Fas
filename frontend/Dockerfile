FROM node:18 

WORKDIR /app


COPY package*.json ./
COPY vite.config.js ./vite.config.js

RUN npm install

EXPOSE 5173

CMD [ "yarn", "dev", "--host" ]

