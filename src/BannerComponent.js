import React from "react";
import { Banner } from "@shopify/polaris";

export default class App extends React.Component {
   render() {
      return (
         <Banner title="Order archived" onDismiss={() => {}}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
         </Banner>
      );
   }
}
