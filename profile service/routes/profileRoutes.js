const router = require("express").Router();
const authMiddleware = require("../authMiddleware");
const { allMentorsController, getUserDetailsController, followMentorController, getAllMenteesController } = require("../controllers/mentorsController");
const { 
    MyProfileDetailsController,
    addEducationController,
    addSkillsController,
    addExperienceController,
    updateProfileController,
    updateProfilePictureController,
    updateCoverPictureController,
    deleteUserPictureController,
    followingMentorsContoller
} = require("../controllers/profileController");

//get profile details
router.post("/profile", authMiddleware, MyProfileDetailsController );

//add education
router.post("/profile/education", authMiddleware, addEducationController);

//add skills
router.post("/profile/skills", authMiddleware, addSkillsController);

//add experience
router.post("/profile/experience", authMiddleware, addExperienceController);

//update profile details
router.post("/profile/details", authMiddleware, updateProfileController);

//update profile picture
router.post("/profile/picture/profile", authMiddleware, updateProfilePictureController);

//update cover picture
router.post("/profile/picture/cover", authMiddleware, updateCoverPictureController);

//update cover picture
router.delete("/profile/picture/:imageType", authMiddleware, deleteUserPictureController);

//get list of all mentors
router.get("/users/mentors", authMiddleware, allMentorsController)

//get profile details of a specific user
router.get("/users/:userID/profile", getUserDetailsController)

//follow a mentor
router.post("/users/follow", authMiddleware, followMentorController)

//get following mentors list
router.get("/following", authMiddleware, followingMentorsContoller)


//get following mentors list
router.get("/followers", authMiddleware, getAllMenteesController)

module.exports = router;