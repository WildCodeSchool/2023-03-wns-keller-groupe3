const verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.get("Authorization");

        if (authorizationHeader == null) {
            throw new Error("You do not have the authorization to do this");
        }

        const [type, token] = authorizationHeader.split(" ");

        if (type !== "Bearer") {
            throw new Error("You do not have the authorization to do this");
        }

        req.payload = jwt.verify(token, process.env.JWT_SECRET);


        next();
    } catch {
        console.error(err);
        res.sendStatus(401);
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
    verifyToken,
}