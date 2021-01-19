const jwt = require('jsonwebtoken');
const config = require('config');

const params = config.get('default');

module.exports.setResult = (req, res, data, msg) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    return res.send(JSON.stringify({ status: "Success", message: msg, result: data }));
}

module.exports.setError = (req, res, errorCode, msg) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(errorCode);
    return res.send(JSON.stringify({ status: "Error", message: msg, result: [] }));
}

module.exports.getJWT = (data, expiry_min) => {
    return jwt.sign(data, params.secret, { expiresIn: 60 * expiry_min || params.expiry_min });
}

module.exports.checkJWT = (req, res) => {
    if (typeof req.headers['Authorization'] !== 'undefined') {
        let token = req.headers['Authorization'].split()[1];
        jwt.verify(token, params.secret, function (err, decoded) {
            if (err) return false;
            if (typeof decoded === 'undefined' || typeof decoded.data === 'undefined') {
                return false;
            }
            return decoded.data;
        });
    }
    return false;
}