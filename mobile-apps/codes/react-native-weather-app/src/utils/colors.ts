export type ColorType = "primary" | "secondary" | "tertiary" | "grey";

const PRIMARY = "#3F3D56";
const SECONDARY = "#00BFA6";
const TERTIARY = "#FF6584";
const GREY = "#E6E6E6";

export const mapColor = (color: ColorType) => {
  switch (color) {
    case "primary":
      return PRIMARY;
    case "secondary":
      return SECONDARY;
    case "tertiary":
      return TERTIARY;
    case "grey":
      return GREY;
    default:
      return PRIMARY;
  }
};
