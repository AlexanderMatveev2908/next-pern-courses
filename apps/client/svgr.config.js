/** @type {import('@svgr/core').Config} */
module.exports = {
  typescript: true,
  icon: true,
  svgProps: {
    "aria-hidden": "true",
    fill: "currentColor",
  },
  expandProps: "end",
  replaceAttrValues: {
    "#000": "currentColor",
    "#000000": "currentColor",
    black: "currentColor",
    "#fff": "currentColor",
    "#ffffff": "currentColor",
    white: "currentColor",
    inherit: "currentColor",
  },
  dimensions: false,
  exportType: "default",
};
