const crypto = require('crypto');
// const userModel = require('../model/Admin_Model');

// Constants for encryption
const ALGORITHM = 'aes-256-ecb'; // AES in ECB mode (no IV required)
const SECRET_KEY = 'hgGpfuir!#$24298vcFgfvFU%E$%^Qw3'; 

// Replace this with a fixed secret key

// Function to pad the input data to be a multiple of 16 bytes


// Encrypt function

function encrypt(text) {
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), null); // No IV for ECB mode
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return { encryptedData: encrypted };
}

// Decrypt functionss
function decrypt(encryptedData) {
    if (!encryptedData) {
        throw new Error('Invalid data: "encryptedData" is required');
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), null); // No IV for ECB mode
    let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}



module.exports = {
    encrypt, 
    decrypt, 
   
};