const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'https://frecuenciacotizador.estafeta.com/Service.asmx?wsdl'
    : 'https://frecuenciacotizadorqa.estafeta.com/Service.asmx?wsdl';

class Estafeta {

    constructor(suscriber_id, login, password,zip_code_ori, zip_code_dest, weight, large, height, width) {
        this.suscriberId = suscriber_id;
        this.login = login;
        this.password = password;
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
            tipoEnvio: {
                EsPaquete: true,
                Peso: this.weight,
                Largo: this.large,
                Alto: this.height,
                Ancho: this.width
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
        } catch (e) {
            console.error(e);
        }
        return result[0].FrecuenciaCotizadorResult.Respuesta[0];
    };
}

export {Estafeta};