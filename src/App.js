import React from "react";

import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import Mainpage from "./components/Mainpage";

import {
   Page,
   AppProvider,
   Avatar,
   Button,
   Icon,
   Heading,
   Frame,
   TextField,
   Form,
   FormLayout,
   Card,
   TextStyle,
   ButtonGroup,
   Tooltip,
   Label,
   Banner,
   Select,
} from "@shopify/polaris";

// function AdapterLink({ url, ...rest }) {
//    return <Link to={url} {...rest} />;
// }

{
   /* <AppProvider i18n={enTranslations}>
   <Page title="Example app">
      <Card sectioned>
         <Button onClick={() => alert("Button clicked!")}>
            Example button
         </Button>
      </Card>
   </Page>
</AppProvider>; */
}

function App() {
   return (
      <AppProvider i18n={enTranslations}>
         <Page title="Example app">
            <Mainpage />
         </Page>
      </AppProvider>
   );
}

// function MyRouter() {
//    return (
//       <Switch>
//          <Route exact path="/">
//             <MainPage />
//          </Route>
//       </Switch>
//    );
// }

export default App;
