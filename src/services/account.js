const config = require('config');
const mysql = require('mysql');
const crypto = require('crypto');

const params = config.get('default');
const mysqlConfig = config.get('mysql');

// Load local modules
const functions = require('../include/functions');

var Services = function () { };

Services.doLogin = function (req, res, result) {
    let con = mysql.createConnection(mysqlConfig);
    con.connect();
    let username = req.body.username;
    let password = crypto.createHash('md5').update(req.body.password).digest('hex');
    let userType = req.body.type;
    let sql = "SELECT status FROM account WHERE userName='" + username + "' AND password='" + password + "' AND userRole='" + userType + "'";
    con.query(sql, function (error, results, fields) {
        if (error) return result(error, null);
        if (typeof results[0] !== 'undefined' && typeof results[0]['status'] !== 'undefined') {
            if (results[0]['status'] == 'active') {
                let token = {
                    sub: username,
                    scope: userType
                };
                let jwt = functions.getAuth(token, 60);
                con.end();
                return result(null, { token: jwt });
            }
        }
        con.end();
        return result("Login Invalid", null);
    });
}

Services.doRegister = function (req, res, result) {
    let con = mysql.createConnection(mysqlConfig);
    con.connect();
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let emailId = req.body.email;
    let mobileNo = req.body.mobile;
    let userName = req.body.username;
    let password = crypto.createHash('md5').update(req.body.password).digest('hex');
    let userType = req.body.type;

    let table = userType == 'staff' || userType == 'teacher' ? 'staff' : 'student';
    let sql = "INSERT INTO " + table + " SET ?";

    con.query(sql, { firstName: firstName, lastName: lastName, emailId: emailId, mobileNo: mobileNo }, function (error, results, fields) {
        if (error) return result(error, null);
        if (results.insertId) {
            let sql = "INSERT INTO account SET ?";
            con.query(sql, { userName: userName, password: password, passwordExpiry: 30, userId: results.insertId, userRole: userType, status: 'active' }, function (error1, results1, fields1) {
                if (error1) return result(error1, null);
                if (results.insertId) {
                    con.end();
                    return result(null, `${firstName} ${lastName} Registered`);
                } else {
                    con.end();
                    return result("Request Invalid", null);
                }
            });
        } else {
            con.end();
            return result("Request Invalid", null);
        }
    });
}


module.exports = Services;
