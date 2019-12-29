module.exports = {
  theme: {
    extend: {
      boxShadow: {
        card:
          "0 8px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 20px 0 rgba(0, 0, 0, 0.09)"
      },
      colors: {
        violet: "#788CFF",
        "violet-dark": "#6174E1",
        yellow: {
          "400": "#F2C94C",
          "500": "#EDBC27"
        }
      },
      height: {
        "72": "18rem",
        "80": "20rem"
      },
      inset: {
        "1/2": "50%"
      },
      maxWidth: {
        "7xl": "80rem",
        "8xl": "88rem",
        "9xl": "96rem"
      },
      opacity: { "70": ".7" },
      screens: {
        xs: "425px"
      },
      width: {
        "72": "18rem"
      },
      zIndex: { "-1": "-1" },
      fontFamily: {
        montserrat: ["Montserrat"],
        raleway: ["Raleway"],
        roboto: ["Roboto"]
      },
      transitionProperty: {
        // defaults to these values
        none: "none",
        all: "all",
        color: "color",
        bg: "background-color",
        border: "border-color",
        colors: ["color", "background-color", "border-color"],
        opacity: "opacity",
        transform: "transform"
      },
      transitionDuration: {
        // defaults to these values
        default: "250ms",
        "0": "0ms",
        "100": "100ms",
        "250": "250ms",
        "500": "500ms",
        "750": "750ms",
        "1000": "1000ms"
      },
      transitionTimingFunction: {
        // defaults to these values
        default: "ease",
        linear: "linear",
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out"
      },
      transitionDelay: {
        // defaults to these values
        default: "0ms",
        "0": "0ms",
        "100": "100ms",
        "250": "250ms",
        "500": "500ms",
        "750": "750ms",
        "1000": "1000ms"
      },
      willChange: {
        // defaults to these values
        auto: "auto",
        scroll: "scroll-position",
        contents: "contents",
        opacity: "opacity",
        transform: "transform"
      }
    }
  },
  variants: {
    // all the following default to ['responsive']
    transitionProperty: ["responsive"],
    transitionDuration: ["responsive"],
    transitionTimingFunction: ["responsive"],
    transitionDelay: ["responsive"],
    willChange: ["responsive"]
  },
  plugins: [require("tailwindcss-transitions")()]
};
