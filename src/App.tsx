import { useState, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import { Container, TextField, IconButton } from "@material-ui/core";
import SearchButton from "@material-ui/icons/Search";
import style from "./App.module.css";

import GoodRead from "./containers/GoodRead";
import LanguageSelection from "./components/LanguageSelection";



const App = () => {
  const [userInput, setUserInput] = useState<string>("Amsterdam");
  const [location, setLocation] = useState<string[] | undefined>();

  /**
   *  Function to handle user input change
   * @param {ChangeEvent<HTMLInputElement>} e - The change event from the input field
   */
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  /**
   *  Function to handle form submission
   */
  const onSubmit = () => {
    const value = userInput.split(",");
    setLocation(value);
  };



  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={`${style.mainContainer} ${style.py3}`}
      >
        <div>
          <h1 className={style.logo}>GoodReads</h1>
          <h4 className={style.forTravel}>----- FOR TRAVEL -----</h4>
        </div>

        <div className={style.inputField}>
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <TextField
              id="userInput"
              onChange={onChangeInput}
              value={userInput}
              variant="outlined"
     
            />
            <IconButton aria-label="search button" onClick={onSubmit}>
              <SearchButton />
            </IconButton>
          </form>
        </div>
        <div className={style.formControl}>
          <LanguageSelection />
        </div>
      </Grid>
      {/* **** GOOD READS FOR TRAVEL COMPONENT  **** */}
      <GoodRead locationInput={location} />
    </Container>
  );
};

export default App;
