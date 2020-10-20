import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import style from "./App.module.css";
import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import GoodRead from './containers/GoodRead';


/**
 * Simple Page structure with search bar and language selection
 */

const App = () => {
  const [languageSelect, setLanguageSelect] = useState('en');
  
    const {i18n} = useTranslation();

  // for testing input bar to insert value
  const [input, setInput] = useState();
  const [location, setLocation] = useState(undefined);
  const coordinateInput = undefined;

  const onChangeInput = (e) => {
    const value = e.target.value.split(",");
    setInput(value);
  };

  const onSubmit = () => {
    console.log("submit");
    setLocation(input);
  }; 
  // --------


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
            <input
              type="text"
              placeholder="input"
              onChange={onChangeInput}
              value={input}
            />
            <button type="button" onClick={onSubmit}>
              {" "}
              go
            </button>
          </form>
        </div>
        <FormControl variant="outlined" classes={{ root: style.formControl }}>
          <InputLabel id="language">Language</InputLabel>
          <Select
            labelId="language"
            id="language"
            value={languageSelect}
            onChange={handleChangeLang}
            label="Language"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="pt">Português</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <GoodRead locationInput={location} coordinateInput={coordinateInput} />
    </Container>
  );
};

export default App;
