import axios from 'axios';

const BASE_URL_POPULATE = 'http://localhost:1337/api/veiculos?populate[0]=modelo.marca&populate[1]=modelo';
const BASE_URL_VEICULO = 'http://localhost:1337/api/veiculos/';
const BASE_URL_MARCA = 'http://localhost:1337/api/marcas/';
const BASE_URL_MODELO = 'http://localhost:1337/api/modelos/';

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

async function listarMarcas() {
    const response = await axios.get(BASE_URL_MARCA)
    const listaMarcas = response.data.data;
    const listaMarcasTratada = listaMarcas.map(marca => {
        return {
            id: marca.id,
            nome: marca.attributes.nome
        }
    })
    return listaMarcasTratada;
}

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

async function inserirVeiculo(veiculo) {
    const data = {
        data: veiculo
    }
    const response = await axios.post(BASE_URL_VEICULO, data);
    return response.data;
}

async function inserirModelo(modelo) {
    const data = {
        data: modelo
    }
    const response = await axios.post(BASE_URL_MODELO, data);
    return response.data
}

async function inserirMarca(marca) {
    const data = {
        data: marca
    }
    const response = await axios.post(BASE_URL_MARCA, data);
    return response.data
}


export default {
    listaVeiculos,
    inserirVeiculo,
    inserirMarca,
    inserirModelo,
    listarMarcas,
    listarModelos
}