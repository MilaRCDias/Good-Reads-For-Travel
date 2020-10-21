import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import style from "./App.module.css";
import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchButton from '@material-ui/icons/Search';
  
import GoodRead from "./containers/GoodRead";

/**
 * Simple Page structure with search bar and language selection
 */

const App = () => {
  const [languageSelect, setLanguageSelect] = useState("en");

  const { t, i18n } = useTranslation();

  // for testing input bar to insert value
  const [userInput, setUserInput] = useState("Amsterdam");
  const [location, setLocation] = useState(undefined);
  const coordinateInput = undefined;

  const onChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmit = () => {
    const value = userInput.split(",");
    setLocation(value);
  };
  // --------

  /**
   *  Language selection
   * @param {*} event 
   */
  const handleChangeLang = (event) => {
    setLanguageSelect(event.target.value);
    i18n.changeLanguage(event.target.value);
  };



  return (
    <Container>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={[style.mainContainer, style.py3].join(" ")}
      >
        <div>
          <h1 className={style.logo}>GoodReads</h1>
          <h4 className={style.forTravel}>----- FOR TRAVEL -----</h4>
        </div>

        <div>
          <form>
            <TextField
              id="userInput"
              onChange={onChangeInput}
              value={userInput}
              variant="outlined"
            />
            <IconButton aria-label="button" onClick={onSubmit}>
              <SearchButton />
            </IconButton>
          </form>
        </div>
        <FormControl variant="outlined" classes={{ root: style.formControl }}>
          <InputLabel id="language">{t("languages_label")}</InputLabel>
          <Select
            labelId="language"
            id="language"
            value={languageSelect}
            onChange={handleChangeLang}
          >
            <MenuItem value="en">{t("label_english")}</MenuItem>
            <MenuItem value="pt">{t("label_portuguese")}</MenuItem>
            <MenuItem value="fr">{t("label_french")}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* GOOD READS FOR TRAVEL COMPONENT   */}
      <GoodRead locationInput={location} coordinateInput={coordinateInput} />
    </Container>
  );
};

export default App;
