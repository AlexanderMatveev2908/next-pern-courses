/** @type {import('@svgr/core').Config} */
module.exports = {
  typescript: true,
  icon: true,
  svgProps: {
    "aria-hidden": "true",
    fill: "currentColor",
    stroke: "currentColor",
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

    "stroke:#000": "stroke:currentColor",
    "stroke:#000000": "stroke:currentColor",
    "stroke:black": "stroke:currentColor",
    "stroke:#fff": "stroke:currentColor",
    "stroke:#ffffff": "stroke:currentColor",
    "stroke:white": "stroke:currentColor",
  },
  dimensions: false,
  exportType: "default",
};
