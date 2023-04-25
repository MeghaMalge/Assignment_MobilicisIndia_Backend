const express = require("express");

const router = express.Router();

const {
  getCase1Users,
  getCase2Users,
  getCase3Users,
  getCase4Users,
  getAllUsers,
} = require("../controllers/usersControllers");

//All users
router.get("/", getAllUsers);

//case1 = Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get("/case1", getCase1Users);

//case2 = Male Users which have phone price greater than 10,000.
router.get("/case2", getCase2Users);

//case3 = Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get("/case3", getCase3Users);

//case4 = Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
router.get("/case4", getCase4Users);

module.exports = router;
