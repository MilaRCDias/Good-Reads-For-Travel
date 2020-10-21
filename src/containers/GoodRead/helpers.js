/**
 * Helper function to sort data
 * @param {array} listData 
 * @param {string} sortby 
 */

export const sortDataAlphabetic = (listData, sortby) => {
  const sortListing =
    listData.length > 0
      ? listData.sort((a, b) => {
          const itemA = a.title < b.title;
          const itemB = a.title > b.title;
          return sortby === "AZ"
            ? itemA < itemB
              ? 1
              : -1
            : itemA > itemB
            ? 1
            : -1;
        })
      : [];

  return sortListing;
};
