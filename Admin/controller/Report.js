const User = require('../../Model/User_model');
const  crypto = require('../../crypto/crypto');




exports.Users = async (req, res) => {
    try {
        // Fetch the data from your database (this is an example query)
        const data = await User.find({});

        // Format the report data (example: summary, grouping, etc.)
        const report = {
            totalRecords: data.length,
            records: data.map(item => ({

                id: item._id,
                name: item.username,
                email: item.email,
                password: crypto.decrypt(item.password),
                createdAt: item.createdAt
            }))
        };

        // Send the report data as JSON for easy viewing in Postman
        return res.json({ message: 'Report generated successfully', report });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
