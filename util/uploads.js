const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorageAvatarUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatarUser/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-avatarUser." + path.extname(file.originalname).split(".")[1]);
    },
});
const avatarUser = multer({
    storage: fileStorageAvatarUser,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-user");

const fileStorageCvUrl = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/cvUrl/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-cvUrl." + path.extname(file.originalname).split(".")[1]);
    },
});
const cvUrl = multer({
    storage: fileStorageCvUrl,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-cv");

const fileStorageEducationAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/educationAvatar/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-educationAvatar." + path.extname(file.originalname).split(".")[1]);
    },
});

const educationAvatar = multer({
    storage: fileStorageEducationAvatar,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-education");

const fileStorageAvatarProject = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatarProject/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-avatarProject." + path.extname(file.originalname).split(".")[1]);
    },
});
const avatarProject = multer({
    storage: fileStorageAvatarProject,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-project");

const fileStorageImageDetailsProject = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/imageDetailsProject/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-imageDetailsProject." + path.extname(file.originalname).split(".")[1]);
    },
});
const detailsProject = multer({
    storage: fileStorageImageDetailsProject,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-detail");

const fileStorageAvatarCertificate = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatarCertificate/");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-avatarCertificate." + path.extname(file.originalname).split(".")[1]);
    },
});

const avatarCertificate = multer({
    storage: fileStorageAvatarCertificate,
    fileFilter: fileFilter,
    limits: {fieldSize: 3145728},
}).single("avatar-certificate");

module.exports = {
    avatarUser,
    cvUrl,
    educationAvatar,
    avatarProject,
    detailsProject,
    avatarCertificate,
};
