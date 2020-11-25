
/**
 * This module contains controllers for shop
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this is for make request
const axios = require("axios");

// this is the shop model
const shopModel = require("../models/shop");
// ---------------------------------------------------------------------------

/**
 * controllers
 */
/**
 * This function get the access token of the shop from shopify
 * @param {String} shop shop uri
 * @param {String} code code
 * @return {String} access token
 */
const getAccessToken = (shop, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;

      const accessTokenPayload = {
        client_id: process.env.APP_KEY,
        client_secret: process.env.APP_SECRET,
        code,
      };

      const accessTokenRes = await axios({
        url: accessTokenRequestUrl,
        method: "POST",
        responseType: "json",
        data: accessTokenPayload,
      });

      resolve(accessTokenRes.data.access_token);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * This function get shop data from shopify
 * @param {String} shop shop uri
 * @param {String} accessToken access token
 * @return {promise}
 */
const getShopData = (shop, accessToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      // shopify api for get shop data
      const accessShopUrl = `https://${shop}/admin/shop.json`;

      // set header
      const request_headers = {
        "X-Shopify-Access-Token": accessToken,
      };

      const shopResp = await axios({
        url: accessShopUrl,
        method: "GET",
        responseType: "json",
        headers: request_headers,
      });

      resolve(shopResp.data);
    } catch (error) {
      return res
        .status(500)
        .send({ statusCode: 500, message: "internal server error" });
    }
  });
};

/**
 * This function add data in the shop conllection
 * @param {Object} insertQuery
 * @return{promise}
 */
const addShop = (insertQuery) => {
  return new Promise((resolve, reject) => {
    const shop = new shopModel(insertQuery);
    shop
      .save()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

/**
 * This function find the shop in shop collection
 * @param {Object} findQuery this is the find query
 * @param {Array} selector This is the selector array
 * @return {Promise}
 */
const getShop = (findQuery, selector) => {
  return new Promise((resolve, reject) => {
    shopModel
      .findOne(findQuery)
      .select(selector)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

/**
 * This function update the shop in shop collection
 * @param {Object} findQuery This is the find query
 * @param {Object} updateQuery This is the update object
 * @return {Promise}
 */
const updateShop = (findQuery, updateQuery) => {
  return new Promise((resolve, reject) => {
    shopModel
      .updateOne(findQuery, { $set: updateQuery })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// ---------------------------------------------------------------------------

/**
 * export controllers
 */

module.exports = { getAccessToken, getShopData, addShop, getShop, updateShop };
