import { create } from "@storybook/theming/create";

import { addons } from "@storybook/addons";
// import { themes } from "@storybook/theming";


const theme = create({
  base: "light",
  appContentBg: "#F5F7F9",
  brandTitle: "Good reads for travel",
 // brandUrl: "https://www.google.com",
 // brandImage: logo path,
});

addons.setConfig({
  theme: theme,
}); 
