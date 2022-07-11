import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD)

    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.put('/put-crud', homeController.putCRUD);
    router.post('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.getNewAccount)
    router.get('/api/getUserInfo', userController.getUserInfo)
    router.put('/api/updateUser', userController.updateUser)

    return app.use("/", router);
}

module.exports = initWebRoutes;