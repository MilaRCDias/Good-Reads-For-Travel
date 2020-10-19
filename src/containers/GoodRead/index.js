/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import style from "./GoodRead.module.css";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import ListingBook from "../../components/ListingBook";

/**
 *  Container component of Good Reads for travel
 *
 */

const GoodRead = ({ locationInput, coordinateInput }) => {
  const [listBookLang, setListBookLang] = useState();
  const [selectBookLang, setSelectBookLang] = useState();
  const [displayData, setDisplayData] = useState();
  const [loading, setLoading] = useState(false);
  /**
   *
   * @param {*} items
   */
  const getLang = (items) => {
    let lang = new Set();

    items.filter((item)=> {
      if (item.language !== undefined) {
        item.language.forEach((name) => {
          lang.add(name);
        });
      }
    });
    setListBookLang(Array.from(lang));
  };

  /**
   *
   * @param {*} location
   */
  const getBooks = (location) => {
    setLoading(true);
    const city = location[0].split(" ").join("+").toLowerCase();
    // const country = location[1].split(" ").join("+").toLowerCase();

    axios
      .get(`http://openlibrary.org/search.json?q=${city}&limit=10`)
      .then((response) => {
        console.log(response.data.docs);
        setDisplayData(response.data.docs);
        getLang(response.data.docs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  /**
   *
   * @param {*} coordinates
   */
  const reverseGeolocation = (coordinates) => {

    axios
      .get(
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEO_API_KEY}&lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`
      )
      .then((response) => {
        getBooks([response.data.address.city, response.data.address.country]);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    if (locationInput === undefined && coordinateInput === undefined) return;

    if (locationInput) getBooks(locationInput);

    if (coordinateInput) reverseGeolocation(coordinateInput);
  }, [locationInput, coordinateInput]);

  /** Function to handle change book language selection */
  const onChangeBookLang = (e) => {
    setSelectBookLang(e.target.value);
  };


  return (
    <div className={style.main}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={style.headResults}
      >
        <Grid container alignItems="center" justify="space-between">
          <Grid item className={style.flexItem3}>
            {" "}
            <h3>
              Results for
              <a href="https://google.com">City name</a>
              <span>(238)</span>
            </h3>
          </Grid>
          <Grid item className={style.flexItem1}>
            <FormControl
              variant="outlined"
              classes={{ root: style.bookLangSelect }}
            >
              <InputLabel id="book-language">Available</InputLabel>
              <Select
                labelId="book-language"
                id="book-language"
                value={selectBookLang}
                onChange={onChangeBookLang}
                label="Available"
              >
                {listBookLang &&
                  listBookLang.map((lang) => (
                    <MenuItem value={lang}>{lang}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              classes={{ root: style.bookLangSelect }}
            >
              <InputLabel id="book-language">Sort by</InputLabel>
              <Select
                labelId="book-language"
                id="book-language"
                value={selectBookLang}
                onChange={onChangeBookLang}
                label="Available"
              >
                {listBookLang &&
                  listBookLang.map((lang) => (
                    <MenuItem value={lang}>{lang}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <ListingBook
        data={displayData}
        selectBookLang={selectBookLang}
        loading={loading}
      />
    </div>
  );
};

export default GoodRead;
