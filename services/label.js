import {Estafeta} from './label/estafeta';

function Label(courier, content, content_description, customer_number, weight, delivery_estafeta_office,
               destination_country_id, effective_date, return_document, quadrant, cost_center,
               origin_info, destination_info) {
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
}

/**
 *
 * @param date
 * @param description
 */
Label.prototype.addEvent = function (response) {
    this.label = response
};

/**
 *
 * @returns {string[]}
 */
Label.prototype.getValidStatus = function () {
    return [
        'created',
        'picked',
        'in_movement',
        'with_delivery_man',
        'failed_deliver',
        'delivered'
    ]
};

/**
 *
 * @returns {Promise<void>}
 */
Label.prototype.retrieveHistory = async function () {
    switch (this.courier) {
        case 'estafeta':
            try{
                let client = new Estafeta(undefined, this.return_document, this.weight, undefined,
                    undefined, this.content, this.content_description, this.cost_center, this.customer_number,
                    this.delivery_estafeta_office, this.destination_country_id, this.effective_date, this.quadrant,
                    this.origin_info.zip_code, this.origin_info, this.destination_info);
                let response = await client.getLabel();
                console.log(response);
                this.addEvent(response);
            }catch (e) {
                console.error(e)
            }
            break;
    }
};

module.exports = Label;