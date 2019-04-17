import Axios from "axios";

const TWILIO_API = "https://opear-twilio-api.herokuapp.com/";
const axios = Axios.create({
  baseURL: TWILIO_API,
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

const bindDevice = (token, bindingType = "apn") => {
  axios
    .post("/binding", {
      identity: `user_${token}`,
      address: token,
      tag: "reo",
      bindingType
    })
    .then(res => {
      console.tron.log("Twilio binding done: ", res);
    })
    .catch(err => {
      console.tron.log("Twilio binding error: ", err);
    });
};

const sendNotification = (title, body, identity, tag) => {
  console.tron.log("Sending Twilio Notification: ", title, body, tag);
  axios
    .post("/send-notification", {
      title,
      body,
      identity,
      tag
    })
    .then(res => {
      console.tron.log("Twilio notify done: ", res);
    })
    .catch(err => {
      console.tron.log("Twilio notify error: ", err);
    });
};

const sendSMS = (body, from, to) => {
  console.tron.log("Sending SMS: ", body, from, to);
  axios
    .post("/send-sms", {
      body,
      from,
      to
    })
    .then(res => {
      console.tron.log("Twilio SMS Sent: ", res);
    })
    .catch(err => {
      console.tron.log("Twilio SMS Error: ", err);
    });
};

const makeCall = (url, from, to) => {
  console.tron.log("Making a call: ", url, from, to);
  axios
    .post("/make-call", {
      url,
      from,
      to
    })
    .then(res => {
      console.tron.log("Twilio call made: ", res);
    })
    .catch(err => {
      console.tron.log("Twilio Call Error: ", err);
    });
};

export default { bindDevice, sendNotification, sendSMS, makeCall };
