FROM node:18-alpine

WORKDIR /app

# 1. መጀመሪያ package ፋይሎችን ብቻ ኮፒ አድርግ
COPY package*.json ./

# 2. ሞጁሎቹን በDocker ውስጥ ጫን
RUN npm install
RUN npm install -g tsx

# 3. የቀሩትን ፋይሎች (index.ts ወዘተ) ከዚያ በኋላ ኮፒ አድርግ
COPY . .

EXPOSE 3001

# 4. በ tsx አስነሳው
CMD ["npx", "tsx", "index.ts"]