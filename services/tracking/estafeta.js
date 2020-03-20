const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'https://tracking.estafeta.com/Service.asmx?wsdl'
    : 'https://trackingqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(bill) {
      this.suscriberId = process.env.ESTAFETA_SUSCRIBER_ID_TRACK;
      this.login = process.env.ESTAFETA_USER_TRACK;
      this.password = process.env.ESTAFETA_PASSWORD_TRACK;
      this.bill = bill;
    }

    wayBillRange(initialWayBill = '', finalWaybill = '') {
        return {
            initialWayBill: initialWayBill,
            finalWaybill: finalWaybill
        };
    };

    waybillList(billType = 'G') {
        return {
            waybillType: billType,
            waybills: {
                string: this.bill
            }
        }
    };

    searchType(type = 'L') {
        return {
            waybillRange: this.wayBillRange(),
            waybillList: this.waybillList(),
            type: type
        }
    };

    historyConfiguration(include = 1, configuration = 'ALL') {
        return {
            includeHistory: include,
            historyType: configuration
        }
    };

    filter(information = 0, type = '') {
        return {
            filterInformation: information,
            filterType: type
        }
    };

    searchConfiguration(dimensions = 1, wayBillReplaceData = 0, returnDocumentData = 0,
                        multipleServiceData = 0, internationalData = 0, signature = 0,
                        customerInfo = 1) {
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

    async getTracking() {
        let data = {
            suscriberId: this.suscriberId,
            login: this.login,
            password: this.password,
            searchType: this.searchType(),
            searchConfiguration: this.searchConfiguration()
        };
        
        let result;
        try {
          result = await soap.createClientAsync(url)
            .then((client) => {
                return client.ExecuteQueryAsync(data);
            });
            console.log(result);
        } catch (e) {
            console.error(e);
        }
        return result[0].ExecuteQueryResult.trackingData.TrackingData[0].history.History;

    };
}

export {Estafeta};
