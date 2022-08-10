import path from 'path';
import multer from "multer";
import appRoot from 'app-root-path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + "/src/public/postImage");
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const postImageFilter = function (req, file, cb) {

    if (!file.originalname.match(/\.(jpeg|png|jpg)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadPostImage = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
    fileFilter: postImageFilter
});

module.exports = {
    uploadPostImage: uploadPostImage.single('imgFile'),
}
