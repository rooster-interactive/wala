const soap = require('soap');
const url = 'https://tracking.estafeta.com/Service.asmx?wsdl';

function Estafeta(subscriber, login, password) {
    this.SubscriberId = subscriber;
    this.login = login;
    this.password = password;
};

Estafeta.prototype.wayBillRange = function (initialWayBill = '', finalWaybill = '') {
    return {
        initialWayBill: initialWayBill,
        finalWaybill: finalWaybill
    };
};

Estafeta.prototype.waybillList = function (billType = 'R', wayBills = []) {
    return {
        waybillType: billType,
        waybills: wayBills
    }
};

Estafeta.prototype.searchType = function (type = 'L') {
    return {
        waybillRange: this.wayBillRange(),
        waybillList: this.waybillList(),
        type: type
    }
};

Estafeta.prototype.historyConfiguration = function (include = 1, configuration = 'ALL') {
    return {
        includeHistory: include,
        historyConfiguration: configuration
    }
};

Estafeta.prototype.filter = function (information = 0, type = 'DELIVERED') {
    return {
        filterInformation: information,
        filterType: type
    }
};

Estafeta.prototype.searchConfiguration = function (dimensions = 1, wayBillReplaceData = 0, returnDocumentData = 0, multipleServiceData = 0, internationalData = 0, signature = 0, customerInfo = 1) {
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

Estafeta.prototype.getTracking = function () {
    soap.createClient(url, function (err, client) {
    })
};


module.exports = Estafeta;