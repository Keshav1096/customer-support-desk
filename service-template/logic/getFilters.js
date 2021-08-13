const axios = require("axios");
const isoLang = require("../config/iso_lang.json");

const movieGenreAPI = async () => {
  const config = {
    method: "get",
    url: "https://api.themoviedb.org/3/genre/movie/list?api_key=5b589e04a2c2054cf007744343ea0d58",
    headers: {},
  };

  let response = await axios(config).catch(function (error) {
    console.log(error);
    return null;
  });
  if (!response) return Promise.reject();
  return Promise.resolve(response.data);
};

const getFilters = (type) => {
  return new Promise(async (resolve, reject) => {
    if (!type) return reject();
    const filters = {};
    switch (type) {
      case "movie":
        let { genres = [] } = await movieGenreAPI().catch((err) => reject(err));
        if (genres.length === 0) return reject();
        filters.genres = genres;
        filters.languages = isoLang;
        break;
      case "tv":
        break;
      default:
        break;
    }
    return resolve(filters);
  });
};

module.exports = { getFilters };
