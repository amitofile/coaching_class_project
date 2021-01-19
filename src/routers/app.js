/**
 * This is main router file for Coaching class API. It includes GET, POST, PUT, DELETE, etc. http requests.
 * 
 * @namespace Micro API
 * @author Amit P
 * @since 20210116
 */

// Load global modules 
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

// Load local modules
const functions = require('../include/functions');

// Set few configurations
const app = express();
const params = config.get('default');

// Encode URL/Requests for entire application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, accesstoken");
  next();
});

/**
 * API starts here
 */

app.post(`/api/${params.version}/login`, function (req, res) {
  try {
    console.log("Processing login request");
    let services = require('../services/account');
    services.doLogin(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Login Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});

app.post(`/api/${params.version}/register`, function (req, res) {
  try {
    console.log("Processing register request");
    let services = require('../services/account');
    services.doRegister(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Registered Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});

//---------------------------------------------------------------------------------------

app.get(`/api/${params.version}/subject`, function (req, res) {
  try {
    console.log("Processing register request");
    let services = require('../services/subject');
    services.getSubjects(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Registered Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});

app.post(`/api/${params.version}/subject`, function (req, res) {
  try {
    console.log("Processing register request");
    let services = require('../services/subject');
    services.addSubjects(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Registered Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});

app.put(`/api/${params.version}/subject`, function (req, res) {
  try {
    console.log("Processing register request");
    let services = require('../services/subject');
    services.updateSubjects(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Registered Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});

app.delete(`/api/${params.version}/subject`, function (req, res) {
  try {
    console.log("Processing register request");
    let services = require('../services/subject');
    services.removeSubjects(req, res, (err, data) => {
      if (err) {
        console.log(`Error occured in API call : ${err}`);
        return functions.setError(req, res, 401, err);
      }
      console.log(`Received JWT token ${data}`);
      return functions.setResult(req, res, data, "Registered Successful");
    });
  } catch (err) {
    console.log(`Error occured in API call : ${JSON.stringify(err)}`);
    return functions.setError(req, res, 500, "Internal error occured");
  };
});


/**
 * Every other (invalid) form of request will fall in this block.
 */

app.all('*', function (req, res) {
  console.log("Wrong controller or action called '" + (req.originalUrl).split('?')[0] + "'");
  res.setHeader('Content-Type', 'application/json');
  res.status(404);
  res.send(JSON.stringify({ status: "Error", message: "Invalid URL" }));
});

// Export 
module.exports = app;