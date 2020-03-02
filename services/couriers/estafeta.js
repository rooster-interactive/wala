const soap = require('soap');
const url = 'https://tracking.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor() {
        this.subscriberId = process.env.ESTAFETA_SUSCRIBER_ID;
        this.login = process.env.ESTAFETA_USER;
        this.password = process.env.ESTAFETA_PASSWORD;
    }

    wayBillRange(initialWayBill = '', finalWaybill = '') {
        return {
            initialWayBill: initialWayBill,
            finalWaybill: finalWaybill
        };
    };

    waybillList(billType = 'R', wayBills = []) {
        return {
            waybillType: billType,
            waybills: wayBills
        }
    };

    searchType(type = 'L') {
        return {
            waybillRange: wayBillRange(),
            waybillList: waybillList(),
            type: type
        }
    };

    historyConfiguration(include = 1, configuration = 'ALL') {
        return {
            includeHistory: include,
            historyConfiguration: configuration
        }
    };

    filter(information = 0, type = 'DELIVERED') {
        return {
            filterInformation: information,
            filterType: type
        }
    };

    searchConfiguration(dimensions = 1, wayBillReplaceData = 0, returnDocumentData = 0, multipleServiceData = 0, internationalData = 0, signature = 0, customerInfo = 1) {
        return {
            includeDimensions: dimensions,
            includeWaybillReplaceData: wayBillReplaceData,
            includeReturnDocumentData: returnDocumentData,
            includeMultipleServiceData: multipleServiceData,
            includeInternationalData: internationalData,
            includeSignature: signature,
            includeCustomerInfo: customerInfo,
            historyConfiguration: this.historyConfiguration(),
            filterType: this.filter(),
        }
    };

    getTracking() {
        soap.createClient(url, (err, client) => {
            client.ExecuteQuery({
                'suscriberId': this.subscriberId,
                'login': this.login,
                'password': this.password,
                'searchType': this.searchType(),
                'searchConfiguration': this.searchConfiguration()
            }, (err, result) => {
                console.info(result);
            })
        })
    };
}

export {Estafeta};
