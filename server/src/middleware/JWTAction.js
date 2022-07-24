import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token);
    }
    catch (e) {
        console.log(e);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        data = jwt.verify(token, key);
    }
    catch (e) {
        // console.log(e);
    }
    return data;
}

module.exports = {
    createJWT, verifyToken
}