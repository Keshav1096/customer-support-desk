const axios = require("axios");

const searchMovie = (searchText) => {
  return new Promise(async (resolve, reject) => {
    if (!searchText) return reject();

    const config = {
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?api_key=5b589e04a2c2054cf007744343ea0d58&query=${searchText}`,
      headers: {},
    };

    let response = await axios(config).catch(function (error) {
      console.log(error);
      return reject(error.message);
    });
    return resolve(response.data);
  });
};

module.exports = { searchMovie };
