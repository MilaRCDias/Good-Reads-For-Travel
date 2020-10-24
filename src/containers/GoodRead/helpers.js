import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";



/**
 *  Customized selection component
 */

export const CustomizedSelect = withStyles((theme) =>
  createStyles({
/*     root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    }, */
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "inherit",

      padding: "10px 0",
      "&:focus": {
        borderBottom: 4,
        borderColor: "#80bdff",
      },
    },
  })
)(InputBase);

