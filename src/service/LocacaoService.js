import axios from "axios";

const BASE_URL_LOCACAO = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/locacaos?populate[0]=veiculo.modelo';
// const BASE_URL_LOCACAO = 'http://localhost:1337/api/locacaos?populate[0]=veiculo.modelo';
const BASE_URL_LOCACAO_ID = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/locacaos';
// const BASE_URL_LOCACAO_ID = 'http://localhost:1337/api/locacaos';

async function listarLocacoes() {
    const response = await axios.get(BASE_URL_LOCACAO);
    const listaLocacoes = response.data.data;
    const listaLocacoesTratada = listaLocacoes.map((locacao) => {
        return {
            id_locacao: locacao.id,
            data_aluguel: locacao.attributes.data_aluguel,
            data_devolucao: locacao.attributes.data_devolucao,
            ano_fabricacao: locacao.attributes.veiculo.data.attributes.ano_fabricacao,
            chassi: locacao.attributes.veiculo.data.attributes.chassi,
            preco: locacao.attributes.veiculo.data.attributes.preco,
            nome_modelo: locacao.attributes.veiculo.data.attributes.modelo.data.attributes.nome
        }
    })
    return listaLocacoesTratada;
}

async function listarLocacoesPeloIdCliente(id_usuario) {
    const response = await axios.get(BASE_URL_LOCACAO, {
        params: {
            filters: {
                cliente: {
                    id: {
                        $eq: id_usuario
                    }
                }
            }
        }
    })
    return response.data.data
}

async function devolverVeiculo(id_locacao, data_devolucao) {
    const data = {
        data: {
            data_devolucao
        }
    }
    const response = await axios.put(`${BASE_URL_LOCACAO_ID}/${id_locacao}`, data, {
    headers: {
        'Content-Type': 'application/json'
    }}
);
    return response.data;
}

async function inserirLocacao(locacao) {
    const data = {
        data: locacao
    }
    const response = await axios.post(BASE_URL_LOCACAO_ID, data);
    return response.data
}

async function excluirLocacao(id) {
    const response = await axios.delete(`${BASE_URL_LOCACAO_ID}/${id}`)
    return response
}

export default {
    listarLocacoes,
    listarLocacoesPeloIdCliente,
    devolverVeiculo,
    inserirLocacao,
    excluirLocacao
}
