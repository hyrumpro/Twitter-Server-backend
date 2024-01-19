import bcrypt from 'bcrypt';
import User from '../models/users.js'; // Assuming correct path
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import mongoose from 'mongoose';

const saltRounds = 10;

export const newUser = async ({ name, username, email, password }) => {

        username = String(username).toLowerCase();
        email = String(email).toLowerCase();
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            throw new Error('Email already registered');
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            throw new Error('Username already in use');
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({ name, username, email, password: hash });
        await user.save();
        return user;
};

export const authentication = async ({ email, password }) => {
        email = String(email).toLowerCase();
        const existingEmail = await User.findOne({ email });
        console.log(existingEmail)
        if (!existingEmail) {
            throw new Error('Email doesnt exist');
        }
        const passwordMatch = await bcrypt.compare(password, existingEmail.password);
        if (!passwordMatch) {
            throw new Error('Invalid Password');
        }

        const token = jwt.sign({
            userId: existingEmail._id,
            email: existingEmail.email, 
            name: existingEmail.name,
            username:existingEmail.username 
        }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log(token)

        return token;



}








