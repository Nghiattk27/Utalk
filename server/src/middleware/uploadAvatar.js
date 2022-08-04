import path from 'path';
import multer from "multer";
import appRoot from 'app-root-path';

const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
        res.send({
            errCode: 1,
            message: 'File quá lớn, file tải lên không thể vượt quá 100MB',
        }
        );
    } else {
        next()
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + "/src/public/avatar");
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const avatarFilter = function (req, file, cb) {

    if (!file.originalname.match(/\.(jpeg|png|jpg)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadAvatar = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
    fileFilter: avatarFilter
});

module.exports = {
    uploadAvatar: uploadAvatar.single('file'),
    fileSizeLimitErrorHandler,
}
