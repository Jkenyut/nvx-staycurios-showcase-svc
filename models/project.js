const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        nameProject: {
            type: String,
            required: true,
        },
        descriptionProject: {
            type: String,
            required: true,
        },
        githubLinkProject: {
            type: String,
        },
        youtubeLinkProject: {
            type: String,
        },
        googleCollabLinkProject: {
            type: String,
        },
        featuresProject: [String],
        categoriesProject: [String],
        avatarProject: {
            type: String,
            default: "static/images/avatar_default.jpg",
        },
        avatarDetailsProject: [
            {
                imageDetailProject: {
                    type: String,
                    required: true,
                },
                imageDescriptionDetailProject: {
                    type: String,
                    required: true,
                },
            },
        ],
        creatorProject: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        createdAtProject: {
            type: Date,
            required: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("project", projectSchema);
