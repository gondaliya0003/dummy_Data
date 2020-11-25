/**
 * This module contains utils for shop
 */

// ---------------------------------------------------------------------------

/**
 * functions
 */

/**
 *
 * @param {String} shop shop url
 * @return {Boolean}
 */
const validateShopUrl = (shop) => {
    if (shop.indexOf(".myshopify.com") !== -1) {
      return true;
    }
    return false;
  };
  
  // ---------------------------------------------------------------------------
  
  /**
   * export functions
   */
  
  module.exports = { validateShopUrl };
  