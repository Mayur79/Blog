import { request, response } from "express";
import User from "../Model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import token from "../Model/token.js";
dotenv.config();
export const signupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(request.body.password, salt);

        const user = { username: request.body.username, name: request.body.name, password: hashPassword };
        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: "Signup Successfully" })
    }
    catch (error) {

        return response.status(500).json({ msg: "Error while signup" })
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new token({ token: refreshToken });
            await newToken.save();

            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });

        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'error while login the user' })
    }
}