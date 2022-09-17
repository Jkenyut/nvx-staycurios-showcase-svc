const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    emailUser: {
      type: String,
      required: true,
      unique: true,
    },
    passwordUser: {
      type: String,
      required: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    usernameUser: {
      type: String,
      required: true,
      unique: true,
    },
    activeStatusUser: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    statusUser: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatarUser: {
      type: String,
      default: "static/images/avatar_default.jpg",
    },
    resetTokenPasswordUser: {
      type: String,
    },
    resetTokenExpiresPasswordUser: {
      type: Date,
    },
    cvUrl: {
      type: String,
      default: "static/images/avatar_default.jpg",
    },
    githubLinkUser: {
      type: String,
    },
    linkedinLinkUser: {
      type: String,
    },
    showcaseLinkUser: {
      type: String,
    },
    gmailLinkUser: {
      type: String,
    },
    educationUser: [
      {
        educationName: {
          type: String,
          required: true,
        },
        educationTitle: {
          type: String,
          required: true,
        },
        educationStudies: {
          type: String,
          required: true,
        },
        educationDescription: {
          type: String,
        },
        educationAvatar: {
          type: String,
          default: "static/images/avatar_default.jpg",
        },
        educationStartDate: {
          type: Date,
          required: true,
        },
        educationEndDate: {
          type: Date,
        },
      },
    ],
    itemsUser: {
      certificateId: [
        {
          type: Schema.Types.ObjectId,
          ref: "certificate",
        },
      ],
      projectId: [
        {
          type: Schema.Types.ObjectId,
          ref: "project",
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
