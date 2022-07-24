import db from "../models/index";
import bcrypt from 'bcryptjs';
import { resolve } from "app-root-path";

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
                console.log(account);
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
            await db.Posts.create({
                user_id: post.userId,
                post_title: post.title,
                post_audio_path: post.fileName,
                amount_like: post.amountLike,
            })
            resolve();
        }
        catch (e) {
            reject(e)
        }
    })
}
let getPostsbyUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Posts.findAll({
                where: { user_id: userId }
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
module.exports = {
    handleUserLogin: handleUserLogin,
    createNewAccount: createNewAccount,
    getUserById: getUserById,
    updateUserInfo: updateUserInfo,
    CreateNewPost: CreateNewPost,
    getPostsbyUserId: getPostsbyUserId,
    updateUserAvatar: updateUserAvatar,
    getVisitorById: getVisitorById,
}