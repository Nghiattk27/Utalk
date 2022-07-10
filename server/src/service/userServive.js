import db from "../models/index";
import bcrypt from 'bcryptjs';

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
                        userData.errMessage = "Đăng nhập thành công";
                        userData.userId = user.id;
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

module.exports = {
    handleUserLogin: handleUserLogin,
    createNewAccount: createNewAccount,
    getUserById: getUserById,
}