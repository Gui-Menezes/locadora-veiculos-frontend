import axios from 'axios';

const BASE_URL_POPULATE = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/veiculos?populate[0]=modelo.marca&populate[1]=modelo';
// const BASE_URL_POPULATE = 'http://localhost:1337/api/veiculos?populate[0]=modelo.marca&populate[1]=modelo';
const BASE_URL_VEICULO = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/veiculos/';
// const BASE_URL_VEICULO = 'http://localhost:1337/api/veiculos/';

async function listaVeiculos() {
    const response = await axios.get(BASE_URL_POPULATE);
    const listaVeiculos = response.data.data;
    const listaVeiculosTratada = listaVeiculos.map(veiculo => {
        return {
            id: veiculo.id,
            ano_fabricacao: veiculo.attributes.ano_fabricacao,
            chassi: veiculo.attributes.chassi,
            modelo: veiculo.attributes.modelo?.data?.attributes?.nome || "",
            marca: veiculo.attributes.modelo?.data?.attributes?.marca?.data?.attributes?.nome || "",
            preco: veiculo.attributes.preco
        }
    })
    return listaVeiculosTratada;
}

async function inserirVeiculo(veiculo) {
    const data = {
        data: veiculo
    }
    const response = await axios.post(BASE_URL_VEICULO, data);
    return response.data;
}

export default {
    listaVeiculos,
    inserirVeiculo,
}
