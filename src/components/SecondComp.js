import React, { useState } from "react";
import {
   Avatar,
   TextStyle,
   Card,
   ResourceItem,
   ResourceList,
   Button,
} from "@shopify/polaris";
import axios from "axios";

export default function ResourceListWithSelectionExample() {
   const [selectedItems, setSelectedItems] = useState([]);

   const resourceName = {
      singular: "customer",
      plural: "customers",
   };

   const items = [
      {
         id: 341,
         url: "customers/341",
         name: "Mae Jemison",
         location: "Decatur, USA",
      },
      {
         id: 256,
         url: "customers/256",
         name: "Ellen Ochoa",
         location: "Los Angeles, USA",
      },
   ];

   const temp = async () => {
      console.log("lsdfgjkldgjfdlgjldg");
      // API CALLING

      const response = await axios.get(
         "https://ad3f5c77259c.ngrok.io/api/addProducts"
      );

      console.log("response from api calling", response);
   };
   return (
      <div>
         <Card>
            <ResourceList
               resourceName={resourceName}
               items={items}
               renderItem={renderItem}
               selectedItems={selectedItems}
               onSelectionChange={setSelectedItems}
               selectable
            />
         </Card>
         <Button primary onClick={temp}>
            Save themefdsfsdaf
         </Button>
      </div>
   );

   function renderItem(item) {
      const { id, url, name, location } = item;
      const media = <Avatar customer size="medium" name={name} />;

      return (
         <ResourceItem
            id={id}
            url={url}
            media={media}
            accessibilityLabel={`View details for ${name}`}
         >
            <h3>
               <TextStyle variation="strong">{name}</TextStyle>
            </h3>
            <div>{location}</div>
         </ResourceItem>
      );
   }
}
