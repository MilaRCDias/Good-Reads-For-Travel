import React, { ChangeEvent } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
} from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

interface PageLimitSelectProps {
  setSearchLimitPage: (value: number) => void;
  searchLimitPage: number;
  loading: boolean;
}

const CustomizedSelect = withStyles(() =>
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
 * Selection of the number of items searched per page
 */
const PageLimitSelect: React.FC<PageLimitSelectProps> = ({ 
  setSearchLimitPage, 
  searchLimitPage, 
  loading 
}) => {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSearchLimitPage(e.target.value as number);
  };

  return (
    <FormControl>
      <InputLabel id="itemsPerPageLabel">{t("itemsPerPage_label")}</InputLabel>
      <Select
        variant="outlined"
        labelId="itemsPerPageLabel"
        id="itemsPerPage"
        value={searchLimitPage}
        onChange={handleChange}
        input={<CustomizedSelect />}
      >
        <MenuItem value={10} disabled={loading}>
          {t("itemsPerPage_10")}
        </MenuItem>
        <MenuItem value={20} disabled={loading}>
          {t("itemsPerPage_20")}
        </MenuItem>
        <MenuItem value={30} disabled={loading}>
          {t("itemsPerPage_30")}
        </MenuItem>
        <MenuItem value={40} disabled={loading}>
          {t("itemsPerPage_40")}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default PageLimitSelect;
