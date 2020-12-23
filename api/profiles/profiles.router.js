const { 
    updateProfile,
    getProfileByUserId
} = require('./profiles.controller');
const { checkToken } = require("../../auth/token_validation");
const router = require("express").Router();


router.get("/:id", checkToken,getProfileByUserId);
router.patch("/", checkToken,updateProfile);

module.exports = router;
