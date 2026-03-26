FROM node:22-alpine

WORKDIR /app

# ለ Native bindings አስፈላጊ የሆኑ ፋይሎችን እንዲጭን ይሄን ጨምር
RUN apk add --no-cache libc6-compat

COPY package*.json ./

# ንጹህ ጭነት እንዲሆን ይሄን ተጠቀም
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]