// Require methods here
const { searchMovie } = require("../logic/searchMovie");
const { getFilters } = require("../logic/getFilters");

// free text search
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const search = (req, res) => {
  let { search } = req.query;
  if (!search)
    return res.status(400).json({ success: false, err: "Missing params" });
  searchMovie(search)
    .then((results) => {
      if (!results)
        return res
          .status(400)
          .json({ success: false, err: "something went wrong" });

      return res.status(200).json({ success: true, data: results });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, err: err });
    });
};

const filters = (req, res) => {
  /**
   * return following filters movie|tv
   * 1. avbl genres
   * 2. rating scale
   * 3. popularity
   * 4. language
   */
  try {
    let type = (req.query && req.query.type) || null;
    //   let { type = null } = req.query;
    console.log(type);
    if (!type)
      return res.status(400).json({ success: false, err: "Missing params" });

    // pass type to get filter function
    getFilters(type)
      .then((filters) => {
        if (!filters)
          return res
            .status(500)
            .json({ success: false, err: "Something went wrong" });
        return res.status(200).json({ success: true, data: filters });
      })
      .catch((err) => console.log(err));
  } catch (e) {
    return res.status(500).json({ success: false, err: e.toString() });
  }
};

module.exports = { search, filters };
