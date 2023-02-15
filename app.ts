import express from "express";
import router from "./src/routers/router";
const app = express();
const port = 5001;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("app is running on port " + port);
});
