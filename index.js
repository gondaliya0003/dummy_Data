const express = require("express");
const chalk = require("chalk");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// bypass cross origin error
app.use(cors());

// get request with json
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
// this module is for connect the database
require("./server/db/connect");

// install routes
const installRoute = require("./server/routes/install");

// settings routes
const settingRoute = require("./server/routes/setting");

//add data like order, Collection, customer, varient
const addProductRoutes = require("./server/routes/addproduct");
const customCollectionRoutes = require("./server/routes/collection");
const orderRoutes = require("./server/routes/order");
const varientRoutes = require("./server/routes/varient");
const customerRoutes = require("./server/routes/customer");
const smartCollectionRoutes = require("./server/routes/smartCollection");
const collect = require("./server/routes/collect");

// find and delete data from shopify and db
const getProductsAndDeleteRoutes = require("./server/routes/getProductsRoutes");
const getCustomersAndDeleteRoutes = require("./server/routes/getCustomersAndDelete");
const getOrdersAndDeleteRoutes = require("./server/routes/getOrdersAndDelete");
const getSmartCollectionAndDeleteRoutes = require("./server/routes/getSmartCollectionAndDelete");
const getCustomCollectionAndDeleteRoutes = require("./server/routes/getCustomCollectionAndDelete");

// this is for install route
app.use("/api", installRoute);

// this is for setting route
app.use("/api", settingRoute);

// this is for add products route
app.use("/api", addProductRoutes);

// this is for add collection route
app.use("/api", customCollectionRoutes);

// this is for smart collection route
app.use("/api", smartCollectionRoutes);

// this is for collect route for add product in custom collection
app.use("/api", collect);

// this is for add order route
app.use("/api", orderRoutes);

// this is for add products varient route
app.use("/api", varientRoutes);

// this is for add customer route
app.use("/api", customerRoutes);

// this is for get product and delete route
app.use("/api", getProductsAndDeleteRoutes);

// this is for get Customers and delete route
app.use("/api", getCustomersAndDeleteRoutes);

// this is for get Customers and delete route
app.use("/api", getOrdersAndDeleteRoutes);

// this is for get smart collection and delete route
app.use("/api", getSmartCollectionAndDeleteRoutes);

// this is for get custom collection and delete route
app.use("/api", getCustomCollectionAndDeleteRoutes);

app.get("/*", (req, res) => {
   const index = path.join(__dirname, "/build", "index.html");
   res.sendFile(index);
});

// on this port, server will listen
const port = process.env.PORT;

app.listen(port, () => {
   console.log(chalk.blue.bgWhite.bold("SEVER HAS BEEN STARTED"));
});
