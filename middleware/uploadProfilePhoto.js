const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'avatar-' + Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only images allowed'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed'));
    }
  }
});

module.exports = upload;
