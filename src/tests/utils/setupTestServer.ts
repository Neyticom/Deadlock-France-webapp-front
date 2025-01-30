import express from "express";
import router from "../../routes/router";

const testApp = express();
testApp.use(express.json());
testApp.use("/api", router);

export default testApp;
