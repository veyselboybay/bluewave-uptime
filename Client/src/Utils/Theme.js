import { createTheme } from "@mui/material";

// Colors for MUI theme
const primaryMain = "#1570EF";
const secondaryMain = "#475467";
const tertiaryMain = "#475467";
const tertiaryLinkHover = "#eff8ff";

// Label Colors
const labelOrange = "#F79009";
const labelGray = "#475467";
const labelPurple = "#6941C6";
const labelGreen = "#067647";
const labelRed = "#F04438";

// Section colors
const sectionBorder = "#D0D5DD";
const sectionBg = "#F8F9F8";

// Other Colors
const otherColorsBlackish = "#101828";
const otherColorsBluishGray = "#344054";
const otherColorsGraishWhite = "#eaecf0";
const otherColorsPurple = "#7f56d9";
const otherColorsWhite = "#fff";
const otherColorsGraishWhiteLight = "#f2f2f2";
const otherColorsStrongBlue = "#f2f2f2";
const otherColorsSlateGray = "#667085";
const otherColorsFillGray = "#f4f4f4";

//box shadow
const shadow =
  "0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)";

// Global Font Family
const fontFamilyDefault =
  '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  typography: { fontFamily: fontFamilyDefault, fontSize: 13 },
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    tertiary: {
      main: tertiaryMain,
      linkHover: tertiaryLinkHover,
    },
    labelOrange: {
      color: labelOrange,
    },
    labelGray: {
      color: labelGray,
    },
    labelPurple: {
      color: labelPurple,
    },
    labelGreen: {
      color: labelGreen,
    },
    labelRed: {
      color: labelRed,
    },
    section: {
      borderColor: sectionBorder,
      bgColor: sectionBg,
    },
    otherColors: {
      blackish: otherColorsBlackish,
      bluishGray: otherColorsBluishGray,
      graishWhite: otherColorsGraishWhite,
      purple: otherColorsPurple,
      white: otherColorsWhite,
      graishWhiteLight: otherColorsGraishWhiteLight,
      strongBlue: otherColorsStrongBlue,
      slateGray: otherColorsSlateGray,
      fillGray: otherColorsFillGray,
    },
  },
  shape: {
    borderRadius: 4,
    borderThick: 2,
    boxShadow: shadow,
  },
  content: {
    pX: "80px",
    pY: "40px",
  },
  gap: {
    xs: "4px",
    small: "8px",
    medium: "12px",
    ml: "16px",
    mlplus: "20px",
    large: "24px",
    lgplus: "32px",
    xl: "40px",
    xxl: "60px",
    triplexl: "120px",
  },
  alert: {
    info: {
      color: secondaryMain,
      bg: otherColorsWhite,
      border: sectionBorder,
    },
    error: {
      color: "#d92d20",
      bg: "hsla(0, 100%, 52%, 0.03)",
      border: "#f04438",
    },
    warning: {
      color: "#DC6803",
      bg: "#fffcf5",
      border: "#fec84b",
    },
  },
  //add more as needed
  label: {
    up: {
      borderColor: "#D4F4E1",
      bgColor: "#ecfdf3",
      dotColor: "#17B26A",
    },
    down: {
      borderColor: "#fbd1d1",
      bgColor: "#f9eced",
      dotColor: "#f04438",
    },
    "cannot resolve": {
      borderColor: "#e2eaf7",
      bgColor: "#f2f4f7",
      dotColor: "#4e5ba6",
    },
  },
  pie: {
    green: {
      stroke: "#17b26a",
      strokeBg: "#d4f4e1",
      text: "#079455",
      bg: "#ecfdf3",
      shape: "circle",
    },
    yellow: {
      stroke: "#fdb022",
      strokeBg: "rgba(255, 192, 34, 0.3)",
      text: "#dc6803",
      bg: "#fffcf5",
      shape: "square",
    },
    red: {
      stroke: "#f04438",
      strokeBg: "#ffecea",
      text: "#f04438",
      bg: "#ffeaea",
      shape: "triangle",
    },
    default: {
      stroke: "#4e5ba6",
      strokeBg: "#f2f4f7",
      text: "#4e5ba6",
      bg: "#f2f4f7",
      shape: "",
    },
  },
});

export default theme;
