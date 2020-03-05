const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const response = require('../constants/response');
const Label = require('../services/label');
const supportedCouriers = ['estafeta'];


router.post('/', [
    check('courier').isIn(supportedCouriers),
    check('weight').exists().isFloat(),
    check('content').exists().isString(),
    check('content_description').isString().optional({nullable: true}),
    check('customer_number').isNumeric().optional({nullable: true}).isLength({min: 7}),
    check('delivery_estafeta_office').isBoolean().optional({nullable: true}),
    check('destination_country_id').isAlpha().optional({nullable: true}),
    check('effective_date').isAlpha().optional({nullable: true}).isLength({min: 5}),
    check('return_document').isBoolean().optional({nullable: true}),
    check('quadrant').isNumeric().optional({nullable: true}),
    check('cost_center').isAlpha().optional({nullable: true}),
    check('origin_info.address1').isString().exists(),
    check('origin_info.address2').isString().optional({nullable: true}),
    check('origin_info.cellphone').isNumeric().exists().isLength({min: 10}),
    check('origin_info.city').isString().exists(),
    check('origin_info.contact').isString().exists(),
    check('origin_info.corporate_name').isString().optional({nullable: true}),
    check('origin_info.neighborhood').isString().exists(),
    check('origin_info.phone_number').isNumeric().optional({nullable: true}).isLength({min: 8}),
    check('origin_info.state').isString().exists(),
    check('origin_info.zip_code').isString().exists().isLength({min: 3}),
    check('destination_info.address1').isString().exists(),
    check('destination_info.address2').isString().optional({nullable: true}),
    check('destination_info.cellphone').isNumeric().exists().isLength({min: 10}),
    check('destination_info.city').isString().exists(),
    check('destination_info.contact').isString().exists(),
    check('destination_info.corporate_name').isString().optional({nullable: true}),
    check('destination_info.neighborhood').isString().exists(),
    check('destination_info.phone_number').isNumeric().optional({nullable: true}).isLength({min: 8}),
    check('destination_info.state').isString().exists(),
    check('destination_info.zip_code').isString().exists().isLength({min: 3}),

], async (req, res, next) => {
    try {
        validationResult(req).throw();

        let {
            courier, content, content_description, customer_number, weight, delivery_estafeta_office,
            destination_country_id, effective_date, return_document, quadrant, cost_center,
            origin_info, destination_info
        } = req.query;
        let label = new Label(courier, content, content_description, customer_number, weight, delivery_estafeta_office,
            destination_country_id, effective_date, return_document, quadrant, cost_center,
            origin_info, destination_info);

        await Label.getLabel();
        let err = false;

        if (err) {
            response.status = false;
            response.message = "No se puede generar la etiqueta con esos parametros";
        } else {
            response.data = tracking;
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;