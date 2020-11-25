/**
 * This module contains model for shop */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this is the driver for mongodb
const mongoose = require("mongoose");

// ---------------------------------------------------------------------------

/**
 * Schema
 */

const shopSchema = mongoose.Schema({
  shop: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    trim: true,
    required: true,
  },
  accessToken: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  country_code: {
    type: String,
    trim: true,
    required: true,
  },
  country_name: {
    type: String,
    trim: true,
    required: true,
  },
  accessScope: {
    type: String,
    trim: true,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  domain: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  customer_email: {
    type: String,
    trim: true,
    required: true,
  },
  money_format: {
    type: String,
    trim: true,
    required: true,
  },
  currency: {
    type: String,
    trim: true,
    required: true,
  },
  timezone: {
    type: String,
    trim: true,
    required: true,
  },
  appstatus: {
    type: String,
    trim: true,
    required: true,
    enum: ["installed", "uninstalled"],
  }
});

// ---------------------------------------------------------------------------

/**
 * create a model
 */

// create shop model
const SHOP = mongoose.model("shop", shopSchema);

// ---------------------------------------------------------------------------

/**
 * export modules
 */

module.exports = SHOP;

// COLLECTION WOULD BE shops IN MONGODB ATLAS    