const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const response = require('../constants/response');
const Label = require('../services/label');
const supportedCouriers = ['estafeta'];


router.post('/', [
    check('courier').isIn(supportedCouriers),
    check('weight').exists().isNumeric(),
    check('content').exists().isString(),
    check('content-description').isString().optional({nullable: true}),
    check('customerNumber').isNumeric().optional({nullable: true}),
    check('delivery-estafeta-office').isBoolean(),
    check('destination-country-id').isAlpha().optional({nullable: true}),
    check('effective-date').isString().optional({nullable: true}),
    check('return-document').isBoolean().optional({nullable: true}),
    check('quadrant').isNumeric().optional({nullable: true}),
    check('cost-center').isString().optional({nullable: true}),
    check('origin-info').custom(value => {
        value.address1.isString().exists();
        value.address2.isString().optional({nullable: true});
        value.cellphone.isNumeric().optional({nullable: true});
        value.city.isString().exists();
        value.contactName.isString().exists();
        value.corporateName.isString().optional({nullable: true});
        value.customerNumber.isNumeric().optional({nullable: true});
        value.neighborhood.isString().exists();
        value.phoneNumber.isNumeric().optional({nullable: true});
        value.state.isString().exists();
        value.zipCode.isString().exists();
    }),
    check('destination-info').custom(value => {
        value.address1.isString().exists();
        value.address2.isString().optional({nullable: true});
        value.cellphone.isNumeric().optional({nullable: true});
        value.city.isString().exists();
        value.contactName.isString().exists();
        value.corporateName.isString().optional({nullable: true});
        value.customerNumber.isNumeric().optional({nullable: true});
        value.neighborhood.isString().exists();
        value.phoneNumber.isNumeric().optional({nullable: true});
        value.state.isString().exists();
        value.zipCode.isString().exists();
    })
], async (req, res, next) => {
    try {
        validationResult(req).throw();

        let label = new Label(req.query.courier, req.query.zip_cade_ori, req.query.zip_cade_dest, req.query.weight,
            req.query.large, req.query.height, req.query.width);

        await label.getLabel();
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