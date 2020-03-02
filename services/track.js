import {Estafeta} from './couriers/estafeta';

function Track(courier, tracking_code) {

    this.status = 'unknown';
    this.courier = courier;
    this.events = [];
    this.tracking_code = tracking_code;

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

Track.prototype.retrieveHistory = function () {
    switch (this.courier) {
        case 'estafeta':
            let client = new Estafeta(25, 'Usuario1', '1GCvGIu$');
            client.getTracking();
            break;
    }
};

module.exports = Track;