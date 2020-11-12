import React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../src/i18n";

const theme = createMuiTheme();


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
/*   options:{
    storySort: (a,b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, {numeric: true}),
  } */
}

export const decorators = [
         (Story) => (

           <ThemeProvider theme={theme}>
             {" "}
             <CssBaseline />
             <Story />
           </ThemeProvider>
      
         ),
       ];