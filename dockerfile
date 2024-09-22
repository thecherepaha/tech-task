# Указываем базовый образ
FROM node:18-alpine

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем TypeScript код
RUN npm run production

# Открываем порт для приложения
EXPOSE 8080

# Команда для запуска приложения
CMD ["node", "dist/server.js"]
