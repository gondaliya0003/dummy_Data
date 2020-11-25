/**
 * This module is for establish the connection with database
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// This is the driver for mongodb
const mongoose = require("mongoose");

// This module is used for colorful logging
const chalk = require("chalk");
require('dotenv').config();


// ---------------------------------------------------------------------------

// global variables

// this is the cluster uri
const mongoUri = process.env.mongo_uri;

// ---------------------------------------------------------------------------

/**
 * connection establish
 */

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log(chalk.green.inverse("Database Connected")))
  .catch((error) => {
    console.log(error);
    console.log(chalk.red.inverse("Database Connection Failed"));
  });
