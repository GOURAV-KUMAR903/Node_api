const express = require('express');
const User = require('../../Model/User_model');
const jwt = require('jsonwebtoken');
const Helper = require('../../helper/genrateuserID'); 
const crypto = require('../../crypto/crypto'); 
const JWT_SECRET = process.env.JWT_SECRET
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create a new user instance
        const perfix = "ND";
        const user_id =  await Helper.generateUserId(User,perfix)
        const newUser = new User({ username, email, password ,user_id});
 
        // Save user to the database
        await newUser.save();


        res.status(201).json({ message: 'User registered successfully!',user_id:newUser.user_id,password:crypto.decrypt(newUser.password) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add route to handle registration
// router.post('/register', exports.register);

exports.login = async (req, res) => {
    const { user_id, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const decrptpassword = crypto.decrypt(user.password);
        if (password !== decrptpassword) {
            return res.status(401).json({ message: 'Invalid user_id or password' });
        }
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;

        return res.json({ message: 'Login successful',token, user:userWithoutPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};