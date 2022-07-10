import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewAccount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcryt = await hashPassword(data.password);
            await db.Accounts.create({
                account_username: data.username,
                account_password: hashPasswordFromBcryt
            })
            resolve('')
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: { id: userId },
                raw: true,
            })

            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}
let updateuserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.first_name = data.firstName
                user.last_name = data.last_name

                await user.save()
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }
            else {
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteCRUD = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewAccount: createNewAccount,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateuserData: updateuserData,
    deleteCRUD: deleteCRUD,
}