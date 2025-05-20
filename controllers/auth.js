const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const getUserLogin = async (parent, {email, password}, context, info) => {
    try {
        const user = await User.findOne({emailUser: email});
        if (!user) {
            const error = new Error("User not found");
            error.code = 401;
            throw error;
        }
        const passwordEquals = await bcryptjs.compare(password, user.passwordUser);
        if (!passwordEquals) {
            const error = new Error("password incorrect");
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {userId: user._id.toString(), email: user.emailUser},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "12h"}
        );
        return {token: token, userId: user._id.toString()};
    } catch (err) {
        throw err;
    }
};

const createUser = async (parent, {userSignUpInput}, context, info) => {
    try {
        const errors = [];
        if (!validator.isEmail(userSignUpInput.email)) {
            errors.push({message: "E-mail is invalid."});
        }
        if (
            validator.isEmpty(userSignUpInput.password) ||
            !validator.isStrongPassword(userSignUpInput.password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1,
                returnScore: true,
            })
        ) {
            errors.push({
                message: "Password is too short, must 8 characters with lowercase uppercase and symbols",
            });
        }

        if (errors.length > 0) {
            const error = new Error("invalid Input");
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUserEmail = await User.findOne({
            emailUser: userSignUpInput.email,
        });
        if (existingUserEmail) {
            const error = new Error("User exists already");
            throw error;
        }
        const existingUserName = await User.findOne({
            usernameUser: userSignUpInput.username,
        });
        if (existingUserName) {
            const error = new Error("Username alread exists, please change your username");
            error.code = 401;
            throw error;
        }

        const email = validator.normalizeEmail(validator.ltrim(userSignUpInput.email.toLowerCase()));

        const name = validator.ltrim(userSignUpInput.name);
        const hashedPw = await bcryptjs.hash(validator.ltrim(userSignUpInput.password), 12);
        const userName = validator.ltrim(userSignUpInput.username);

        const user = new User({
            emailUser: email,
            nameUser: name,
            passwordUser: hashedPw,
            usernameUser: userName,
        });
        const createdUser = await user.save();

        return {...createdUser._doc, _id: createdUser._id.toString()};
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUserLogin,
    createUser,
};
