const HttpError = require("../models/Error");
const User = require("../models/User");

//All users
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

//case1 = Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
const getCase1Users = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ car: ["BMW", "Mercedes"] });
    users = users.filter((user) => parseFloat(user.income.substring(1)) < 5);
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

//case2 = Male Users which have phone price greater than 10,000.
const getCase2Users = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ gender: "Male" });
    users = users.filter((user) => parseInt(user.phone_price) > 10000);
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

//case3 = Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
const getCase3Users = async (req, res, next) => {
  let users;
  try {
    users = await User.find({
      last_name: /^M/,
      $expr: { $gt: [{ $strLenCP: "$quote" }, 15] },
    });
    users = users.filter((user) =>
      user.email.toLowerCase().includes(user.last_name.toLowerCase())
    );
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

//case4 = Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
const getCase4Users = async (req, res, next) => {
  let users;
  try {
    users = await User.find({
      car: ["BMW", "Mercedes", "Audi"],
      email: { $not: /[0-9]/ },
    });
  } catch (error) {
    return next(new HttpError("fetching users failed", 500));
  }

  res.status(200).json(users);
};

exports.getAllUsers = getAllUsers;
exports.getCase1Users = getCase1Users;
exports.getCase2Users = getCase2Users;
exports.getCase3Users = getCase3Users;
exports.getCase4Users = getCase4Users;
