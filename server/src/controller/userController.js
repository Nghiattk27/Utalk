import userService from '../service/userServive';
import multer from 'multer';
import path from 'path';
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
    return res.status(200).json({
        message: userData.errMessage,
        userData,
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
    let id = req.query.id;
    let user = await userService.getUserById(id);
    return res.send(user);
}

let updateUser = async (req, res) => {
    await userService.updateUserInfo(req.body);
    return res.json({
        message: 'Cập nhật thông tin thành công',
    })
}

const upload = multer().single('file');

let handleUploadFile = async (req, res) => {

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
        post.fileName = process.env.LocalHostPublic.concat(req.file.filename);
        await userService.CreateNewPost(post);
    });

    res.send("Tạo bài đăng mới thành công");
}

let getPosts = async (req, res) => {
    let userId = req.query.userId;
    let posts = await userService.getPostsbyUserId(userId);
    return res.send(posts);
}
module.exports = {
    handleLogin: handleLogin,
    getNewAccount: getNewAccount,
    getUserInfo: getUserInfo,
    updateUser: updateUser,
    handleUploadFile: handleUploadFile,
    getPosts: getPosts,
}