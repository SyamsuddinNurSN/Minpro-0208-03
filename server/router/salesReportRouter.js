const router = require("express").Router()
const salesReportController = require("../controller/salesReportController")
// const { salesReportController } = require("../controller/salesReportController")

router.get('/', salesReportController.getAllTransaction)

module.exports = router