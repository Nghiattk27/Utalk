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
    router.put('/put-crud', homeController.putCRUD)
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
    router.post('/api/addPostComment', userController.addPostComment)
    router.post('/api/deletePostComment', userController.deletePostComment)
    router.put('/api/updatePostComment', userController.updatePostComment)
    router.get('/api/getAllPostComment', userController.getAllPostComment)
    router.get('/api/getUser', userController.getUser)
    router.post('/api/deletePost', userController.deletePost)
    router.post('/api/addFollower', userController.addFollower)
    router.get('/api/checkFollower', userController.checkFollower)
    router.post('/api/deleteFollower', userController.deleteFollower)
    router.get('/api/getFollower', userController.getFollower)

    return app.use("/", router);
}
module.exports = initWebRoutes;