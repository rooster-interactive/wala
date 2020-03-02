const soap = require('soap');
const url = process.env.IS_PRODUCTION === "true"
    ? 'https://tracking.estafeta.com/Service.asmx?wsdl'
    : 'https://trackingqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(bill) {
      console.log(url);
      this.suscriberId = process.env.ESTAFETA_SUSCRIBER_ID;
      this.login = process.env.ESTAFETA_USER;
      this.password = process.env.ESTAFETA_PASSWORD;
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

    filter(information = 0, type = 'ALL') {
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
        } catch (e) {
            console.error(e);
        }
        return result[0].ExecuteQueryResult.trackingData.TrackingData[0].history.History;

    };
}

export {Estafeta};
