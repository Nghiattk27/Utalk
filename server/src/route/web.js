import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import appRoot from 'app-root-path';
import multer from "multer";
import path from 'path';
require('dotenv').config();

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
        cb(null, appRoot + "/src/public/image");
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {

    if (!file.originalname.match(/\.(mp3|jpeg|png|jpg)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
    fileFilter: imageFilter
});

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD)

    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.put('/put-crud', homeController.putCRUD);
    router.post('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.getNewAccount)
    router.get('/api/getUserInfo', userController.getUserInfo)
    router.put('/api/updateUser', userController.updateUser)
    router.post('/api/uploadFile', upload.single('file'), fileSizeLimitErrorHandler, userController.handleUploadFile)
    router.post('/api/uploadAvatar', upload.single('file'), fileSizeLimitErrorHandler, userController.updateAvatar)
    router.get('/api/getPosts', userController.getPosts)

    return app.use("/", router);
}
module.exports = initWebRoutes;