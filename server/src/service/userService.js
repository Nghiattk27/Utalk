import db from "../models/index";
import bcrypt from 'bcryptjs';
import { Sequelize } from "../models/index";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUsername(username);
            if (isExist) {
                let account = await db.Accounts.findOne({
                    where: { account_username: username },
                    raw: true,
                })
                if (account) {
                    let check = bcrypt.compareSync(password, account.account_password);
                    if (check) {
                        let user = await db.User.findOne({
                            where: { id: account.user_id },
                            raw: true,
                        })
                        userData = user;
                        userData.errMessage = "Đăng nhập thành công";
                        resolve(userData);
                    }
                    else {
                        userData.errMessage = 'Sai mật khẩu';
                        resolve(userData);
                    }
                }
                else {
                    userData.errMessage = 'Không tìm thấy người dùng';
                }
            } else {
                userData.errMessage = 'Tên đăng nhập không tồn tại. Bạn có muốn đăng ký?'
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Accounts.findOne({
                where: { account_username: username }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createNewAccount = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcryt = await hashPassword(password)
            let isUser = await checkUsername(username)
            if (isUser) {
                resolve('Username exists!')
            }
            else {
                let account = await db.Accounts.create({
                    account_username: username,
                    account_password: hashPasswordFromBcryt,
                    raw: true,
                })
                let user = await createNewUser(username);
                account.user_id = user.id;
                await account.save();
            }
            resolve('A new account created')
        } catch (e) {
            reject(e);
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            return resolve(user);
        } catch (e) {
            reject(e)
        }
    })
}

let getVisitorById = (visitorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: visitorId }
            })
            return resolve(user);
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await db.Accounts.findOne({
                where: { account_username: username },
                raw: true,
            })
            if (account) {
                let user = await db.User.create({
                    account_id: account.id,
                    raw: true,
                })
                resolve(user);
            }
            else {
                resolve({});
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.first_name = data.first_name
                user.last_name = data.last_name
                user.email = data.email

                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

let CreateNewPost = (post) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newPost = await db.Posts.create({
                user_id: post.userId,
                post_title: post.title,
                post_audio_path: post.fileName,
                amount_like: post.amountLike,
            })
            resolve(newPost);
        }
        catch (e) {
            reject(e)
        }
    })
}

let getPostsbyUserId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Posts.findAll({
                where: { user_id: id }
            })
            resolve(posts);
        }
        catch (e) {
            reject(e)
        }
    })
}

let updateUserAvatar = (avatar, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                user.user_avatar = avatar;
                await user.save();
                resolve();
            }
            else {
                resolve();
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let updatePostImage = (fileImage, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Posts.findOne({
                where: { id: postId }
            })
            if (post) {
                post.post_image_path = fileImage;
                await post.save();
                resolve();
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }

    })
}

let addPostLike = (visitorId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Post_likes.create({
                user_id: visitorId,
                post_id: postId,
                raw: true,
            })
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let deletePostLike = (visitorId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Post_likes.destroy({
                where: {
                    user_id: visitorId,
                    post_id: postId,
                }
            })
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let countAllPostLike = (visitorId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const amount = await db.Post_likes.count({
                where: {
                    post_id: postId,
                }
            })
            let state = false;
            const like = await db.Post_likes.findOne({
                where: {
                    user_id: visitorId,
                    post_id: postId,
                }
            })
            if (like != null) {
                state = true;
            }
            resolve({ amount, state });
        } catch (e) {
            reject(e);
        }
    })
}

let addPostComment = (visitorId, postId, content) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newComment = await db.Post_comments.create({
                content: content,
                user_id: visitorId,
                post_id: postId,
            })
            resolve(newComment);
        } catch (e) {
            reject(e);
        }
    })
}

let deletePostComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Post_comments.destroy(
                {
                    where: {
                        id: id,
                    }
                })
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let updatePostComment = (id, content) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await db.Post_comments.findOne({
                where: { id: id }
            })
            if (comment) {
                comment.content = content
                await comment.save();
                resolve();
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllPostComment = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allComment = await db.Post_comments.findAll({
                where: {
                    post_id: postId
                }
            });
            resolve(allComment)
        } catch (e) {
            reject(e)
        }
    })
}

let deletePostById = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Posts.destroy({
                where: {
                    id: postId,
                }
            })

            await db.Post_likes.destroy({
                where: {
                    post_id: postId,
                }
            })

            await db.Post_comments.destroy({
                where: {
                    post_id: postId,
                }
            })

            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

let addFollower = (userId, followerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Followers.create({
                user_id: userId,
                follower_id: followerId,
            })
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let checkFollower = (userId, followerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await db.Followers.findOne(
                {
                    where: {
                        user_id: userId,
                        follower_id: followerId,
                    }
                })
            if (check === null) (
                resolve(false)
            )
            else resolve(true);
        } catch (e) {
            reject(e);
        }
    })
}

let deleteFollower = (userId, followerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Followers.destroy({
                where: {
                    user_id: userId,
                    follower_id: followerId,
                }
            })
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

let getFollower = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const followers = await db.Followers.findAll(
                {
                    where: {
                        follower_id: userId
                    }
                }
            )
            resolve(followers);
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    createNewAccount: createNewAccount,
    getUserById: getUserById,
    updateUserInfo: updateUserInfo,
    CreateNewPost: CreateNewPost,
    getPostsbyUserId: getPostsbyUserId,
    updateUserAvatar: updateUserAvatar,
    getVisitorById: getVisitorById,
    updatePostImage: updatePostImage,
    getAllUsers: getAllUsers,
    addPostLike: addPostLike,
    deletePostLike: deletePostLike,
    countAllPostLike: countAllPostLike,
    addPostComment: addPostComment,
    deletePostComment: deletePostComment,
    updatePostComment: updatePostComment,
    getAllPostComment: getAllPostComment,
    deletePostById: deletePostById,
    addFollower: addFollower,
    checkFollower: checkFollower,
    deleteFollower: deleteFollower,
    getFollower: getFollower,
}