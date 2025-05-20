const Certificate = require("../models/certificate");
const {clearImageUrl} = require("../util/file");
const User = require("../models/user");
const validator = require("validator");

const createCertificate = async (parent, {userCertificateInput}, {req}, info) => {
    try {
        errors = [];
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found");
            error.code = 401;
            throw error;
        }
        const createCertificate = {};
        if (user._id.toString() !== req.userId) {
            const error = new Error("Not Authorization");
            error.code = 401;
            throw error;
        }
        if (userCertificateInput.name !== "undefined") {
            createCertificate.nameCertificate = userCertificateInput.name;
        }
        if (userCertificateInput.avatarCertificate !== "undefined") {
            createCertificate.avatarCertificate = userCertificateInput.avatar;
        }
        if (userCertificateInput.description) {
            createCertificate.descriptionCertificate = userCertificateInput.description;
        }

        if (userCertificateInput.organizer !== "undefined") {
            createCertificate.organizationPublisherCertificate = userCertificateInput.organizer;
        }

        createCertificate.creatorCertificate = req.userId;

        if (userCertificateInput.createdAt !== "01-01-2000") {
            createCertificate.createdAtCertificate = userCertificateInput.createdAt;
        }

        if (userCertificateInput.expiredAt) {
            createCertificate.expiredAtCertificate = userCertificateInput.expiredAt;
        }

        if (userCertificateInput.idCredential) {
            createCertificate.idCredentialCertificate = userCertificateInput.idCredential;
        }

        if (userCertificateInput.urlCredential) {
            createCertificate.urlCredentialCertificate = userCertificateInput.urlCredential;
        }

        const certificate = await Certificate.create(createCertificate);
        user.itemsUser.certificateId.push(certificate);
        await user.save();
        return {...certificate._doc};
    } catch (err) {
        throw err;
    }
};

updateCertificate = async (parent, {id, userCertificateInput}, {req}, info) => {
    try {
        errors = [];
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found");
            error.code = 401;
            throw error;
        }
        const certificate = await Certificate.findById(id);
        const createCertificate = {};
        if (user._id.toString() !== req.userId) {
            const error = new Error("Not Authorization");
            error.code = 401;
            throw error;
        }
        if (userCertificateInput.name !== "undefined") {
            createCertificate.nameCertificate = userCertificateInput.name;
        }

        if (userCertificateInput.avatar !== "undefined") {
            if (certificate.avatarCertificate) {
                clearImageUrl(certificate.avatarCertificate);
            }
            createCertificate.avatarCertificate = userCertificateInput.avatar;
        }

        if (userCertificateInput.description) {
            createCertificate.descriptionCertificate = userCertificateInput.description;
        }

        if (userCertificateInput.organizer !== "undefined") {
            createCertificate.organizationPublisherCertificate = userCertificateInput.organizer;
        }

        if (userCertificateInput.createdAt !== "01-01-2000") {
            createCertificate.createdAtCertificate = userCertificateInput.createdAt;
        }

        if (userCertificateInput.expiredAt) {
            createCertificate.expiredAtCertificate = userCertificateInput.expiredAt;
        }

        if (userCertificateInput.idCredential) {
            createCertificate.idCredentialCertificate = userCertificateInput.idCredential;
        }

        if (userCertificateInput.urlCredential) {
            createCertificate.urlCredentialCertificate = userCertificateInput.urlCredential;
        }

        await Certificate.findByIdAndUpdate(id, createCertificate);

        return await Certificate.findById(id).populate("creatorCertificate");
    } catch (err) {
        throw err;
    }
};

const deleteCertificate = async (parent, {id}, {req}, info) => {
    try {
        errors = [];
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found");
            error.code = 401;
            throw error;
        }

        if (user._id.toString() !== req.userId) {
            const error = new Error("Not Authorization");
            error.code = 401;
            throw error;
        }
        const certificate = await Certificate.findById(id);
        clearImageUrl(certificate.avatarCertificate);
        await Certificate.findByIdAndDelete(id);
        user.itemsUser.certificateId.pop(id);
        await user.save();
        return true;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createCertificate,
    updateCertificate,
    deleteCertificate,
};
