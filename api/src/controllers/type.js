const axios = require("axios");
const { Type } = require("../db");
const { TYPE_URL } = require("../constants");

const getAllType = async (req, res, next) => {
  try {
    const { data } = await axios.get(`${TYPE_URL}`);

    const type = data.results.map((element) => {
      console.log("element:", element);

      Type.findOrCreate({
        where: { name: element.name },
      });
    });

    const dbResults = await Type.findAll({
      attributes: {},
    });
    return res.json(dbResults);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllType,
};
