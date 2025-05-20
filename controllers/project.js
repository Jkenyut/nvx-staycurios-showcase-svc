const User = require("../models/user");
const Project = require("../models/project");
const validator = require("validator");
const {clearImageUrl} = require("../util/file");

const getAllProjects = async (parent, {page}, context, info) => {
    try {
        if (!page) {
            page = 1;
        }
        const perPage = 6;
        const totalProjects = await Project.find().countDocuments();
        const project = await Project.find()
            .populate("creatorProject")
            .skip((page - 1) * perPage)
            .limit(perPage);
        return {
            projects: project.map((p) => {
                return {...p._doc};
            }),
            totalProjects: totalProjects,
        };
    } catch (err) {
        throw err;
    }
};

const createProject = async (parent, {UserProjectInput}, {req}, info) => {
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
        const createProject = {
            featuresProject: [],
            categoriesProject: [],
        };
        if (UserProjectInput.name !== "undefined") {
            createProject.nameProject = UserProjectInput.name;
        }
        if (UserProjectInput.description !== "undefined") {
            createProject.descriptionProject = UserProjectInput.description;
        }
        if (UserProjectInput.github) {
            if (!validator.isURL(UserProjectInput.github)) {
                errors.push({
                    message: "Url Github is not a valid",
                });
            }
            createProject.githubLinkProject = UserProjectInput.github;
        }
        if (UserProjectInput.youtube) {
            if (!validator.isURL(UserProjectInput.youtube)) {
                errors.push({
                    message: "Url Youtube is not a valid",
                });
            }
            createProject.youtubeLinkProject = UserProjectInput.youtube;
        }
        if (UserProjectInput.googleCollab) {
            if (!validator.isURL(UserProjectInput.googleCollab)) {
                errors.push({
                    message: "Url GoogleCollab is not a valid",
                });
            }
            createProject.googleCollabLinkProject = UserProjectInput.googleCollab;
        }
        if (UserProjectInput.features) {
            UserProjectInput.features.map((p) => {
                createProject.featuresProject.push(p);
            });
        }
        if (UserProjectInput.category) {
            UserProjectInput.category.map((p) => {
                createProject.categoriesProject.push(p.toLowerCase());
            });
        }
        if (UserProjectInput.avatar !== "undefined") {
            createProject.avatarProject = UserProjectInput.avatar;
        }
        createProject.creatorProject = req.userId;

        if (UserProjectInput.createdAt !== "01-01-2000") {
            createProject.createdAtProject = UserProjectInput.createdAt;
        }

        const addProject = await Project.create(createProject);
        user.itemsUser.projectId.push(addProject);
        await user.save();
        return {...addProject._doc};
    } catch (err) {
        throw err;
    }
};

const updateProject = async (parent, {id, UserProjectInput}, {req}, info) => {
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
        const project = await Project.findById(id);
        const createProject = {
            featuresProject: [],
            categoriesProject: [],
        };
        if (UserProjectInput.name !== "undefined") {
            createProject.nameProject = UserProjectInput.name;
        }
        if (UserProjectInput.description !== "undefined") {
            createProject.descriptionProject = UserProjectInput.description;
        }

        if (UserProjectInput.github) {
            if (!validator.isURL(UserProjectInput.github)) {
                errors.push({
                    message: "Url Github is not a valid",
                });
            }
            createProject.githubLinkProject = UserProjectInput.github;
        }

        if (UserProjectInput.youtube) {
            if (!validator.isURL(UserProjectInput.youtube)) {
                errors.push({
                    message: "Url Youtube is not a valid",
                });
            }
            createProject.youtubeLinkProject = UserProjectInput.youtube;
        }
        if (UserProjectInput.googleCollab) {
            if (!validator.isURL(UserProjectInput.googleCollab)) {
                errors.push({
                    message: "Url GoogleCollab is not a valid",
                });
            }
            createProject.googleCollabLinkProject = UserProjectInput.googleCollab;
        }
        if (UserProjectInput.features) {
            UserProjectInput.features.map((p) => {
                createProject.featuresProject.push(p);
            });
        }
        if (UserProjectInput.category) {
            UserProjectInput.category.map((p) => {
                createProject.categoriesProject.push(p.toLowerCase());
            });
        }
        if (UserProjectInput.avatar !== "undefined") {
            clearImageUrl(project.avatarProject);
            createProject.avatarProject = UserProjectInput.avatar;
        }

        if (UserProjectInput.createdAt !== "01-01-2000") {
            createProject.createdAtProject = UserProjectInput.createdAt;
        }

        const updateProject = await Project.findByIdAndUpdate(id, createProject);
        return await Project.findById(id).populate("creatorProject");
    } catch (err) {
        throw err;
    }
};
const deleteProject = async (parent, {id}, {req}, info) => {
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
        const project = await Project.findById(id);
        clearImageUrl(project.avatarProject);
        await project.avatarDetailsProject.map((data) => {
            clearImageUrl(data.imageDetailProject);
        });
        await Project.findByIdAndDelete(id);
        user.itemsUser.projectId.pop(id);
        await user.save();
        return true;
    } catch (err) {
        throw err;
    }
};
const createDetailsProject = async (parent, {id, UserDetailsProjectInput}, {req}, info) => {
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

        const detailsProject = {};
        if (UserDetailsProjectInput.avatar !== "undefined") {
            detailsProject.imageDetailProject = UserDetailsProjectInput.avatar;
        }
        if (UserDetailsProjectInput.description !== "undefined") {
            detailsProject.imageDescriptionDetailProject = UserDetailsProjectInput.description;
        }
        await Project.findByIdAndUpdate(id, {
            $push: {avatarDetailsProject: detailsProject},
        });
        return await Project.findById(id).populate("creatorProject");
    } catch (err) {
        throw err;
    }
};

const updateDetailsProject = async (
    parent,
    {idProject, idDetail, UserDetailsProjectInput},
    {req},
    info
) => {
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
        const project = await Project.findById(idProject);
        const detailsProject = {};
        if (UserDetailsProjectInput.avatar !== "undefined") {
            await project.avatarDetailsProject.map((data) => {
                if (data) {
                    if (data._id.toString() === id) {
                        if (data.imageDetailProject) {
                            clearImageUrl(data.imageDetailProject);
                        }
                    }
                }
            });
            detailsProject.imageDetailProject = UserDetailsProjectInput.avatar;
        }
        if (UserDetailsProjectInput.description !== "undefined") {
            detailsProject.imageDescriptionDetailProject = UserDetailsProjectInput.description;
        }
        await Project.findByIdAndUpdate(
            idProject,
            {$set: {"avatarDetailsProject.$[inner]": detailsProject}},
            // prettier-ignore
            {arrayFilters: [{"inner._id": idDetail}]}
        );
        return await Project.findById(idProject).populate("creatorProject");
    } catch (err) {
        throw err;
    }
};
const deleteDetailsProject = async (parent, {idProject, idDetail}, {req}, info) => {
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
        const project = await Project.findById(idProject);
        clearImageUrl(project.avatarDetailsProject.imageDetailProject);
        await Project.findByIdAndUpdate(idProject, {
            $pull: {avatarDetailsProject: {_id: idDetail}},
        });
        return true;
    } catch (err) {
        throw err;
    }
};
module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    createDetailsProject,
    updateDetailsProject,
    deleteDetailsProject,
};
