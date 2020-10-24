import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import style from "./App.module.css";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchButton from '@material-ui/icons/Search';
  
import GoodRead from "./containers/GoodRead";
import LanguadeSelection from "./components/LanguageSelection";

/**
 * App View is a simple page structure with search bar,
 * language selection and a component that shows result of the book search
 */

const App = () => {
  const [userInput, setUserInput] = useState("Amsterdam");
  const [location, setLocation] = useState();


  /**
   *  Function to handle change user input
   * @param {} e 
   */
  const onChangeInput = (e) => {
    setUserInput(e.target.value);
  };


/**
 *  Function handle submit user's input
 */
  const onSubmit = () => {
    const value = userInput.split(",");
    setLocation(value);
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
       <div classes={{ root: style.formControl }}>
       <LanguadeSelection />
       </div>
      </Grid>
      {/* **** GOOD READS FOR TRAVEL COMPONENT  **** */}
      <GoodRead locationInput={location} />
    </Container>
  );
};

export default App;
