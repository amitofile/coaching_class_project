const jwt = require('jsonwebtoken');
const config = require('config');
const { nextTick } = require('process');
const path = require('path');

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

module.exports.getAuth = (data, expiry_min) => {
    return jwt.sign(data, params.secret, { expiresIn: 60 * expiry_min || params.expiry_min });
}

module.exports.checkAuth = (req, res, next) => {
    if (typeof req.headers['authorization'] !== 'undefined') {
        let token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, params.secret, function (err, decoded) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(401);
                return res.send(JSON.stringify({ status: "Error", message: err, result: [] }));
            };
            if (typeof decoded !== 'undefined') {
                req.auth = decoded;
            }
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(401);
        return res.send(JSON.stringify({ status: "Error", message: "Access token unavailable", result: [] }));
    }
    next();
}

module.exports.authorize = (req, res, next) => {
    const authorize = config.get('authorize');
    if (typeof authorize[req.auth.scope] !== 'undefined') {
        let resourse = path.basename(req.url);
        if (authorize[req.auth.scope][resourse].includes(req.method)) {
            req.authorize = true;
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(401);
            return res.send(JSON.stringify({ status: "Error", message: "You are not authorized to perform this operation", result: [] }));
        }
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(401);
        return res.send(JSON.stringify({ status: "Error", message: "You are not authorized to perform this operation", result: [] }));
    }
    next();
}