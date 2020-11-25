/**
 * This module contains install apis
 */

// ---------------------------------------------------------------------------

/**
 * import modules
 */

// this module contains utils for shop
const shopUtils = require("../utils/shop");

// this module contains utils for shop
const configs = require("../config/config");

// this module contains controllers for shop
const shopController = require("../controllers/shop");

// ---------------------------------------------------------------------------

/**
 * apis
 */
/**
 * This api install the app (redirect to oauth of shopify)
 */
module.exports = {
   installApp: async (req, res, next) => {
      try {
         if (!req.query.shop) {
            return res
               .status(400)
               .send({ statusCode: 400, error: "shop name not found" });
         }

         console.log("install in apis");
         // check if app keys is exists or not
         if (process.env.APP_SECRET && process.env.APP_KEY) {
            // this is the shop url like (xyz.myshopify.com)
            const shop = req.query.shop.replace(/(^\w+:|^)\/\//, "");

            // check the shop syntex
            if (shopUtils.validateShopUrl(shop)) {
               // redirect url
               const redirectUrl = encodeURI(
                  `${process.env.baseurl}/api/settings`
               );

               // this is the oauth url of shopify
               const install_url = `https://${shop}/admin/oauth/authorize?client_id=${process.env.APP_KEY}&scope=${configs.ACCESSSCOPE}&redirect_uri=${redirectUrl}`;

               console.log(
                  "-============================================================="
               );
               console.log(redirectUrl);
               console.log(install_url);
               console.log(
                  "-============================================================="
               );

               // redirect on install url
               res.writeHead(302, { Location: install_url });
               res.end();
               console.log("end-------------------------");
            } else {
               // if shopname syntex is not validate
               return res
                  .status(400)
                  .send({
                     statusCode: 400,
                     message: "shop url is not validate",
                  });
            }
         } else {
            // keys not exists
            return res
               .status(500)
               .send({ statusCode: 500, message: "app keys not found" });
         }
      } catch (error) {
         console.log(error);
         // if there is some internal server error
         res.status(500).send({
            statusCode: 500,
            message: "internal server error",
         });
      }
   },
};
// ---------------------------------------------------------------------------

/**
 * exports
 */
