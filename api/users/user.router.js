const { 
    createUser, 
    getUsers, 
    getUserByUserId, 
    getUserByUsername,
    updateUser, 
    deleteUserById, 
    deleteUserByUsername, 
    login,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/",createUser);
router.get("/", checkToken, getUsers);
router.get("/id/:id", checkToken, getUserByUserId);
router.get("/username/:username", checkToken, getUserByUsername);
router.patch("/", checkToken, updateUser);
router.delete("/delete/id/:id", checkToken, deleteUserById);
router.delete("/delete/username/:username", checkToken,deleteUserByUsername);
router.post("/login", login);


module.exports = router;