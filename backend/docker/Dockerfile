# FROM node:18
# RUN apt-get update && apt-get install libvips-dev -y
# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /opt/
# # COPY ./package.json ./
# COPY package*.json ./
# ENV PATH /opt/node_modules/.bin:$PATH
# RUN npm install
# WORKDIR /opt/app
# COPY ./ .
# RUN npm run build
# EXPOSE 1337
# CMD ["npm", "run", "develop"]

FROM node:18
# Installing libvips-dev for sharp Compatibility
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY .env .
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
#se agrega el yarn add pg. importante!
RUN yarn config set network-timeout 600000 -g && yarn install && yarn add pg
WORKDIR /opt/app
COPY ./ .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "develop"]