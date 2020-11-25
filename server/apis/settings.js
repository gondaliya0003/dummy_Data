/**
 * This module contains apis for setting the application
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this module contains controllers for shop
const shopControllers = require("../controllers/shop");

// this module contains configs
const configs = require("../config/config");

// this module contains crypto functions
const crypto = require("crypto");

// this module contains functions for query string
const querystring = require("querystring");

const webhookController = require("../controllers/webhook");

// this is shopiofy module for do operations with shopify api
const Shopify = require("shopify-api-node");

// ---------------------------------------------------------------------------

/**
 * apis
 */

/**
 * This api install the app (redirect to oauth of shopify)
 */

module.exports = {
   settingApis: async (req, res, next) => {
      try {
         // get the hmac,code and shop url
         const { shop, hmac, code, state } = req.query;

         // check if data is present or not
         if ((shop, hmac, code)) {
            if (process.env.APP_KEY && process.env.APP_SECRET) {
               const map = {
                  ...req.query,
               };

               delete map.signature;

               delete map.hmac;

               // CONVERT MESSAGEG INTO STRING
               const message = querystring.stringify(map);

               // GENERATE HASH WITH MESSAGE
               const generatedHash = crypto
                  .createHmac("sha256", process.env.APP_SECRET)
                  .update(message)
                  .digest("hex");

               // COMPARE HMAC AND GENERATED HASH
               if (generatedHash !== hmac) {
                  return res
                     .status(400)
                     .send({
                        statusCode: 400,
                        error: "hmac validation failed",
                     });
               }

               const accessToken = await shopControllers.getAccessToken(
                  shop,
                  code
               );

               // IF TOKEN IS NOT AVAILABLE
               if (!accessToken) {
                  return res
                     .status(400)
                     .send({
                        statusCode: 400,
                        message: "access token not found",
                     });
               } else {
                  // IF ACCESS TOKEN IS FOUND

                  // GET SHOP DATA
                  const shopifyShopData = await shopControllers.getShopData(
                     shop,
                     accessToken
                  );

                  const shopifyData = {
                     shop: shop,
                     code: code,
                     accessToken,
                     phone: shopifyShopData.shop.phone,
                     country_code: shopifyShopData.shop.country_code,
                     country_name: shopifyShopData.shop.country_name,
                     accessScope: configs.ACCESSSCOPE,
                     timestamp: new Date().getTime(),
                     domain: shopifyShopData.shop.domain,
                     email: shopifyShopData.shop.email,
                     customer_email: shopifyShopData.shop.customer_email,
                     money_format: shopifyShopData.shop.money_format,
                     currency: shopifyShopData.shop.currency,
                     timezone: shopifyShopData.shop.iana_timezone,
                     appstatus: "installed",
                  };

                  // GET SHOP DATA FROM DATABSE
                  const shopData = await shopControllers.getShop({ shop });

                  console.log(
                     "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
                     shopData
                  );

                  //
                  //
                  // IF SHOP  DATA IS IN DB THEN (USER IS OLD)
                  //
                  //
                  if (shopData) {
                     // if accesstoken that is in database and access token that we got from
                     // shopify is not same (means user has uninstalled the app)

                     if (shopData.accessToken !== accessToken) {
                        console.log(
                           "SHOP DATA IS AVAIL IN SETTING.JS ACCESS TOKEN IS NOT MATCHED WITH DB ACCESS TOKEN------"
                        );

                        // update the data in database
                        await shopControllers.updateShop({ shop }, shopifyData);

                        // // create webhook for uninstall
                        // await webhookController.createUninstallWebhook(shop, accessToken);

                        // // create webhook for collection update
                        // await webhookController.createCollectionUpdateWebhook(
                        //   shop,
                        //   accessToken
                        // );

                        // // create webhook for collection delete
                        // await webhookController.createCollectionDeleteWebhook(
                        //   shop,
                        //   accessToken
                        // );

                        // // create webhook for product update
                        //   await webhookController.createProductUpdateWebhook(shop, accessToken);

                        //   // create webhook for product delete
                        //   await webhookController.createProductDeleteWebhook(shop, accessToken);

                        console.log(
                           " ------------------------END--------------------IF SHOP  DATA IS IN DB THEN (USER IS OLD)--------------------------------------------"
                        );
                     }
                  }

                  //
                  //
                  //IF USER DATA IS NOT AVIALABLE
                  //
                  //
                  else {
                     console.log("SHOP DATA IS NOT IN DATABASE");
                     // if shop data is not in database (means user is new)

                     // add data in database
                     await shopControllers.addShop(shopifyData);

                     // create uninstall webhook
                     // await webhookController.createUninstallWebhook(shop, accessToken);

                     // // create webhook for collection update
                     // await webhookController.createCollectionUpdateWebhook(
                     //   shop,
                     //   accessToken
                     // );

                     // // create webhook for collection delete
                     // await webhookController.createCollectionDeleteWebhook(
                     //   shop,
                     //   accessToken
                     // );

                     // // create webhook for product update
                     // await webhookController.createProductUpdateWebhook(shop, accessToken);

                     // // create webhook for product delete
                     // await webhookController.createProductDeleteWebhook(shop, accessToken);
                  }

                  // redirect to the dashboard
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  console.log("--------------------------------");
                  //  console.log(`${process.env.baseurl}/?accessToken=${accessToken}&shop=${shop}&appKey=${process.env.APP_KEY}`);

                  console.log(
                     `${process.env.baseurl}/?accessToken=${accessToken}&shop=${shop}&appKey=${process.env.APP_KEY}`
                  );

                  res.writeHead(302, {
                     Location: `${process.env.baseurl}/?accessToken=${accessToken}&shop=${shop}&appKey=${process.env.APP_KEY}`,
                  });
                  res.end();

                  //
                  //
                  //
                  //
                  //
               }
            } else {
               // keys not found
               return res
                  .status(500)
                  .send({ statusCode: 500, error: "app keys not found" });
            }
         } else {
            // if hmac or shop or code not found
            return res
               .status(400)
               .send({
                  statusCode: 400,
                  error: "hmac, shop or code not found",
               });
         }
      } catch (error) {
         console.log(error);
         return res
            .status(500)
            .send({ statusCode: 500, error: "internal server error" });
      }
   },
};
// ---------------------------------------------------------------------------

/**
 * export modules
 */

// module.exports = { setApp };
