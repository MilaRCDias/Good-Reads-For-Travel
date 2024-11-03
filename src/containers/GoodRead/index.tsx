import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import { Grid, Hidden, Box } from "@material-ui/core";

import style from "./GoodRead.module.css";
import ListingBook from "../../components/ListingBook";
import EmptyState from "../../components/EmptyState";
import DisplaySelection from '../../components/DisplaySelection';
import FilterMenu from "../../components/FilterMenu";
import PageLimitSelect from '../../components/PageLimitSelect';

interface GoodReadProps {
  locationInput: string[] | undefined;
  hasImage?: boolean;
  hasSubject?: boolean;
  searchLimit?: number;
  userLimitSearch?: boolean;
}

const GoodRead: React.FC<GoodReadProps> = ({ 
  locationInput, 
  hasImage = false, 
  hasSubject = false, 
  searchLimit = 20, 
  userLimitSearch = true 
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchDestination, setSearchDestination] = useState<string>("");
  const [totalSearch, setTotalSearch] = useState<number | undefined>();
  const [displayData, setDisplayData] = useState<any[] | undefined>();
  const [destination, setDestination] = useState<string[] | undefined>();
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | undefined>();
  const [selectBookFilter, setSelectBookFilter] = useState<string>("travel");
  const [searchLimitPage, setSearchLimitPage] = useState<number>(searchLimit);
  const [selectedDisplay, setSelectedDisplay] = useState<boolean>(false);

  const { t } = useTranslation();
  const startItemsByPage = searchLimitPage * (page - 1) + 1;
  const endItemsByPage = page === totalPage ? totalSearch : searchLimitPage * page;

  /**
   * Handles pagination by setting offset
   */
  const handlePagination = (page: number, itemsPerPage: number) => {
    setOffset((page - 1) * itemsPerPage);
  };

  /**
   * Handles book filter change
   */
  const onChangeBookFilter = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectBookFilter(event.target.value as string);
  };

  /**
   * Handles page click to update the page number
   */
  const handleClickPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handlePagination(value, searchLimitPage);
  };

  /**
   * Fetches books based on location and other search parameters
   */
  const getBooks = (location: string[]) => {
    setLoading(true);
    setSearchDestination(`${location[0]} ${location[1] || ""}`);
    const city = location[0]?.split(" ").join("+").toLowerCase();
    const country = location[1]?.split(" ").join("+").toLowerCase();

    axios
      .get(`https://openlibrary.org/search.json?q=${country ? `${city}+${country}` : city}+${selectBookFilter}&limit=${searchLimitPage}&offset=${offset}`)
      .then(response => {
        setDisplayData(response.data.docs);
        setTotalSearch(response.data.numFound);
        setTotalPage(Math.ceil(response.data.numFound / searchLimitPage));
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Converts coordinates to an address and fetches books based on location
   */
  const reverseGeolocation = (coordinates: string[]) => {
    axios
      .get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEO_API_KEY}&lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`)
      .then(response => {
        getBooks([response.data.address.city, response.data.address.country]);
      })
      .catch(error => {
        console.error("Error in reverse geolocation:", error);
      });
  };

  /**
   * Fetch books on locationInput change
   */
  useEffect(() => {
    if (!locationInput) return;
    setDestination(locationInput);
    const isNumber = !isNaN(parseInt(locationInput[0]));
    if (isNumber) reverseGeolocation(locationInput);
    else getBooks(locationInput);
  }, [locationInput]);

  /**
   * Update data when page or filter changes
   */
  useEffect(() => {
    if (!displayData) return;
    getBooks(destination || []);
  }, [offset, selectBookFilter, searchLimitPage]);

  return (
    <div className={style.main} >
      <Grid container justifyContent="space-between" alignItems="center" className={style.headResults}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <h3>
              {locationInput ? `${t("result_label")} ${searchDestination}` : null}
              <span>{totalSearch ? `(${totalSearch})` : null}</span>
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container className={style.justifyGrid}>
              {displayData && (
                <Box  mr={2}>
                  <span>{`${startItemsByPage}-${endItemsByPage} ${t("page_range_items_of")} ${totalSearch} ${t("page_range_books")}`}</span>
                </Box>
              )}
              <Hidden xsDown>
                {displayData && userLimitSearch && (
                  <>
                    <span>{`- ${t("itemsPerPage_label")} `}</span>
                    <PageLimitSelect setSearchLimitPage={setSearchLimitPage} searchLimitPage={searchLimitPage} loading={loading} />
                  </>
                )}
              </Hidden>
              {locationInput && (
                <>
                  <FilterMenu selectBookFilter={selectBookFilter} onChangeBookFilter={onChangeBookFilter} loading={loading} />
                  <Hidden xsDown>
                    <DisplaySelection setSelectedDisplay={setSelectedDisplay} />
                  </Hidden>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        {locationInput ? (
          <ListingBook data={displayData} loading={loading} hasImage={hasImage} hasSubject={hasSubject} displayGrid={selectedDisplay} />
        ) : (
          <EmptyState />
        )}
      </Box>
      <div className={style.wrapPagination}>
        {displayData && (
          <Pagination count={totalPage} page={page} onChange={handleClickPage} className={style.pagination} />
        )}
      </div>
    </div>
  );
};

export default GoodRead;
