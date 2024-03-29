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
    let id = req.query.id;
    let posts = await userService.getPostsbyUserId(id);
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

let addPostComment = async (req, res) => {
    let visitorId = req.body.visitorId;
    let postId = req.body.postId;
    let content = req.body.content;
    const newComment = await userService.addPostComment(visitorId, postId, content);
    return res.json(newComment)
}

let deletePostComment = async (req, res) => {
    let id = req.body.id;
    await userService.deletePostComment(id);
    return res.send("xoa comment thanh cong")
}

let updatePostComment = async (req, res) => {
    let id = req.body.id;
    let content = req.body.content;
    await userService.updatePostComment(id, content);
    return res.send("cap nhat comment thanh cong")
}

let getAllPostComment = async (req, res) => {
    let postId = req.query.postId;
    let comments = await userService.getAllPostComment(postId);
    return res.json({
        comments,
    })
}

let getUser = async (req, res) => {
    let id = req.query.id;
    let user = await userService.getUserById(id);
    res.json(user);
}

let deletePost = async (req, res) => {
    let postId = req.body.postId;
    await userService.deletePostById(postId);
    res.send("xoa bai thanh cong");
}

let addFollower = async (req, res) => {
    let userId = req.body.userId;
    let followerId = req.body.followerId;
    await userService.addFollower(userId, followerId);
    res.send("Follow thanh cong")
}

let checkFollower = async (req, res) => {
    let userId = req.query.userId;
    let followerId = req.query.followerId;
    let check = await userService.checkFollower(userId, followerId);
    res.json(check);
}

let deleteFollower = async (req, res) => {
    let userId = req.body.userId;
    let followerId = req.body.followerId;
    await userService.deleteFollower(userId, followerId);
    res.send("xoa follower thanh cong")
}

let getFollower = async (req, res) => {
    let userId = req.query.userId;
    let followers = await userService.getFollower(userId);
    res.json(followers);
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
    addPostComment: addPostComment,
    deletePostComment: deletePostComment,
    updatePostComment: updatePostComment,
    getAllPostComment: getAllPostComment,
    getUser: getUser,
    deletePost: deletePost,
    addFollower: addFollower,
    checkFollower: checkFollower,
    deleteFollower: deleteFollower,
    getFollower: getFollower,
}