"use strict";
const httpStatus = require("http-status-codes");
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    })
};