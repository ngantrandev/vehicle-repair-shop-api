const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dprojbz3k",
  api_key: "697872954639868",
  api_secret: "BT2lCc4RKhfYFg4CWlTe_RzAN3E",
});

// Hàm tải ảnh và lưu kết quả
const uploadImages = async () => {
  const uploadsDir = path.join(__dirname, "uploads"); // ảnh local
  const outputFile = path.join(__dirname, "uploaded-images.json");
  const files = fs.readdirSync(uploadsDir);
  const uploadedImages = [];

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "repairshopp/uploads", // thư mục Cloudinary
      });

      uploadedImages.push({
        name: file,
        url: result.secure_url,
      });

      console.log(`✅ Đã upload: ${file}`);
    } catch (err) {
      console.error(`❌ Lỗi khi upload ${file}: ${err.message}`);
    }
  }

  // Lưu vào file JSON
  fs.writeFileSync(outputFile, JSON.stringify(uploadedImages, null, 2), "utf-8");
  console.log(`\n📁 Đã lưu kết quả vào: ${outputFile}`);
};

// Gọi hàm
uploadImages();
