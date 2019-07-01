import Axios from "axios";

const GOOGLE_API = "https://maps.google.com/maps/api";
const axios = Axios.create({
  baseURL: GOOGLE_API,
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

const getGeo = (address, successHandler, errorHandler) => {
  axios
    .get("/geocode/json", {
      params: {
        address,
        key: "AIzaSyBv9qJrg7dFXjv0Z23ds82haPgazsY0L1M"
      }
    })
    .then(res => {
      console.tron.log("Get google geo done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get google geo error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export default { getGeo };
