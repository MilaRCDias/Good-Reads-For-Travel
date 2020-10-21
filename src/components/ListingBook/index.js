import React from "react";
// import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTranslation } from "react-i18next";

import style from "./ListingBook.module.css";

const ListingBook = ({ data, loading }) => {
  const { t } = useTranslation();

  const coverUrl = "http://covers.openlibrary.org/b/isbn/";
  const defaultImage =
    "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";

  return (
    <>
      {loading
        ? Array.from(new Array(3)).map((a, index) => (
            <Grid
              container
              alignItems="center"
              className={style.listContainer}
              key={`key${index}`}
            >
              <Grid item className={style.coverWrap}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={192}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              </Grid>
              <Grid item className={style.infoWrap}>
                <Skeleton
                  animation="wave"
                  height={20}
                  width="40%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={20} width="20%" />

                <Skeleton animation="wave" height={40} width="10%" />
              </Grid>
            </Grid>
          ))
        : data?.map((book) => {
            return (
              <div key={`${book.isbn}`}>
                <Grid
                  container
                  alignItems="center"
                  className={style.listContainer}
                >
                  <Grid item className={style.coverWrap}>
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
                  <Grid item className={style.infoWrap}>
                    <h2>{book.title}</h2>
                    <h5>
                      {t("book_title_label")} {book.author_name}
                    </h5>
                    <div className={style.bookInfo}>
                      <h6>
                        {" "}
                        {book.subject
                          ? `${t("subject_label")} ${book.subject}`
                          : null}
                      </h6>
                      <h6>
                        {t("published_in")} {book.first_publish_year}{" "}
                        <span>
                          {book.language === undefined
                            ? `${t("label_in")} ${1}`
                            : `${t("label_in")} ${book.language.length}`}{" "}
                          {t("languages_label")}
                        </span>
                      </h6>
                    </div>

                    {/*  <a className={style.actionBtn} href="google.com">
                        VIEW MORE
                      </a> */}
                  </Grid>
                </Grid>
              </div>
            );
          })}
    </>
  );
};

ListingBook.propTypes = {};

export default ListingBook;
