import { Router } from "express";
import axios from "axios";

const router = Router();

const API_TEST = `https://lt.integration.dpd.eo.pl/ws-mapper-rest/createShipment_?username=testuser1&password=testpassword1&`;

export default router.post("/", async (req, res) => {
  const dataGiven = Object.keys(req.body)
    .map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(req.body[k]);
    })
    .join("&");
  const { data } = await axios.post(`${API_TEST}${dataGiven}`);
  res.json(data);
});
