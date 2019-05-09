import Axios from "axios";

const TWILIO_API = "https://opear-twilio-api.herokuapp.com/";
// const TWILIO_API = "http://192.168.3.211:8080/";
const axios = Axios.create({
  baseURL: TWILIO_API,
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

const getToken = () => {
  return axios
    .post("/authtoken", {
      ClientName: `tester${new Date().getTime()}`,
      identity: `tester${new Date().getTime()}`
    })
    .then(token => {
      console.tron.log("Get token; ", token);
      return token;
    })
    .catch(err => console.tron.log("Error getting twilio token: ", err));
};

const bindDevice = (
  token,
  bindingType = "apn",
  successHandler,
  errorHandler
) => {
  return axios
    .post("/binding", {
      serviceName: "provider",
      identity: `user_${token}`,
      address: token,
      tag: "reo",
      bindingType
    })
    .then(res => {
      console.tron.log("Twilio binding done: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Twilio binding error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

const sendNotification = (
  title,
  body,
  identity,
  tag,
  successHandler,
  errorHandler
) => {
  console.tron.log("Sending Twilio Notification: ", title, body, tag);
  return axios
    .post("/send-notification", {
      serviceName: "provider",
      title,
      body,
      identity,
      tag
    })
    .then(res => {
      console.tron.log("Twilio notify done: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Twilio notify error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

const sendSMS = (body, from, to, successHandler, errorHandler) => {
  console.tron.log("Sending SMS: ", body, from, to);
  return axios
    .post("/send-sms", {
      body,
      from,
      to
    })
    .then(res => {
      console.tron.log("Twilio SMS Sent: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Twilio SMS Error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

const makeCall = (url, from, to, successHandler, errorHandler) => {
  console.tron.log("Making a call: ", url, from, to);
  return axios
    .post("/make-call", {
      url,
      from,
      to
    })
    .then(res => {
      console.tron.log("Twilio call made: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Twilio Call Error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

export default { getToken, bindDevice, sendNotification, sendSMS, makeCall };
