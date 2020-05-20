import {Estafeta} from './label/estafeta';

/**
 *
 * @param courier
 * @param content
 * @param content_description
 * @param customer_number
 * @param weight
 * @param delivery_estafeta_office
 * @param destination_country_id
 * @param effective_date
 * @param return_document
 * @param quadrant
 * @param cost_center
 * @param origin_info
 * @param destination_info
 * @constructor
 */
function Label(additionalInfo, courier, content, content_description, customer_number, weight, delivery_estafeta_office,
               destination_country_id, effective_date, return_document, quadrant, cost_center,
               origin_info, destination_info) {
    this.additionalInfo = additionalInfo;
    this.courier = courier;
    this.content = content;
    this.content_description = content_description ? content_description : content;
    this.customer_number = customer_number;
    this.weight = weight;
    this.delivery_estafeta_office = delivery_estafeta_office;
    this.destination_country_id = destination_country_id;
    this.effective_date = effective_date;
    this.return_document = return_document;
    this.quadrant = quadrant;
    this.cost_center = cost_center;
    this.origin_info = origin_info;
    this.destination_info = destination_info;
    this.response = {};
}

/**
 *
 * @param response
 */
Label.prototype.setResponse = function (response) {
    this.response = response
};

/**
 *
 * @returns {Promise<void>}
 */
Label.prototype.retrieveHistory = async function () {
    switch (this.courier) {
        case 'estafeta':
            try {
                let client = new Estafeta(this.additionalInfo,undefined, this.return_document, this.weight, undefined,
                    undefined, this.content, this.content_description, this.cost_center, this.customer_number,
                    this.delivery_estafeta_office, this.destination_country_id, this.effective_date, this.quadrant,
                    this.origin_info.zip_code, this.origin_info, this.destination_info);
                let response = await client.getLabel();
                this.setResponse(response);
            } catch (e) {
                console.error(e)
            }
            break;
    }
};

module.exports = Label;