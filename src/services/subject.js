const config = require('config');
const mysql = require('mysql');
const crypto = require('crypto');

const params = config.get('default');
const mysqlConfig = config.get('mysql');

// Load local modules
const functions = require('../include/functions');

var Services = function () { };

Services.addSubjects = function (req, res, result) {
    let con = mysql.createConnection(mysqlConfig);
    con.connect();
    let subject = req.body;
    let auth = req.auth;
    let sql = "INSERT INTO subject (name, description, createDate, createById, totalIntake, status) " +
        "VALUES ('" + subject.name + "','" + subject.description + "', '', '" + auth.sub + "', '" + subject.totalstudents + "', '" + subject.status + "')";
    con.query(sql, function (error, results, fields) {
        if (error) return result(error, null);
        if (results) {
            return result(null, `${subject.name} added by ${auth.sub}`);
        }
        con.end();
        return result("Failed to add subject", null);
    });
}

Services.getSubjects = function (req, res, result) {
    let con = mysql.createConnection(mysqlConfig);
    con.connect();
    let subject = req.body;
    let auth = req.auth;
    let sql = "SELECT * FROM subject WHERE createById='" + auth.sub + "'";
    con.query(sql, function (error, results, fields) {
        if (error) return result(error, null);
        console.log(results);
        if (typeof results !== 'undefined') {
            con.end();
            return result(null, results);
        }
        con.end();
        return result("Login Invalid", null);
    });
}

module.exports = Services;
