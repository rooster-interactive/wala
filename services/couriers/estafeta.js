const soap = require('soap');
const url = process.env.IS_PRODUCTION
    ? 'https://tracking.estafeta.com/Service.asmx?wsdl'
    : 'https://trackingqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(bill = 0) {
        this.suscriberId = process.env.ESTAFETA_SUSCRIBER_ID;
        this.login = process.env.ESTAFETA_USER;
        this.password = process.env.ESTAFETA_PASSWORD;
        this.waybillList(null, bill)
    }

    wayBillRange(initialWayBill = '', finalWaybill = '') {
        return {
            "est:initialWayBill": initialWayBill,
            "est:finalWaybill": finalWaybill
        };
    };

    waybillList(billType = 'G', bills = 0) {
        return {
            "est:waybillType": billType,
            "est:waybills": {
                "est:string": bills
            }
        }
    };

    searchType(type = 'L') {
        return {
            "est:waybillRange": this.wayBillRange(),
            "est:waybillList": this.waybillList(),
            "est:type": type
        }
    };

    historyConfiguration(include = 1, configuration = 'ALL') {
        return {
            "est:includeHistory": include,
            "est:historyType": configuration
        }
    };

    filter(information = 0, type = 'DELIVERED') {
        return {
            "est:filterInformation": information,
            "est:filterType": type
        }
    };

    searchConfiguration(dimensions = 1, wayBillReplaceData = 0, returnDocumentData = 0, multipleServiceData = 0, internationalData = 0, signature = 0, customerInfo = 1) {
        return {
            "est:includeDimensions": dimensions,
            "est:includeWaybillReplaceData": wayBillReplaceData,
            "est:includeReturnDocumentData": returnDocumentData,
            "est:includeMultipleServiceData": multipleServiceData,
            "est:includeInternationalData": internationalData,
            "est:includeSignature": signature,
            "est:includeCustomerInfo": customerInfo,
            "est:historyConfiguration": this.historyConfiguration(),
            "est:filterType": this.filter(),
        }
    };

    async getTracking() {
        let data = {
            "est:suscriberId": this.suscriberId,
            "est:login": this.login,
            "est:password": this.password,
            "est:searchType": this.searchType(),
            "est:searchConfiguration": this.searchConfiguration()
        };
        let result;
        try {
            result = await soap.createClientAsync(url,)
                .then((client) => {
                    return client.ExecuteQueryAsync(data);
                });

            console.log(data, result);

        } catch (e) {
            console.error(e);
        }
        return result;

    };
}

export {Estafeta};
