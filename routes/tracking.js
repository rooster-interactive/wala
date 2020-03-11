"use strict"

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const response = require('../constants/response');
const Track = require('../services/track');
const supportedCouriers = ['estafeta'];

router.get('/', [
  check('courier').isIn(supportedCouriers),
  check('trackingCode').exists().isLength({min:22}).isString(),
], async (req, res, next) => {
  try {
    validationResult(req).throw();

    let tracking = new Track(req.query.courier, req.query.trackingCode);
    
    await tracking.retrieveHistory();
    let err = false;

    if(err){
      response.status = false;
      response.message = "The tracking code doesn't exists.";
    }else {
      response.data = tracking;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(422).json(err);
}
});

module.exports = router;
