import {Estafeta} from './tracking/estafeta';

/**
 *
 * @param courier
 * @param tracking_code
 * @constructor
 */
function Track(courier, tracking_code) {

    this.status = 'unknown';
    this.courier = courier;
    this.events = [];
    this.tracking_code = tracking_code;
}

/**
 *
 * @param date
 * @param description
 */
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

/**
 *
 * @returns {Promise<void>}
 */
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