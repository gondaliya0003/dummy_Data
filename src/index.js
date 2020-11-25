import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "@shopify/app-bridge-react";
//
import "@shopify/polaris/dist/styles.css";
import BannerComponent from "./BannerComponent";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

//

let query = new URLSearchParams(window.location.search);
let appKey = query.get("appKey");
let shop = query.get("shop");
let accessToken = query.get("accessToken");

// if (app_key && shop && accessToken) {

let data = {
   appKey: appKey,
   shop: shop,
   accessToken: accessToken,
};

localStorage.setItem("userData", JSON.stringify(data));

let config = {
   apiKey: data.appKey,
   shopOrigin: data.shop,
   // forceRedirect: true,
};

console.log(config);
// }

ReactDOM.render(
   <Provider config={config}>
      <App />
   </Provider>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
