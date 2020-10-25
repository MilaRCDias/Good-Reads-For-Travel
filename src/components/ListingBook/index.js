import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTranslation } from "react-i18next";
import {
  useTheme,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import style from "./ListingBook.module.css";
import { Box } from "@material-ui/core";


/** ListingBook component, presentational component 
 * to show the search result as a list
 * usage of loading skeleton  
 * @param {array} data information 
 * @param {boolean} loading 
 * @param {boolean} hasSubject  
 * @param {boolean} hasImage 
 * @param {boolean} displayGrid 
 */
const ListingBook = ({
  data,
  loading,
  hasSubject = true,
  hasImage = true,
  displayGrid,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const screenSM = useMediaQuery(theme.breakpoints.up("sm"));
  /**
   *  Urls of cover image
   * */
  const coverUrl = process.env.REACT_APP_COVER_IMAGE_URL;
  const defaultImage = "https://bit.ly/2TbQXhk";

  return (
    <Grid container spacing={2} alignContent="flex-start">
      {loading
        ? Array.from(new Array(3)).map((a, index) => (
            <Grid Grid item xs={displayGrid ? 4 : 12} key={`key${index}`}>
              <Grid
                container
                alignItems={displayGrid ? "flex-start" : "center"}
                className={
                  displayGrid ? style.listConteinerGrid : style.listContainer
                }
                style={{ padding: "1rem" }}
              >
                {hasImage ? (
                  screenSM ? (
                    <Grid
                      item
                      xs={displayGrid ? 12 : 3}
                      sm={displayGrid ? 12 : 3}
                      md={displayGrid ? 12 : 2}
                    >
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={192}
                        width={displayGrid ? "90%" : "80%"}
                        style={{ marginBottom: 6 }}
                      />
                    </Grid>
                  ) : null
                ) : null}
                <Grid
                  item
                  xs={displayGrid ? 12 : 8}
                  sm={displayGrid ? 12 : 9}
                  md={displayGrid ? 12 : 8}
                >
                  <Skeleton
                    animation="wave"
                    height={20}
                    width={displayGrid ? "80%" : "50%"}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={20} width="95%" />

                  <Skeleton animation="wave" height={40} width="80%" />
                </Grid>
              </Grid>
            </Grid>
          ))
        : data?.map((book) => {
            return (
              <Grid item md={displayGrid ? 4 : 12} key={`${book.isbn}`}>
                <Grid
                  container
                  alignItems={displayGrid ? "flex-start" : "center"}
                  className={
                    displayGrid ? style.listConteinerGrid : style.listContainer
                  }
                >
                  {hasImage ? (
                    screenSM ? (
                      <Grid
                        item
                        xs={displayGrid ? 12 : 3}
                        sm={displayGrid ? 12 : 3}
                        md={displayGrid ? 12 : 2}
                      >
                        <img
                          height="100%"
                          width="100%"
                          className={style.coverImg}
                          src={
                            book.isbn !== undefined
                              ? `${coverUrl}${book.isbn[0]}-M.jpg?default=false`
                              : defaultImage
                          }
                          onError={(e) => (e.target.src = defaultImage)}
                          alt={book.title}
                        />
                      </Grid>
                    ) : null
                  ) : null}
                  <Grid
                    item
                    xs={displayGrid ? 12 : 9}
                    sm={displayGrid ? 12 : 9}
                    md={displayGrid ? 12 : 10}
                  >
                    <Box p={2}>
                      <h2>{book.title}</h2>
                      <h5>
                        {t("book_title_label")} {book.author_name}
                      </h5>
                      {hasSubject ? (
                        <h6>
                          {" "}
                          {book.subject
                            ? `${t("subject_label")} ${book.subject}`
                            : null}
                        </h6>
                      ) : null}

                      <h6>
                        {t("published_in")} {book.first_publish_year}{" "}
                        <span>
                          {book.language === undefined
                            ? `${t("label_in")} ${1}`
                            : `${t("label_in")} ${book.language.length}`}{" "}
                          {t("languages_label")}
                        </span>
                      </h6>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
    </Grid>
  );
};


ListingBook.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasSubject: PropTypes.bool,
  hasImage: PropTypes.bool,
  displayGrid: PropTypes.bool,
};

export default ListingBook;
