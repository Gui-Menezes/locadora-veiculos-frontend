import axios from 'axios';

const BASE_URL_MODELO = 'http://optimistic-fish-1880d60db2.strapiapp.com/api/modelos/';

async function listarModelos() {
    const response = await axios.get(BASE_URL_MODELO)
    const listaModelos = response.data.data;
    const listaModelosTratada = listaModelos.map(modelo => {
        return {
            id: modelo.id,
            nome: modelo.attributes.nome
        }
    })
    return listaModelosTratada;
}

async function inserirModelo(modelo) {
    const data = {
        data: modelo
    }
    const response = await axios.post(BASE_URL_MODELO, data);
    return response.data
}

export default {
    listarModelos,
    inserirModelo
}
