"use strict";

const querystring = require("querystring");
const crypto = require("crypto");

module.exports = {
   appInstall: async (req, res) => {
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

               // redirect on install url
               res.writeHead(302, { Location: install_url });
               res.end();
               console.log("end-------------------------");
            } else {
               // if shopname syntex is not validate
               return res.status(400).send({
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

   appSettings: async (req, res) => {
      try {
         console.log(
            "jhfdjhksfdajhksfdajksfdajkfdasjkfjkdajkfdasjklfdajkfdajklfdajklfdajkfdajksfdajklsfjkdajkdafjkl"
         );
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
                  return res.status(400).send({
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
                  return res.status(400).send({
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
                     await webhookController.createUninstallWebhook(
                        shop,
                        accessToken
                     );

                     // create webhook for collection update
                     await webhookController.createCollectionUpdateWebhook(
                        shop,
                        accessToken
                     );

                     // create webhook for collection delete
                     await webhookController.createCollectionDeleteWebhook(
                        shop,
                        accessToken
                     );

                     // create webhook for product update
                     await webhookController.createProductUpdateWebhook(
                        shop,
                        accessToken
                     );

                     // create webhook for product delete
                     await webhookController.createProductDeleteWebhook(
                        shop,
                        accessToken
                     );
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
            return res.status(400).send({
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
