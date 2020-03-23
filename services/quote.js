import {Estafeta} from './quoting/estafeta';

function Quote(courier, zip_code_ori, zip_code_dest, weight, large, height, width) {
    this.courier = courier;
    this.zip_code_ori = zip_code_ori;
    this.zip_code_dest = zip_code_dest;
    this.weight = weight;
    this.large = large;
    this.height = height;
    this.width = width;
    this.response = {};
}

/**
 *
 * @param response
 */
Quote.prototype.setResponse = function (response) {
    this.response = response
};

/**
 *
 * @returns {Promise<string>}
 */
Quote.prototype.retrieveHistory = async function () {
    switch (this.courier) {
        case 'estafeta':
            let client = new Estafeta(this.zip_code_ori, this.zip_code_dest, this.weight, this.large, this.height, this.width);
            let response = await client.getQuote();
            this.setResponse(response);
            break;
        default:
            return 'no existe ese servicio';
    }
};

module.exports = Quote;