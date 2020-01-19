FROM node

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn --prod

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
