const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.js");

const multer = require("multer");
const uploader = multer({ dest: "public/img" });

// Questo è il router di /posts

router.get("/", blogController.index);
router.post("/", uploader.single("image"), blogController.create);
router.get("/:slug", blogController.show);
router.delete("/:slug", blogController.destroy);

module.exports = router;