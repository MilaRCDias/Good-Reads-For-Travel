import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./GoodRead.module.css";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Hidden,
  Box
} from "@material-ui/core";
import ListingBook from "../../components/ListingBook";
import EmptyState from "../../components/EmptyState";
import DisplaySelection from '../../components/DisplaySelection';
import FilterMenu from "../../components/FilterMenu";
import PageLimitSelect from '../../components/PageLimitSelect'

/**
 *  GOOD READ WIDGET
 *  Container component of Good Reads for travel
 *  @param {array} locationInput - it accepts: (city),(city,country) or(latitude,longitude)
 *  @param {number} searchLimit 
 *  @param {boolean} hasImage
 *  @param {boolean} hasSubject
 *  @param {boolean} userLimitSearch
 */

const GoodRead = ({ locationInput, hasImage, hasSubject, searchLimit=20, userLimitSearch=true}) => {
  const [loading, setLoading] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");
  const [totalSearch, setTotalSearch] = useState();
  const [displayData, setDisplayData] = useState();
  const [destination, setDestination] = useState();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [selectBookFilter, setSelectBookFilter] = useState("travel");
  const [searchLimitPage, setSearchLimitPage] = useState(searchLimit);
  const [selectedDisplay, setSelectedDisplay] = useState(false);
  const { t } = useTranslation();
  const startItensByPage = searchLimitPage * page - searchLimitPage + 1;
  const endItensByPage =
    page === totalPage ? totalSearch : searchLimitPage * page;

  /**
   *  Function to handle page change
   *  @returns filtered data array to show on page
   *
   * @param {array} data initial data array
   * @param {number} page current page
   * @param {number} items total items displayed by page
   *
   */
  const handlePagination = (page, searchLimitPage) => {
    const offset = (page - 1) * searchLimitPage;
    return setOffset(offset);
  };

  /**
   *
   * @param {object} event
   */
  const onChangeBookFilter = (event) => {
    setSelectBookFilter(event.target.value);
  };

  /**
   * Function to handle click to change page
   * Sets the page state
   * @param {object} event
   * @param {number} value
   */
  const handleClickPage = (event, value) => {
    setPage(value);
    handlePagination(value, searchLimitPage);
  };

  /**
   * Http request to get search of books
   * @param {array} location
   */
  const getBooks = (location) => {
    setLoading(true);
    setSearchDestination(`${location[0]} ${location[1] ? location[1] : ""}`);
    const city = location?.[0].split(" ").join("+").toLowerCase();
    const country = location[1]
      ? location[1].split(" ").join("+").toLowerCase()
      : null;

    axios({
      method: "get",
      url: `http://openlibrary.org/search.json?q=${
        country ? `${city}+${country}` : city
      }+${selectBookFilter}&limit=${searchLimitPage}&offset=${offset}`,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((response) => {
        setDisplayData(response.data.docs);
        setLoading(false);
        setTotalSearch(response.data.numFound);
        setTotalPage(Math.ceil(response.data.numFound / searchLimitPage));
      })
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Http request to reverse coordinates into address
   *
   * @param {array} coordinates
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
    setDestination(locationInput);
    const isNumber = parseInt(locationInput?.[0]);
    if (isNumber) reverseGeolocation(locationInput);
    if (!isNumber) getBooks(locationInput);
  }, [locationInput]);
  /**
   *  Update data to show on page
   *  when page are change
   *
   */
  useEffect(() => {
    if (!displayData) return;

    getBooks(destination);
  }, [offset, selectBookFilter, searchLimitPage]);

  return (
    <div className={style.main}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={style.headResults}
      >
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={12} sm={6}>
            {" "}
            <h3>
              {locationInput
                ? `${t("result_label")} ${searchDestination}`
                : null}
              <span>{totalSearch ? `(${totalSearch})` : null}</span>
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container classes={{ root: style.justifyGrid }}>
              {displayData ? (
                <span>
                  {" "}
                  {`${startItensByPage}-${endItensByPage} ${t(
                    "page_range_itens_of"
                  )} ${totalSearch}${t("page_range_books")} `}{" "}
                </span>
              ) : null}
              <Hidden xsDown>
                {displayData && userLimitSearch ? (
                  <>
                    <span>{` ${t("itensPage_label")}. `}</span>
                    <PageLimitSelect
                      setSearchLimitPage={setSearchLimitPage}
                      searchLimitPage={searchLimitPage}
                      loading={loading}
                    />
                  </>
                ) : null}
              </Hidden>
              {locationInput ? (
                <>
                  <FilterMenu
                    selectBookFilter={selectBookFilter}
                    onChangeBookFilter={onChangeBookFilter}
                    loading={loading}
                  />
                  <Hidden xsDown>
                    <DisplaySelection setSelectedDisplay={setSelectedDisplay} />
                  </Hidden>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        {locationInput ? (
          <ListingBook
            data={displayData}
            loading={loading}
            hasImage={hasImage}
            hasSubject={hasSubject}
            displayGrid={selectedDisplay}
          />
        ) : (
          <EmptyState />
        )}
      </Box>
      <div className={style.wrapPagination}>
        {displayData ? (
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
  hasImage: PropTypes.bool ,
  hasSubject: PropTypes.bool, 
  searchLimit: PropTypes.number, 
  userLimitSearch: PropTypes.bool,
};

export default GoodRead;
