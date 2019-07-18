/* eslint-disable prefer-template */
export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}${ampm}`;
}

export function commaStringToArray(value) {
  return value.split(",").map(item => item.trim());
}

export function formatPhoneNumber(phone)
{
    if(phone.length<=9){
      phone = "1 ("+phone.slice(0,3)+") "+phone.slice(3,6)+"-"+phone.slice(6);
    } else if(phone.length == 10) {
      phone = phone.slice(0,1) + " ("+phone.slice(1,4)+") "+phone.slice(4,7)+"-"+phone.slice(7);
    } else {
      phone = "1 " + phone;
    }
    return phone;
}

export function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export const getAge = birthDate => {
  const birthDateDate = new Date(birthDate);
  const currentDate = new Date();
  const diffDate = currentDate - birthDateDate;
  const age = Math.floor(diffDate / 31557600000);
  return age;
};

export const getIndexByValue = (toSearch, id) => {
  return toSearch.map(o => o.id).indexOf(id);
};

export const getValueById = (toSearch, id) => {
  const index = getIndexByValue(toSearch, id);
  return toSearch[index];
};

export const isToday = someDate => {
  const today = new Date();
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
};

export const addressToString = address => {
  return `${address.street}, ${address.city}${
    address.state ? `, ${address.state}` : ""
  }`;
};

export const addressToStringMap = address => {
  return `${address.street}, ${address.city}${
    address.state ? `, ${address.state}` : ""
  } ${address.zip}`;
};

export const formatCardInfo = data => ({
  cardNumber: data.cardNumber || "",
  expiryYear: data.expiryYear || 0,
  expiryMonth: data.expiryMonth || 0,
  cvv: data.cvv || "",
  cardType: data.cardType || "",
  fullName: data.fullName || ""
});
