import Axios from "axios";

const OPEAR_API = "http://localhost:3000/";
const axios = Axios.create({
  baseURL: OPEAR_API,
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

const registerCareProvider = (data, successHandler, errorHandler) => {
  axios
    .post("/api/v2/care_provider/registrations", data)
    .then(res => {
      console.tron.log("Opear registration done: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Opear registration error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

export { registerCareProvider };
