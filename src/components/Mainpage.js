import React, { useCallback, useState, useEffect } from "react";
import { Card, Tabs, Button, Banner, ActionList } from "@shopify/polaris";
import "../App.css";

import ActionListComp from "./ActionListComp";
import SecondComp from "./SecondComp";
// import Warranty from "./warranty/warranty";
// import Products from "./Products/products";

export default function MainPage() {
   return (
      <div>
         <Card sectioned>
            <Banner title="Order archived" onDismiss={() => {}}>
               <div className="forflex">
                  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
                  <Button onClick={() => alert("Button clicked!")}>
                     Example button
                  </Button>
               </div>
            </Banner>
         </Card>

         <br></br>
         <Card
            title="Online store dashboard"
            footerActionAlignment="left"
            secondaryFooterActionsDisclosureText=""
            sectioned={true}
            subdued={false}
         >
            <div className="forflex cardheight-45">
               <p>View a summary of your online store’s performance.</p>
               <ActionListComp />
            </div>
         </Card>

         <br></br>

         <SecondComp />
      </div>
   );
}
