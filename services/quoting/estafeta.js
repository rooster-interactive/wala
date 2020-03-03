const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'https://tracking.estafeta.com/Service.asmx?wsdl'
    : 'https://trackingqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {
    async getQuote() {
        let data = {
            suscriberId: this.suscriberId,
            login: this.login,
            password: this.password
        };
        let result;
        try {
            result = await soap.createClientAsync(url)
                .then((client) => {
                    return client.ExecuteQueryAsync(data);
                });
        } catch (e) {
            console.error(e);
        }
        return result[0].ExecuteQueryResult.trackingData.TrackingData[0].history.History;

    };
}

export {Estafeta};