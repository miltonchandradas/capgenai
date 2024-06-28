const cds = require("@sap/cds");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Middleware to handle single file upload within a function
const uploadFile = (req, res, next) => {
  const singleUpload = upload.single("content");

  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    next();
  });
};

cds.on("bootstrap", (app) => {
  // app.use(express.json());
  app.use((req, res, next) => {
    if (req.headers["content-type"]?.startsWith("multipart/form-data")) {
      uploadFile(req, res, next);
    } else {
      next();
    }
  });
});

module.exports = cds.server;
