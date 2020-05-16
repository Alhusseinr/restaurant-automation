const jwt = require('jsonwebtoken');
const userServices = require('./services/user/userServices');

const { SECURE_KEY_JWT } = process.env;

exports.createJWT = (id, username, email, role) => {
    const userToken = jwt.sign({ id, username, email, role }, SECURE_KEY_JWT, { expiresIn: '24hr' });
    return userToken;
};

exports.verifyJWT = (token) => {
    const decodedToken = jwt.verify(token, SECURE_KEY_JWT, (err, decoded) => {
        if (err || Date.now() >= decoded.exp * 1000) {
            return "Token is not valid";
        } else {
            return decoded;
        }
    });
    return decodedToken;
};

exports.protected = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(Error('Not authorized to access this route'))
    }

    try {
        const decoded = jwt.verify(token, SECURE_KEY_JWT);
        const user = await userServices.getUser(decoded);
        req.user = {
            id: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ error: e.message });
        }
        return res.status(400).json({ error: e.message });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new Error(`uhhh..`)
            )
        }
        next();
    }
}


