/**
 * This module contains controller for webhooks
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this module contains configs
const configs = require("../config/config");

// this is shopiofy module for do operations with shopify api
const Shopify = require("shopify-api-node");

// ---------------------------------------------------------------------------

/**
 * controllers
 */

/**
 * This controller create webhook for uninstall
 */
const createUninstallWebhook = (shop, accessToken) => {
  // shopify object
  const shopify = new Shopify({
    shopName: shop,
    accessToken,
  });

  return new Promise((resolve, reject) => {
    shopify.webhook
      .create({
        topic: "app/uninstalled",
        address: `${process.env.baseurl}/api/uninstall`,
        format: "json",
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

/**
 * This webhook create collection update webhook
 */
const createCollectionUpdateWebhook = (shop, accessToken) => {
  // shopify object
  const shopify = new Shopify({
    shopName: shop,
    accessToken,
  });

  return new Promise((resolve, reject) => {
    shopify.webhook
      .create({
        topic: "collections/update",
        address: `${process.env.baseurl}/api/collection-update`,
        format: "json",
      })
      .then((res) => {
        console.log("collection uninstall webhook created");
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

/**
 * This webhook create collection delete webhook
 */
const createCollectionDeleteWebhook = (shop, accessToken) => {
  // shopify object
  const shopify = new Shopify({
    shopName: shop,
    accessToken,
  });

  return new Promise((resolve, reject) => {
    shopify.webhook
      .create({
        topic: "collections/delete",
        address: `${process.env.baseurl}/api/collection-delete`,
        format: "json",
      })
      .then((res) => {
        console.log("collection delete webhook created");
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

/**
 * This webhook create product update webhook
 */
const createProductUpdateWebhook = (shop, accessToken) => {
  // shopify object
  const shopify = new Shopify({
    shopName: shop,
    accessToken,
  });

  return new Promise((resolve, reject) => {
    shopify.webhook
      .create({
        topic: "products/update",
        address: `${process.env.baseurl}/api/product-update`,
        format: "json",
      })
      .then((res) => {
        console.log("product update webhhok created");
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

/**
 * This webhook create product delete webhook
 */
const createProductDeleteWebhook = (shop, accessToken) => {
  // shopify object
  const shopify = new Shopify({
    shopName: shop,
    accessToken,
  });

  return new Promise((resolve, reject) => {
    shopify.webhook
      .create({
        topic: " products/delete",
        address: `${process.env.baseurl}/api/product-delete`,
        format: "json",
      })
      .then((res) => {
        console.log("product delete webhhok created");
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

// ---------------------------------------------------------------------------

/**
 * export modules
 */

module.exports = {
  createUninstallWebhook,
  createCollectionUpdateWebhook,
  createCollectionDeleteWebhook,
  createProductUpdateWebhook,
  createProductDeleteWebhook
};
