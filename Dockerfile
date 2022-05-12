FROM node:16.14.2-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm", "start"]