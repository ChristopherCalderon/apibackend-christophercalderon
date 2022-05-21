var jwt = require('jsonwebtoken');
var UserModel = require("../models/user");

exports.checkRole = (role) => {
    return async(req, res, next) => {
        const token = req.headers['authorization'];

        const tokenBody = token.slice(7);

        jwt.verify(tokenBody, process.env.JWT_SECRET || "TOP_SECRET", async(err, decodedUser) => {
            if (err) return res.status(500).send("Error");

            const user = await UserModel.findById(decodedUser._id);

            if (!user) return res.send("User not found");

            if (user.role == role) {
                next();
            } else {
                res.status(401).send("Unauthorized");
            }
        })
    }
}