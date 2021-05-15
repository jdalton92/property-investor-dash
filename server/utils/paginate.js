const ValidationError = require("./error");

function paginate(query, options, callback) {
  if (options?.limit && options?.limit <= 0) {
    return callback(
      new ValidationError(400, "limit must be greater than 0"),
      null
    );
  }
  if (options?.page && options?.page < 0) {
    return callback(
      new ValidationError(400, "page must be greater than 0"),
      null
    );
  }

  query = query || {};
  const limit = parseInt(options?.limit) || 10;
  const page = parseInt(options?.page) || 1;
  const sort = options?.sort || "";
  const exclude = options?.exclude || "";

  const skip = (page - 1) * (limit - 1);
  let resultsCount;
  let pagesCount;
  this.countDocuments(query, (error, result) => {
    if (error) {
      resultsCount = 0;
      pagesCount = 0;
    } else {
      resultsCount = result;
      pagesCount = Math.ceil(resultsCount / limit);
    }

    if (page > pagesCount) {
      const response = {
        resultsCount,
        pagesCount,
        nextPage: null,
        previousPage: pagesCount,
        results: [],
      };
      return callback(null, response);
    }

    this.find(query)
      .select(exclude)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec(function (error, results) {
        if (error) {
          return callback(
            new ValidationError(500, "Error paginating results"),
            null
          );
        } else {
          const response = {
            pagesCount,
            nextPage: page < pagesCount ? page + 1 : null,
            previousPage: page - 1 > 0 ? page - 1 : null,
            resultsCount,
            results,
          };
          return callback(null, response);
        }
      });
  });
}

module.exports = { paginate };
