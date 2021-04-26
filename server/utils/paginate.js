const ValidationError = require("./error");

async function paginate(query, options, callback) {
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
  const page = parseInt(options?.page) || 0;
  const sort = options?.sort || "";

  const skip = (page - 1) * (limit - 1);
  let resultsCount;
  let pagesCount;
  await this.countDocuments(query, (error, result) => {
    if (error) {
      resultsCount = 0;
      pagesCount = 0;
    } else {
      resultsCount = result;
      pagesCount = Math.ceil(resultsCount / limit);
    }
  });

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
          resultsCount,
          pagesCount,
          nextPage: page < pagesCount ? page + 1 : null,
          previousPage: page - 1 > 0 ? page - 1 : null,
          results,
        };
        return callback(null, response);
      }
    });
}

module.exports = { paginate };
