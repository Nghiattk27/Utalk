import db from '../models/index';
import CRUDservice from '../service/crudService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.send({
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.send("abc")
}

let getCRUD = (req, res) => {
    return res.send('get CRUD with ERIC ')
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewAccount(req, res);
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId)

    }
    else {
        console.log("User not found!")
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateuserData(data);
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteCRUD(id);
    }
    else {
    }

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}