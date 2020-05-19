const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'https://frecuenciacotizador.estafeta.com/Service.asmx?wsdl'
    : 'https://frecuenciacotizadorqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(zip_code_ori, zip_code_dest, weight, large, height, width) {
        this.idusuario = process.env.ESTAFETA_SUSCRIBER_ID_QUOTE;
        this.usuario = process.env.ESTAFETA_USER_QUOTE;
        this.contra = process.env.ESTAFETA_PASSWORD_QUOTE;
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
            idusuario: this.idusuario,
            usuario: this.usuario,
            contra: this.contra,
            esFrecuencia: false,
            esLista: true,
            tipoEnvio: {
                EsPaquete: true,
                Peso: parseInt(this.weight),
                Largo: parseInt(this.large),
                Alto: parseInt(this.height),
                Ancho: parseInt(this.width)
            },
            datosOrigen: {
                string: this.zip_code_ori
            },
            datosDestino: {
                string: this.zip_code_dest
            }
        };

        try {
            result = await soap.createClientAsync(url)
                .then((client) => {
                    return client.FrecuenciaCotizadorAsync(data);
                });

            return result[0].FrecuenciaCotizadorResult.Respuesta[0];

        } catch (e) {
            throw e;
        }

    };
}

export {Estafeta};