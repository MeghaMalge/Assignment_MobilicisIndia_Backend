const HttpError = require("../models/Error");
const User = require("../models/User");
const { topN } = require("../utils/topN");

//top 10 cities which have the highest number of users and their average income.
const getTop10Cities = async (req, res, next) => {
  let top10Cities;
  try {
    let users;

    cities = await User.distinct("city");
    cities = await Promise.all(
      cities.map(async (city) => {
        users = await User.find({ city: city });
        return {
          users: users,
          total: users.length,
        };
      })
    );

    top10Cities = topN(cities, 10);
    top10Cities = top10Cities.map((city) => {
      let totalIncome = 0;
      city.users.forEach((user) => {
        totalIncome += parseFloat(user.income.substring(1));
      });

      const avgIncome = totalIncome / city.total;
      return {
        city: city.users[0].city,
        users: city.total,
        avgIncome: avgIncome.toFixed(2),
      };
    });
  } catch (error) {
    return next(new HttpError("fetching cities failed", 500));
  }

  res.status(200).json(top10Cities);
};

exports.getTop10Cities = getTop10Cities;
