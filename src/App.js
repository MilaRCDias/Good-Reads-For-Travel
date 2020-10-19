import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import style from "./App.module.css";
import GoodRead from './containers/GoodRead';
import { Container } from "@material-ui/core";


/**
 * Simple Page structure with search bar and language selection
 */

const App = () => {
  const [languageSelect, setLanguageSelect] = useState('eng');
  


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


const handleChange = (event) => {
  setLanguageSelect(event.target.value);
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
            onChange={handleChange}
            label="Language"
          >
            <MenuItem value="eng">English</MenuItem>
            <MenuItem value="por">Português</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <GoodRead
        locationInput={location}
        coordinateInput={coordinateInput}
      />
    </Container>
  );
};

export default App;
