
FROM node as builder 
WORKDIR /usr/app
COPY package*.json ./
COPY . . 
RUN npm run build
RUN localedef -i de_DE -c -f UTF-8 -A /usr/share/locale/locale.alias de_DE.UTF-8
ENV LANG de_DE.utf8







# FROM node
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install --production
# COPY . .
# RUN npm run build 
EXPOSE 4000
CMD node ../../index.js

