const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const response = require('../constants/response');
const Quote = require('../services/quote');
const supportedCouriers = ['estafeta'];

router.get('/', [
    check('courier').isIn(supportedCouriers),
    check('zip_code_ori').exists(),
    check('zip_code_des').exists(),
    check('weight').exists(),
    check('large').exists(),
    check('height').exists(),
    check('width').exists()
], async (req, res, next) => {
    try {
        validationResult(req).throw();

        let quoting = new Quote(req.query.courier, req.query.zip_cade_ori, req.query.zip_cade_dest, req.query.weight,
            req.query.large, req.query.height, req.query.width);

        await quoting.getQuote();
        let err = false;

        if (err) {
            response.status = false;
            response.message = "No se puede cotizar con esos ";
        } else {
            response.data = tracking;
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;