const chroma = require("chroma-js")

const theme = require('../theme.json')

const toOKLCH = (color) => {
  [l, c, h] = chroma(color).oklch()

  return {
    lightness: l,
    chroma: c,
    hue: h,
  }
};

module.exports = {
  primaryHex: theme.primaryColor,
  primaryColor: toOKLCH(theme.primaryColor),
  mainFont: theme.fonts.main.name,
  codeFont: theme.fonts.code.name,
}
