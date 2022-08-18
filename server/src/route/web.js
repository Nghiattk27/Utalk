import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import cookieParser from 'cookie-parser';
import { uploadAvatar, fileSizeLimitErrorHandler } from "../middleware/uploadAvatar";
import { uploadAudio } from "../middleware/uploadAudio";
import { uploadPostImage } from "../middleware/uploadPostImage";
require('dotenv').config();

let router = express.Router();

router.use(cookieParser());

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
    router.post('/api/uploadFile', uploadAudio, fileSizeLimitErrorHandler, userController.handleUploadFile)
    router.post('/api/uploadAvatar', uploadAvatar, fileSizeLimitErrorHandler, userController.updateAvatar)
    router.post('/api/uploadPostImage', uploadPostImage, fileSizeLimitErrorHandler, userController.updatePostImage)
    router.get('/api/getPosts', userController.getPosts)
    router.get('/api/getVisitorInfo', userController.getVisitorInfo)
    router.get('/api/getAllUsers', userController.getAllUsers)
    router.post('/api/addPostLike', userController.addPostLike)
    router.post('/api/deletePostLike', userController.deletePostLike)
    router.get('/api/countAllPostLike', userController.countAllPostLike)

    return app.use("/", router);
}
module.exports = initWebRoutes;