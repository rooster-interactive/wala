"use strict"

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const supportedCouriers = ['estafeta'];
const response = require('../constants/response');

function Tracking() {
  this.status = 'unknown';
  this.events = [];
  this.tracking_code = '';

  return this;
}

Tracking.prototype.addEvent = function(date, description){
  this.events.push({
    date: date,
    description: description
  });
}

Tracking.prototype.getValidStatus = function(){
  return [
    'created',
    'picked',
    'in_movement',
    'with_delivery_man',
    'failed_deliver',
    'delivered'
  ]
}

router.get('/', [
  check('courier').isIn(supportedCouriers),
  check('tracking_code').exists(),
], (req, res, next) => {
  try {
    validationResult(req).throw();

    //@todo Check with the courier for history with given tracking code

    let tracking = new Tracking();
    tracking.tracking_code = req.query.tracking_code;

    let info;

    switch(req.query.courier){
      case 'estafeta':
        info = {}; // Retrieves info from SAP / REST / Edndpoint
      break;
    }
    // Fill with the response
    /**
      tracking.status = 'created';
      tracking.addEvent(new Date(), 'Just created event');
    */

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
