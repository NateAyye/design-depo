import tinycolor from "tinycolor2";

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return `#${ color }`;
}


function getRGB(c) {
  return parseInt(c, 16) || c;
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f, b) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, "#ffffff");
  const blackContrast = getContrast(bgColor, "#000000");

  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}

function hexToRgb(hex) {
  const rgbValues = hex.includes('#') ? hex.slice(1,).match(/.{1,2}/g) : hex.match(/.{1,2}/g);
  return { r: parseInt(rgbValues[0], 16), g: parseInt(rgbValues[1], 16), b: parseInt(rgbValues[2], 16), a: 1 };
}

const formatColor = (color, format = 'hex6') => {
  var color1 = tinycolor(color);
  return color1.toString(format);
}

const getColorName = async (color) => {
  try {
    const res = await fetch(`https://www.thecolorapi.com/id?hex=${ color?.replace('#', '') }`)
    const data = await res.json();
    return data.name.value;
  } catch (error) {
    console.log(error);
    return null
  }
}

export { formatColor, generateRandomColor, getColorName, getTextColor, hexToRgb };

