# Sử dụng Node.js phiên bản mà bạn cần, ví dụ là 21.7.3
FROM node:21.7.3

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json (nếu có) để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả mã nguồn vào container
COPY . .

# Expose port 8000 để API có thể truy cập
EXPOSE 8000

# Chạy ứng dụng với lệnh npm start
CMD ["npm", "run", "start"]
