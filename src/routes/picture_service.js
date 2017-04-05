// Multer Middleware
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads/pictures/tageler_pictures')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const Upload =  multer({storage: storage});

module.exports = Upload;