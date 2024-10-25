const mongoose = require('mongoose');
const cryptos = require('../crypto/crypto')
const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
  
}, { timestamps: true });
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next(); // Check if the password is modified
    
    try {
        const { encryptedData } = cryptos.encrypt(this.password); // Encrypt the password
        this.password = encryptedData; // Store the encrypted password
        next();
    } catch (error) {
        next(error); // Handle any errors that occur during encryption
    }
});

// Method to compare the entered password with the stored encrypted password


const User = mongoose.model('tb_users', userSchema);

module.exports = User;