import { Router } from "express";
import axios from "axios";
require("dotenv").config();

const router = Router();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const API_TEST = `https://lt.integration.dpd.eo.pl/ws-mapper-rest/createShipment_?username=${username}&password=${password}&`;

export default router.post("/", async (req, res) => {
  try {
    const dataReceived = req.body;
    const {
      name,
      address,
      city,
      country,
      zip,
      num_of_parcel = 1,
      parcel_type = "D",
      phone,
    } = dataReceived.address_to;
    const { width, height, length } = dataReceived.items[0];
    if (
      !name ||
      !address ||
      !city ||
      !country ||
      !zip ||
      !num_of_parcel ||
      !parcel_type ||
      !phone ||
      !width ||
      !height ||
      !length
    ) {
      res.json("Please provide all the information");
      return;
    }
    const { data } = await axios.post(
      `${API_TEST}name1=${name}&street=${address}&country=${country}&city=${city}&pcode=${zip}&phone=${phone}&num_of_parcel=${num_of_parcel}&parcel_type=${parcel_type}&width=${width}&height=${height}&length=${length}`
    );
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});
