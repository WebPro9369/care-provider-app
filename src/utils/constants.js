import { Dimensions } from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const GOOGLE_API_KEY = "AIzaSyAZGsHKM7GxsqSeKSb9samtlOdDkLQc3aU";

const TITLES = ["MD", "NP", "PA", "APRN"];

const colors = {
  WHITE: "#FFFFFF",
  PINK_50: "#FCE4EC",
  PINK_100: "#F8BBD0",
  PINK_200: "#F48FB1",
  PINK_300: "#F06292",
  PINK_400: "#EC407A",
  PINK_500: "#E91E63",

  DARKRED: "#b20019",
  BLACK: "#000000",
  BLACK87: "rgba(0, 0, 0, 0.87)",
  BLACK38: "rgba(0, 0, 0, 0.38)",
  BLACK60: "rgba(0,0,0,0.6)",
  BLUE: "#2699fb",
  LIGHTSKYBLUE: "#92ccf9",
  SEAFOAMBLUE: "#76db94",
  DARKBLUE: "#01295F",
  LIGHTBLUE: "#74D9F6",
  DARKSKYBLUE: "#238ce5",
  GREEN: "#40be65",
  LIGHTGREEN: "rgb(118, 219, 148)",
  TEXT_GREEN: "#54c374",
  CARBON: "#1E1E1E",
  MIDGREY: "#6F6F6F",
  FLUORESCENT: "#D0FF00",
  VIVIDWHITE: "#FDFFFC",
  PURPLE: "#5100A8",
  DULLPURPLE: "#2D005C",
  CYAN: "#01BAEF",
  VIVIDORANGE: "#FC4214",
  DULLORANGE: "#D01217",
  DARKYELLOW: "#ffbd49",
  BADGE_BACKGROUND: "#efeff4"
};

const MAX_STARS = 5;

const WEEKDAYS = [
  {
    key: "mon",
    label: "M"
  },
  {
    key: "tue",
    label: "T"
  },
  {
    key: "wed",
    label: "W"
  },
  {
    key: "thur",
    label: "Th"
  },
  {
    key: "fri",
    label: "F"
  },
  {
    key: "sat",
    label: "S"
  },
  {
    key: "sun",
    label: "Su"
  },
];

export { DEVICE_WIDTH, DEVICE_HEIGHT, GOOGLE_API_KEY, MAX_STARS, TITLES, WEEKDAYS, colors };
