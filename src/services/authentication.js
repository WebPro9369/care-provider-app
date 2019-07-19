import * as Keychain from "react-native-keychain";
import { API_SETTINGS, updateCareProvider } from "@services/opear-api";

export function setAuthentication({ id, apiKey }) {
  Keychain.setGenericPassword(`${id}`, ""); // Do not remember the api key
  API_SETTINGS.apiKey = apiKey;
}

export function hasCachedAuthentication() {
  return API_SETTINGS.apiKey;
}

export function storeNotificationToken(id, notificationToken) {
  if (!notificationToken) return;

  updateCareProvider(id, { notification_token: notificationToken });
}

export async function getAuthentication() {
  let id;
  let apiKey;
  let isAuthenticated = false;
  let wasAuthenticated = false;

  let credentials;
  try {
    credentials = await Keychain.getGenericPassword();
  } catch (error) {
    console.tron.log(`Keychain couldn't be accessed: ${error}`);
  }

  if (credentials) {
    id = Number.parseInt(credentials.username, 10);
    apiKey = credentials.password;

    (apiKey && (isAuthenticated = true)) || (wasAuthenticated = true);
  }

  return {
    id,
    apiKey,
    isAuthenticated,
    wasAuthenticated
  };
}

export function removeAuthentication(id) {
  Keychain.setGenericPassword(`${id}`, "");
}
