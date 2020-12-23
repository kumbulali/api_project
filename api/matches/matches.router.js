const { createMatch, updateMacVeri, getInfo, getMatchInfoOfPlayer }=require('./matches.controller');
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken,createMatch);
router.patch("/", checkToken,updateMacVeri);
router.get("/:mac_id", checkToken,getInfo);
router.get("/user/:user_id", checkToken,getMatchInfoOfPlayer);

module.exports = router;