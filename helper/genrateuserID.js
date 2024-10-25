

async function generateUserId(Model,prefix) {
    const user_id = `${prefix}${Math.floor(100000 + Math.random() * 900000)}`; 

    const existingUser = await Model.find({user_id}); // Check if the user ID already exists
    console.log(existingUser);
    if (existingUser == []) {
        return generateUserId(Model, prefix); // Recursively call to generate a new user ID
    }
    return user_id; // Return the unique user ID
};

module.exports = {
   
    generateUserId, 
   
}