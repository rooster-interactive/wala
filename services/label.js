import {Estafeta} from './label/estafeta';

function Label() {
    this.courier = courier;
    this.content = content;
    this.content_description = content_description;
    this.customer_number = customer_number;
    this.weight = weight;
    this.delivery_estafeta_office = delivery_esatfeta_office;
    this.destination_country_id = destination_country_id;
    this.effective_date;
    this.return_document;
    this.quadrant;
    this.cost_center;
    this.origin_info;
    this.destination_info;

    console.log(this);
}

Label.prototype.addEvent = function (date, description) {
    this.events.push({
        date: date,
        description: description
    });
};

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

Label.prototype.retrieveHistory = async function () {
    switch (this.courier) {
        case 'estafeta':
            let client = new Estafeta(this.zip_code_ori, this.zip_code_dest, this.weight, this.large, this.height, this.width);
            client.destinationInfo();
            client.originInfo();
            let response = await client.getLabel();
            console.log(response);
            for (let event of response) {
                this.addEvent(new Date(event.eventDateTime), event.eventDescriptionSPA)
            }
            break;
    }
};

module.exports = Label;