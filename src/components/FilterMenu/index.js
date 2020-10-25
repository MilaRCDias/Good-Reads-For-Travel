import React from 'react';
import PropTypes from "prop-types";
import {
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
 
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

/**
 * Filter Menu presentational component.
 * List of options to filter seach.
 * 
 * @param {function} selectBookFilter
 * @param {function} onChangeBookFilter
 * @param {boolean} loading  */

const FilterMenu = ({ selectBookFilter, onChangeBookFilter, loading }) => {
  const { t } = useTranslation();

  return (
    <FormControl>
      <InputLabel id={t("filter_label")} />
      <TextField
        select
        variant="outlined"
        label={t("filter_label")}
        id="filter"
        value={selectBookFilter}
        onChange={onChangeBookFilter}
      >
        <MenuItem value={t("filter_label")} selected disabled>
          {t("filter_label")}
        </MenuItem>

        <MenuItem value={t("filter_travel")} disabled={loading}>
          {t("filter_travel")}
        </MenuItem>
        <MenuItem value={t("filter_novel")} disabled={loading}>
          {t("filter_novel")}
        </MenuItem>
        <MenuItem value={t("filter_culture")} disabled={loading}>
          {t("filter_culture")}
        </MenuItem>
      </TextField>
    </FormControl>
  );
};

FilterMenu.propTypes = {
  selectBookFilter: PropTypes.func,
  onChangeBookFilter: PropTypes.func,
  loading: PropTypes.bool,
};
export default FilterMenu;