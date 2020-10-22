/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import style from "./GoodRead.module.css";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { CustomizedSelect } from "./helpers";
import { sortDataAlphabetic } from "./helpers";
import ListingBook from "../../components/ListingBook";
import EmptyState from "../EmptyState";

/**
 *  GOOD READ WIDGET
 *  Container component of Good Reads for travel
 *
 */

const GoodRead = ({ locationInput }) => {
  const [loading, setLoading] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");
  const [totalSearch, setTotalSearch] = useState();
  const [displayData, setDisplayData] = useState();
  const [listDataByPage, setListDataByPage] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [selectBookSort, setSelectBookSort] = useState("sort");
  const itemsByPage = 5;

  const { t } = useTranslation();

  /**
   *  Update data to show on page
   *  when page are change
   *
   */
  useEffect(() => {
    if (!displayData) return;

    handlePagination(displayData, page, itemsByPage);
  }, [page, displayData]);

  /**
   *  Function to handle page change
   *  @returns filtered data array to show on page
   *
   * @param {array} data initial data array
   * @param {number} page current page
   * @param {number} items total items displayed by page
   *
   */
  const handlePagination = (data, page, items) => {
    const start = (page - 1) * items;
    const end = start + items;

    const dataSliced = data.slice(start, end);

    return setListDataByPage(dataSliced);
  };

  /**
   * Function to handle click to change page
   * Sets the page state
   * @param {*} e
   * @param {*} value
   */
  const handleClickPage = (e, value) => {
    setPage(value);
  };

  /**
   * Http request to get search of books
   * @param {*} location
   */
  const getBooks = (location) => {
    setLoading(true);
    setSearchDestination(`${location[0]} ${location[1] ? location[1] : ""}`);
    const city = location?.[0].split(" ").join("+").toLowerCase();
    const country = location[1]
      ? location[1].split(" ").join("+").toLowerCase()
      : null;

    axios
      .get(
        `http://openlibrary.org/search.json?q=${
          country ? `${city}+${country}` : city
        }`
      )
      .then((response) => {
        setDisplayData(response.data.docs);
        setLoading(false);
        setTotalSearch(response.data.docs.length);
        setTotalPage(Math.ceil(response.data.docs.length / 5));
      })
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Http request to reverse coordinates into address
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

  /**
   *  Hook receives user input
   *  if coordinates first reverse geolocation
   *  if string search for books
   *
   */
  useEffect(() => {
    if (locationInput === undefined) return;
    const isNumber = parseInt(locationInput?.[0]);
    if (isNumber) reverseGeolocation(locationInput);
    if (!isNumber) getBooks(locationInput);
  }, [locationInput]);

  /**
   * Function to handle the sorting selection
   * @param {*} e
   */
  const onChangeBookSort = (e) => {
    let sortedData;
    setLoading(true);
    setSelectBookSort(e.target.value);
    setPage(1);

    sortedData = sortDataAlphabetic(displayData, e.target.value);
    handlePagination(sortedData, page, itemsByPage);

    setLoading(false);
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
          <Grid item xs={12} sm={9} className={style.flexItem3}>
            {" "}
            <h3>
              {t("result_label")} {searchDestination}
              <span>{totalSearch ? `(${totalSearch})` : null}</span>
            </h3>
          </Grid>
          <Grid item xs={12} sm={3} className={style.flexItem1}>
            <FormControl>
              <Select
                variant="outlined"
                label={t("sortby_label")}
                id="select"
                value={selectBookSort}
                onChange={onChangeBookSort}
                input={<CustomizedSelect />}
              >
                <MenuItem value="sort" selected disabled>
                  {t("sortby_label")}
                </MenuItem>

                <MenuItem value="AZ" disabled={!displayData}>
                  {t("sortby_AZ")}
                </MenuItem>
                <MenuItem value="ZA" disabled={!displayData}>
                  {t("sortby_ZA")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
         
        </Grid>
      </Grid>
      <div>
        {locationInput ? (
          <ListingBook data={listDataByPage} loading={loading} />
        ) : (
          <EmptyState />
        )}
      </div>
      <div className={style.wrapPagination}>
        {listDataByPage ? (
          <Pagination
            count={totalPage}
            page={page}
            onChange={handleClickPage}
            className={style.pagination}
          />
        ) : null}
      </div>
    </div>
  );
};

GoodRead.propTypes = {
  locationInput: PropTypes.array,
};

export default GoodRead;
