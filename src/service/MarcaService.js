import axios from 'axios';

const BASE_URL_MARCA = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/marcas/';
// const BASE_URL_MARCA = 'http://localhost:1337/api/marcas/';


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

async function inserirMarca(marca) {
    const data = {
        data: marca
    }
    const response = await axios.post(BASE_URL_MARCA, data);
    return response.data
}


export default {
    inserirMarca,
    listarMarcas
}
