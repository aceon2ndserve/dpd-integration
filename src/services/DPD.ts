import axios from "axios";

export default async function createShipment(
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
) {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const API_TEST = `https://lt.integration.dpd.eo.pl/ws-mapper-rest/createShipment_?username=${username}&password=${password}&`;
  const { data } = await axios.post(
    `${API_TEST}name1=${name}&street=${address}&country=${country}&city=${city}&pcode=${zip}&phone=${phone}&num_of_parcel=${num_of_parcel}&parcel_type=${parcel_type}&width=${width}&height=${height}&length=${length}&weight=${weight}`
  );
  return data;
}
