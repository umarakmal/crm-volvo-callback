const express = require("express");
const router = express.Router();
const {
  input,
  getAll,
  postAll,
  getFirstdata,
  getchurndata,
  postchurndata,
} = require("../controllers/inputform");

router.post("/inputform", input);
router.get("/agent", getAll);
router.post("/postall", postAll);
router.post("/getagent", getFirstdata);
router.post("/churn", postchurndata);
router.get("/getchurn", getchurndata);
module.exports = router;
