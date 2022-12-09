FROM node:14.15.5
 
WORKDIR /backend
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .


