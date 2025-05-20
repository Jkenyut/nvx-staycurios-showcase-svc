const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema(
    {
        nameCertificate: {
            type: String,
            required: true,
        },
        avatarCertificate: {
            type: String,
            default: "static/certificates/aca.png",
        },
        organizationPublisherCertificate: {
            type: String,
            required: true,
        },
        descriptionCertificate: {
            type: String,
        },
        creatorCertificate: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        createdAtCertificate: {
            type: Date,
            required: true,
        },
        expiredAtCertificate: {type: Date},
        idCredentialCertificate: {type: String},
        urlCredentialCertificate: {type: String},
    },
    {timestamps: true}
);
module.exports = mongoose.model("certificate", certificateSchema);
