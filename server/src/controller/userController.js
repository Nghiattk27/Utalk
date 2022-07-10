import userService from '../service/userServive';
import bcrypt from 'bcryptjs';

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
        userId: userData.userId,
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
module.exports = {
    handleLogin: handleLogin,
    getNewAccount: getNewAccount,
    getUserInfo: getUserInfo,
}