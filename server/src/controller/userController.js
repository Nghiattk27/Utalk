import userService from '../service/userService';
import multer from 'multer';
import path from 'path';
import { createJWT, verifyToken } from '../middleware/JWTAction';
require('dotenv').config();


let handleLogin = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.json({
            message: "Thiếu tên đăng nhập hoặc mật khẩu"
        })
    }
    let userData = await userService.handleUserLogin(username, password);
    let payload = { userId: userData.id };
    let token = createJWT(payload);
    return res.status(200).json({
        message: userData.errMessage,
        userData,
        token,
    })
}

let getNewAccount = async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        return res.send("Missing input parameter")
    }
    let account = await userService.createNewAccount(username, password)
    res.send(account);
}

let getUserInfo = async (req, res) => {
    let token = req.cookies.token;
    let data = verifyToken(token);
    let visitor = data;
    let id = req.query.id;
    let user = await userService.getUserById(id);
    return res.json({
        user,
        visitor: visitor,
    });
}

let updateUser = async (req, res) => {
    await userService.updateUserInfo(req.body);
    return res.json({
        message: 'Cập nhật thông tin thành công',
    })
}

const upload = multer().single('file');

let handleUploadFile = async (req, res) => {
    let newPost = {};
    let post = {};
    post.title = req.body.title;
    post.userId = req.body.userId;
    post.amountLike = 0;

    upload(req, res, async function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        post.fileName = process.env.Audio.concat(req.file.filename);
        newPost = await userService.CreateNewPost(post);
        res.json({
            newPost,
        })
    });

}

let updateAvatar = async (req, res) => {

    let userId = req.body.userId;
    upload(req, res, async function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let avatar = process.env.Avatar.concat(req.file.filename);
        await userService.updateUserAvatar(avatar, userId);
    });

    res.send("Cập nhật ảnh đại diện thành công");
}

let getPosts = async (req, res) => {
    let userId = req.query.userId;
    let posts = await userService.getPostsbyUserId(userId);
    return res.send(posts);
}

let getVisitorInfo = async (req, res) => {
    let id = req.query.id;
    let user = await userService.getVisitorById(id);
    return res.json({
        user,
    });
}

let updatePostImage = async (req, res) => {

    let postId = req.body.postId;
    upload(req, res, async function (err) {

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let fileImage = process.env.PostImage.concat(req.file.filename);
        await userService.updatePostImage(fileImage, postId);
    });

    // res.send("Tạo bài đăng mới thành công");
}

let getAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();
    return res.json(
        users,
    )
}

let addPostLike = async (req, res) => {
    let visitorId = req.body.visitorId;
    let postId = req.body.postId;
    await userService.addPostLike(visitorId, postId);
    return res.send("add thanh cong")
}

let deletePostLike = async (req, res) => {
    let visitorId = req.body.visitorId;
    let postId = req.body.postId;
    await userService.deletePostLike(visitorId, postId);
    return res.send("xoa thanh cong")
}
let countAllPostLike = async (req, res) => {
    let visitorId = req.query.visitorId;
    let postId = req.query.postId;
    let allLike = await userService.countAllPostLike(visitorId, postId);
    return res.json({
        amount: allLike.amount,
        state: allLike.state,
    })
}
module.exports = {
    handleLogin: handleLogin,
    getNewAccount: getNewAccount,
    getUserInfo: getUserInfo,
    updateUser: updateUser,
    handleUploadFile: handleUploadFile,
    getPosts: getPosts,
    updateAvatar: updateAvatar,
    getVisitorInfo: getVisitorInfo,
    updatePostImage: updatePostImage,
    getAllUsers: getAllUsers,
    addPostLike: addPostLike,
    deletePostLike: deletePostLike,
    countAllPostLike: countAllPostLike,
}