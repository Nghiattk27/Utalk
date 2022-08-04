import path from 'path';
import multer from "multer";
import appRoot from 'app-root-path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + "/src/public/audio");
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const audioFilter = function (req, file, cb) {

    if (!file.originalname.match(/\.(mp3|wav|ogg)$/)) {
        req.fileValidationError = 'Only audio files are allowed!';
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};

let uploadAudio = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
    fileFilter: audioFilter
});

module.exports = {
    uploadAudio: uploadAudio.single('file'),
}
