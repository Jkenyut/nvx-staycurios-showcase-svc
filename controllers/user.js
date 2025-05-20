const User = require("../models/user");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const Project = require("../models/project");
const Certificate = require("../models/certificate");
const {clearImageUrl} = require("../util/file");

const getUserProfile = async (parent, args, {req}, info) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error("User not found");
            error.code = 401;
            throw error;
        }

        return {...user._doc};
    } catch (err) {
        throw err;
    }
};

const updateProfile = async (parent, {userProfileInput}, {req}, info) => {
    try {
        errors = [];

        const user = await User.findById(req.userId)
            .populate("itemsUser.projectId")
            .populate("itemsUser.certificateId");

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

        user.nameUser = userProfileInput.name;

        if (userProfileInput.username !== "undefined") {
            const existingUserName = await User.findOne({
                usernameUser: userProfileInput.username,
            });
            if (existingUserName) {
                const error = new Error("Username alread exists, please change your username");
                error.code = 401;
                throw error;
            }
            user.usernameUser = userProfileInput.username;
        }

        if (userProfileInput.github) {
            if (!validator.isURL(userProfileInput.github)) {
                errors.push({
                    message: "Url Github is not a valid",
                });
            }
            user.githubLinkUser = userProfileInput.github;
        }

        if (userProfileInput.linkedin) {
            if (!validator.isURL(userProfileInput.linkedin)) {
                errors.push({
                    message: "Url LinkedIn is not a valid",
                });
            }
            user.linkedinLinkUser = userProfileInput.linkedin;
        }

        if (userProfileInput.gmail) {
            if (!validator.isEmail(userProfileInput.email)) {
                errors.push({message: "E-mail is invalid."});
            }
            user.gmailLinkUser = userProfileInput.gmail;
        }

        if (userProfileInput.showcase) {
            if (!validator.isURL(userProfileInput.showcase)) {
                errors.push({
                    message: "Url Showcase is not a valid",
                });
            }
            user.showcaseLinkUser = userProfileInput.showcase;
        }
        if (userProfileInput.cvUrl) {
            clearImageUrl(user.cvUrl);
            user.cvUrl = userProfileInput.cvUrl;
        }
        if (userProfileInput.imageUrl !== "undefined") {
            clearImageUrl(user.avatarUser);
            user.avatarUser = userProfileInput.imageUrl;
        }
        if (errors.length > 0) {
            const error = new Error("invalid Input");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        console.log(user);
        const updateProfile = await user.save();
        return {...updateProfile._doc};
    } catch (err) {
        throw err;
    }
};

const deleteUser = async (parent, {id, password}, {req}, info) => {
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
        const passwordEquals = await bcryptjs.compare(password, user.passwordUser);
        if (!passwordEquals) {
            const error = new Error("password incorrect");
            error.code = 401;
            throw error;
        }

        const project = await Project.find({creatorProject: user._id});

        await project.map((data) => {
            if (data.avatarProject) {
                console.log(data.avatarProject);
                clearImageUrl(data.avatarProject);
            }
            if (data.avatarDetailsProject) {
                data.avatarDetailsProject.map((data) => {
                    if (data.imageDetailProject) {
                        console.log(data.imageDetailProject);
                        clearImageUrl(data.imageDetailProject);
                    }
                });
            }
        });
        const certificate = await Certificate.find({creatorCertificate: user._id});
        await certificate.map((data) => {
            console.log(data.avatarCertificate);
            clearImageUrl(data.avatarCertificate);
        });
        await user.educationUser.map((data) => {
            if (data) {
                clearImageUrl(data.educationAvatar);
            }
        });

        await Project.deleteMany({creatorProject: user._id});
        await Certificate.deleteMany({creatorCertificate: user._id});
        clearImageUrl(user.cvUrl);
        clearImageUrl(user.avatarUser);

        await User.findByIdAndDelete(req.userId);
        return true;
    } catch (err) {
        throw err;
    }
};

const createEducation = async (parent, {userEducationInput}, {req}, info) => {
    try {
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
        const updateEducationInput = {};
        if (userEducationInput.name !== "undefined") {
            const educationName = userEducationInput.name;
            updateEducationInput.educationName = educationName;
        }

        if (userEducationInput.title !== "undefined") {
            const educationTitle = userEducationInput.title;
            updateEducationInput.educationTitle = educationTitle;
        }
        if (userEducationInput.studies !== "undefined") {
            const educationStudies = userEducationInput.studies;

            updateEducationInput.educationStudies = educationStudies;
        }
        if (userEducationInput.description) {
            const educationDescription = userEducationInput.description;

            updateEducationInput.educationDescription = educationDescription;
        }
        if (userEducationInput.avatar !== "undefined") {
            const educationAvatar = userEducationInput.avatar;
            updateEducationInput.educationAvatar = educationAvatar;
        }
        if (userEducationInput.start !== "01-01-2000") {
            const educationStartDate = userEducationInput.start;
            updateEducationInput.educationStartDate = educationStartDate;
        }
        if (userEducationInput.end) {
            const educationEndDate = userEducationInput.end;
            updateEducationInput.educationEndDate = educationEndDate;
        }

        await User.findByIdAndUpdate(req.userId, {
            $push: {
                educationUser: updateEducationInput,
            },
        });

        return await User.findById(req.userId);
    } catch (err) {
        throw err;
    }
};

const updateEducation = async (parent, {id, userEducationInput}, {req}, info) => {
    try {
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
        const updateEducationInput = {};
        if (userEducationInput.name !== "undefined") {
            const educationName = userEducationInput.name;
            updateEducationInput.educationName = educationName;
        }

        if (userEducationInput.title !== "undefined") {
            const educationTitle = userEducationInput.title;
            updateEducationInput.educationTitle = educationTitle;
        }
        if (userEducationInput.studies !== "undefined") {
            const educationStudies = userEducationInput.studies;
            updateEducationInput.educationStudies = educationStudies;
        }
        if (userEducationInput.description) {
            const educationDescription = userEducationInput.description;
            updateEducationInput.educationDescription = educationDescription;
        }
        if (userEducationInput.avatar !== "undefined") {
            const educationAvatar = userEducationInput.avatar;

            await user.educationUser.map((data) => {
                if (data) {
                    if (data._id.toString() === id) {
                        if (data.educationAvatar) {
                            clearImageUrl(data.educationAvatar);
                        }
                    }
                }
            });
            // clearImageUrl(data.educationAvatar);
            updateEducationInput.educationAvatar = educationAvatar;
        }
        if (userEducationInput.start !== "01-01-2000") {
            const educationStartDate = userEducationInput.start;
            updateEducationInput.educationStartDate = educationStartDate;
        }
        if (userEducationInput.end) {
            const educationEndDate = userEducationInput.end;
            updateEducationInput.educationEndDate = educationEndDate;
        }

        // const educationIndex = user.educationUser.findIndex((p) => {
        //   return p._id.toString() === id.toString();
        // });
        // const updatedEducationUser = [...user.educationUser];
        // updatedEducationUser[educationIndex] = updateEducationInput;

        // const update = {
        //   educationUser: updatedEducationUser,
        // };

        // await User.findByIdAndUpdate(req.userId, {
        //   $set: update,
        // });

        await User.findByIdAndUpdate(
            req.userId,
            {$set: {"educationUser.$[inner]": updateEducationInput}},
            // prettier-ignore
            {arrayFilters: [{"inner._id": id}]}
        );

        return await User.findById(req.userId);
    } catch (err) {
        throw err;
    }
};

const deleteEducation = async (parent, {id}, {req}, info) => {
    try {
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
        await User.findByIdAndUpdate(req.userId, {
            $pull: {educationUser: {_id: id}},
        });
        return true;
    } catch (err) {
        throw err;
    }
};

const getAllUser = async (parent, {page}, {req}, info) => {
    if (!page) {
        page = 1;
    }
    const perPage = 6;
    const totalUsers = await User.find().countDocuments();
    // prettier-ignore
    const user = await User.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
    console.log(user);
    return {
        users: user.map((p) => {
            return {...p._doc};
        }),
        totalUsers: totalUsers,
    };
};

module.exports = {
    getUserProfile,
    getAllUser,

    updateProfile,
    deleteUser,
    createEducation,
    updateEducation,
    deleteEducation,
};
