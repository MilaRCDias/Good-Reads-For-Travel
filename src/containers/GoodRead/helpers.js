import {
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";


/**
 * Helper function to sort data
 * @param {array} listData 
 * @param {string} sortby 
 */

export const sortDataAlphabetic = (listData, sortby) => {
  const sortListing =
    listData.length > 0
      ? listData.sort((a, b) => {
          const itemA = a.title < b.title;
          const itemB = a.title > b.title;
          return sortby === "AZ"
            ? itemA < itemB
              ? 1
              : -1
            : itemA > itemB
            ? 1
            : -1;
        })
      : [];

  return sortListing;
};

/**
 *  Customized selection component
 */

export const CustomizedSelect = withStyles((theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
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

