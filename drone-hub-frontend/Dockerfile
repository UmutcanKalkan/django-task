# React Dockerfile
FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json /app/
RUN npm install

# Projeyi kopyala
COPY . /app/

# Uygulamayı çalıştır
CMD ["npm", "start"]
