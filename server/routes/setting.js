/**
 * This module contains routes for setting the app
 */

// ---------------------------------------------------------------------------

/**
 * import moduules
 */

// this is server
const express = require("express");

// this is for create seperate routers
const router = express.Router();

// this module contains middleware for settings
const settingApis = require("../apis/settings");

// ---------------------------------------------------------------------------

/**
 * routes
 */

// router.get("/settings",(req,res,next)=>{
//     console.log(" IN -------- settings routes",req);
   
//     next();

// },settingApis.setApp);



router.get("/settings", settingApis.settingApis);

// ---------------------------------------------------------------------------

/**
 * export routes
 */

module.exports = router;
