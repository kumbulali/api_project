const { 
    createProfile,
    updateProfile,
    getProfileByUserId
} = require('./profiles.controller');


const router = require("express").Router();



router.post("/",createProfile);
router.get("/:id", getProfileByUserId);
router.patch("/",updateProfile);

module.exports = router;
