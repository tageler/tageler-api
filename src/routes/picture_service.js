// Multer Middleware
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/pictures/tageler_pictures')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const Upload = module.exports =  multer({storage:storage});