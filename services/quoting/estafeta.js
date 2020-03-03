const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'http://frecuenciacotizador.estafeta.com/Service.asmx?wsdl'
    : 'http://frecuenciacotizadorqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(zip_code_ori, zip_code_dest, weight, large, height, width) {
        this.suscriberId = process.env.ESTAFETA_SUSCRIBER_ID;
        this.login = process.env.ESTAFETA_USER;
        this.password = process.env.ESTAFETA_USER;
        this.weight = weight;
        this.large = large;
        this.height = height;
        this.width = width;
        this.zip_code_ori = zip_code_ori;
        this.zip_code_dest = zip_code_dest;
    }

    async getQuote() {
        let result;
        let data = {
            idusuario: this.suscriberId,
            usuario: this.login,
            contra: this.password,
            esFrecuencia: false,
            esLista: true,
            TipoEnvio: {
                EsPaquete: true,
                peso: this.weight,
                largo: this.large,
                alto: this.height,
                ancho: this.width
            },
            ListaOrigen: {
                string: this.zip_code_ori
            },
            ListaDestino: {
                string: this.zip_code_dest
            }
        };

        try {
            result = await soap.createClientAsync(url)
                .then((client) => {
                    return client.FrecuenciaCotizadorAsync(data);
                });
        } catch (e) {
            console.error(e);
        }
        return result;
    };
}

export {Estafeta};