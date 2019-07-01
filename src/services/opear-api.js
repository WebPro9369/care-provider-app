import Axios from "axios";

export const API_SETTINGS = {
  apiKey: null,
  endpoint: "https://api.opear.com"
  // endpoint: "http://opear-api.serveo.net/"
  // endpoint: "http://ec2-18-191-228-16.us-east-2.compute.amazonaws.com"
  // endpoint: "http://localhost:3000/"
};

const axios = Axios.create({
  baseURL: API_SETTINGS.endpoint,
  headers: {
    Authorization: {
      toString() {
        if (!API_SETTINGS.apiKey) return "";
        return `Token ${API_SETTINGS.apiKey}`;
      }
    },
    post: {
      "Content-Type": "application/json"
    }
  }
});

export const registerCareProvider = (
  data,
  { successHandler, errorHandler } = {}
) => {
  axios
    .post("/v1/care_providers", data)
    .then(res => {
      console.tron.log("Opear registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Opear registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getCareProvider = (
  userID,
  { successHandler, errorHandler } = {}
) => {
  axios
    .get(`/v1/care_providers/${userID}`)
    .then(res => {
      console.tron.log("Get care provider done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get care provider error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateCareProvider = (
  userID,
  data,
  { successHandler, errorHandler } = {}
) => {
  axios
    .patch(`/v1/care_providers/${userID}`, data)
    .then(res => {
      console.tron.log("Care provider update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Care provider update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getVisits = (
  userID,
  { past, successHandler, errorHandler } = {}
) => {
  const url = `/v1/visits${past ? "?past=true" : ""}`;

  axios
    .get(url)
    .then(res => {
      console.tron.log("Get visits done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visits error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getVisit = (
  visitID,
  { successHandler, errorHandler } = {}
) => {
  axios
    .get(`/v1/visits/${visitID}`)
    .then(res => {
      console.tron.log("Get visit done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visit error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateVisit = (visitID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/visits/${visitID}`, data)
    .then(res => {
      console.tron.log("Update visit done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Update visit error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getAvailabilities = (
  userID,
  { successHandler, errorHandler } = {}
) => {
  const url = `/v1/care_providers/${userID}/availability`;

  axios
    .get(url)
    .then(res => {
      console.tron.log("Get availabilities done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get availabilities error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateAvailabilities = (
  userID,
  data,
  { successHandler, errorHandler } = {}
) => {
  const url = `/v1/care_providers/${userID}/availability`;

  axios
    .patch(url, data)
    .then(res => {
      console.tron.log("Update availabilities done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get availabilities error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const createBankAccountProvider = (
  userID,
  data,
  successHandler,
  errorHandler
) => {
  const url = `/v1/care_providers/${userID}/payout_account`;
  axios
    .post(url, data)
    .then(res => {
      console.tron.log("Opear createCustomer done: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Opear createCustomer error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

export const getApiToken = (
  email,
  password,
  { successHandler, errorHandler } = {}
) => {
  const url = `/v1/authentications`;

  axios
    .post(url, { email, password })
    .then(res => {
      console.tron.log("Authentication done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Authentication error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const passwordReset = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/password_resets", data)
    .then(res => {
      console.tron.log("Password reset done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Password reset error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updatePassword = (data, { successHandler, errorHandler } = {}) => {
  const url = `/v1/password_resets/${data.id}`;
  axios
    .patch(url, data)
    .then(res => {
      console.tron.log("Update password done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Update password error: ", err);
      if (errorHandler) errorHandler(err);
    });
};
