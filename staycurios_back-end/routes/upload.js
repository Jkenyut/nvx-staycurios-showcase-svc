const express = require("express");
const router = express.Router();
const uploadControllers = require("../controllers/upload");
const utilUploads = require("../util/uploads");

router.post("/post-avatar-user", utilUploads.avatarUser, uploadControllers.upload);
router.post("/post-avatar-cv", utilUploads.cvUrl, uploadControllers.upload);
router.post("/post-avatar-education", utilUploads.educationAvatar, uploadControllers.upload);

router.post("/post-avatar-project", utilUploads.avatarProject, uploadControllers.upload);
router.post("/post-avatar-detail", utilUploads.detailsProject, uploadControllers.upload);

router.post("/post-avatar-certifcate", utilUploads.avatarCertificate, uploadControllers.upload);

module.exports = router;
