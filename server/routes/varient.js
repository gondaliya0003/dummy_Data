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

// this module contains install api
const varientApi = require("../apis/varient");

// // this module contains install middlewares
const installMiddleware = require("../middlewares/install");

// ---------------------------------------------------------------------------

/**
 * routes
 */

router.post(
   "/varients",
   installMiddleware.isValidRequest,
   installMiddleware.isAppInstalled,
   varientApi.addVarient
);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
