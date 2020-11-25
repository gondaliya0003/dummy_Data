/**
 * This module contains routes for install the apps
 */

// ---------------------------------------------------------------------------

/**
 * import moduules
 */

// this is server
const express = require("express");

// this is for create seperate routers
const router = express.Router();

// this module contains install middlewares
const installApi = require("../apis/install");

// this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.get("/install", installApi.installApp);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
