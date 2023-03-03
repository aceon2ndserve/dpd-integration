import { Router } from "express";
import createShipment from "../services/DPD";

require("dotenv").config();

const router = Router();

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
    if (dataReceived.items.length > 99) {
      res.json({
        error:
          "Sorry but you are trying to send more than 99 items which is the maximum allowed",
      });
      return;
    }
    /// In case there is more than 1 package i calculate the total width

    let width: any = [];
    let length: any = [];
    let height: any = [];
    let weight: any = [];
    if (dataReceived.items.length > 1 && dataReceived.items.length <= 99) {
      dataReceived.items.forEach((item) => {
        width.push(item.width);
        length.push(item.length);
        height.push(item.height);
        weight.push(item.weight);
      });

      let totalWeight = 0;
      for (let i = 0; i < weight.length; i++) {
        totalWeight += weight[i];
      }
      weight = totalWeight;
    }
    /// In case there is 1 package
    // const { width, height, length } = dataReceived.items[0];

    const dataFrom = dataReceived.address_from;

    if (!dataFrom.city) {
      res.json({ Error: "Please provide Senders City" });
      return;
    }
    if (!dataFrom.address) {
      res.json({ Error: "Please provide Senders Address" });
      return;
    }
    if (!dataFrom.country) {
      res.json({ Error: "Please provide Senders Country" });
      return;
    }
    if (!dataFrom.name) {
      res.json({ Error: "Please provide Senders Name" });
      return;
    }
    if (!dataFrom.state) {
      res.json({ Error: "Please provide Senders State" });
      return;
    }
    if (!dataFrom.zip) {
      res.json({ Error: "Please provide Senders Zip Code" });
      return;
    }
    if (!phone) {
      res.json({ Error: "Please provide a Phone Number" });
      return;
    }
    if (!city) {
      res.json({ Error: "Please provide a City" });
      return;
    }
    if (!country) {
      res.json({ Error: "Please provide a Country" });
      return;
    }
    if (!name) {
      res.json("Please provide a Name");
      return;
    }
    if (!zip) {
      res.json({ Error: "Please provide a Zip Code" });
      return;
    }
    if (!width) {
      res.json({ Error: "Please provide width" });
      return;
    }
    if (!height) {
      res.json({ Error: "Please provide a Height for your Item" });
      return;
    }
    if (!length) {
      res.json({ Error: "Please provide length" });
      return;
    }
    if (!address) {
      res.json({ Error: "Please provide address" });
      return;
    }
    if (!weight) {
      res.json({ Error: "Please provide the weight" });
      return;
    }

    const response = await createShipment(
      name,
      address,
      country,
      city,
      zip,
      phone,
      num_of_parcel,
      parcel_type,
      width,
      height,
      length,
      weight
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
