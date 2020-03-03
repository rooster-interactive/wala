import {Estafeta} from './quoting/estafeta';

function Track(zip_code_ori, zip_code_dest, weight, large, height, width) {
    this.courier = courier;
    this.zip_code_ori = zip_code_ori;
    this.zip_code_dest = zip_code_dest;
    this.weight = weight;
    this.large = large;
    this.height = height;
    this.width = width;

    console.log(this);
}

Track.prototype.addEvent = function (date, description) {
    this.events.push({
        date: date,
        description: description
    });
};

Track.prototype.getValidStatus = function () {
    return [
        'created',
        'picked',
        'in_movement',
        'with_delivery_man',
        'failed_deliver',
        'delivered'
    ]
};

Track.prototype.retrieveHistory = async function () {
    switch (this.courier) {
        case 'estafeta':
            let client = new Estafeta(this.tracking_code);
            let response = await client.getTracking();
            console.log(response);
            for(let event of response){
                this.addEvent(new Date(event.eventDateTime), event.eventDescriptionSPA)
            }
            break;
    }
};

module.exports = Track;