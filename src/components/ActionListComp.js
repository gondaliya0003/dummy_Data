import React, { useCallback, useState } from "react";
import { Popover, ActionList, Button } from "@shopify/polaris";

export default function ActionListComp() {
   const [active, setActive] = useState(false);
   const toggleActive = useCallback(() => setActive((active) => !active), []);

   //    callback

   const handleClothesAction = useCallback(
      () => console.log("handleClothesAction action"),
      []
   );

   const handlePaintingAction = useCallback(
      () => console.log("handlePaintingAction action"),
      []
   );

   const handleToysAction = useCallback(
      () => console.log("handleToysAction action"),
      []
   );
   //

   //  toggle actiovator
   const activator = (
      <Button onClick={toggleActive} disclosure>
         More actions
      </Button>
   );
   return (
      <div style={{ height: "250px" }}>
         <Popover active={active} activator={activator} onClose={toggleActive}>
            <ActionList
               items={[
                  {
                     content: "Clothes",
                     onAction: handleClothesAction,
                  },
                  {
                     content: "Painting",
                     onAction: handlePaintingAction,
                  },
                  {
                     content: "Toys",
                     onAction: handleToysAction,
                  },
               ]}
            />
         </Popover>
      </div>
   );
}
