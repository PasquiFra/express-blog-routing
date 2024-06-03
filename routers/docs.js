const path = require("path");
const fs = require("fs");

const express = require("express");
const router = express.Router();

const docsControllers = require("../controllers/docs.js");

// rotte per /docs

router.get("/:file", docsControllers.file('sendFile'));

router.get("/:file/download", docsControllers.file('download'));


module.exports = router;