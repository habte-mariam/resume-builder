FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# npm install ብቻ በቂ ነው
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]