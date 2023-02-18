const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        //decoded is an object containing the user info { _id: this._id, name: this.name, isAdmin: this.isAdmin}
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded; 
        next();
    }
    catch {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;