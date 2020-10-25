import React from 'react';
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
} from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const CustomizedSelect = withStyles((theme) =>
  createStyles({
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



/**
 * Page limit select presentational component.
 * Selection of the number of itens searched per page
 * 
 * @param {function} setSearchLimitPage
 * @param {number} searchLimitPage
 * @param {boolean} loading 
 */


const PageLimitSelect = ({ setSearchLimitPage, searchLimitPage, loading }) => {
  const { t } = useTranslation();

  return (
    <FormControl>
      <InputLabel id="itensPage" />
      <Select
        variant="outlined"
        id="itensPage"
        value={searchLimitPage}
        onChange={(e) => setSearchLimitPage(e.target.value)}
        input={<CustomizedSelect />}
      >
        <MenuItem value={10} disabled={loading}>
          {t("itensPage_10")}
        </MenuItem>

        <MenuItem value={20} disabled={loading}>
          {t("itensPage_20")}
        </MenuItem>
        <MenuItem value={30} disabled={loading}>
          {t("itensPage_30")}
        </MenuItem>
        <MenuItem value={40} disabled={loading}>
          {t("itensPage_40")}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

PageLimitSelect.propTypes = {
  setSearchLimitPage: PropTypes.func,
  searchLimitPage: PropTypes.number,
  loading: PropTypes.bool,
};

export default PageLimitSelect;