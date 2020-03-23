const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const response = require('../constants/response');
const Quote = require('../services/quote');
const supportedCouriers = ['estafeta'];

router.post('/', [
    check('courier').isIn(supportedCouriers),
    check('zip_code_ori').exists().isLength({min: 3}).isNumeric(),
    check('zip_code_dest').exists().isLength({min: 3}).isNumeric(),
    check('weight').exists().isNumeric(),
    check('large').exists().isNumeric(),
    check('height').exists().isNumeric(),
    check('width').exists().isNumeric()
], async (req, res, next) => {
    try {
        validationResult(req).throw();

        let quoting = new Quote(req.body.courier,
            req.body.zip_code_ori, req.body.zip_code_dest, req.body.weight, req.body.large, req.body.height,
            req.body.width);

        await quoting.retrieveHistory();
        let err = false;

        if (err) {
            response.status = false;
            response.message = "No se puede cotizar con esos ";
        } else {
            response.data = quoting;
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;