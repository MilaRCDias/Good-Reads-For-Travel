import React from "react";
// import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import style from "./ListingBook.module.css";

const ListingBook = ({ data, selectLang, loading }) => {
  console.log("listing", data, loading);

  // sort by book lang book.language?.[0] === selectLang
  const coverUrl = "http://covers.openlibrary.org/b/isbn/";

  return (
    <>
      {loading
        ? Array.from(new Array(3)).map(() => (
            <Grid container alignItems="center" className={style.listContainer}>
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
            console.log("book", book);
            return (
              <>
                {book.language?.[0] && (
                  <Grid
                    container
                    alignItems="center"
                    className={style.listContainer}
                    key={`${book.key}`}
                  >
                    <Grid item className={style.coverWrap}>
                      <img
                        height="100%"
                        width="100%"
                        className={style.coverImg}
                        src={
                          book.isbn !== undefined
                            ? `${coverUrl}${book.isbn[0]}-M.jpg`
                            : "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                        }
                        alt={book.title}
                      />
                    </Grid>
                    <Grid item className={style.infoWrap}>
                      <h2>{book.title}</h2>
                      <h5>by {book.author_name}</h5>
                      <div className={style.bookInfo}>
                        <h6>
                          Published in {book.first_publish_year}
                          in <span>{book.language.length + 1} languages</span>
                        </h6>
                      </div>

                      <a className={style.actionBtn} href="google.com">
                        VIEW MORE
                      </a>
                    </Grid>
                  </Grid>
                )}
              </>
            );
          })}
    </>
  );
};

ListingBook.propTypes = {};

export default ListingBook;
