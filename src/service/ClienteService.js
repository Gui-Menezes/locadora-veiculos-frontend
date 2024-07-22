import axios from "axios";

const BASE_URL_CLIENTE = 'https://optimistic-fish-1880d60db2.strapiapp.com/api/clientes';

async function listarClientes() {
    const response = await axios.get(BASE_URL_CLIENTE);
    const listaClientes = response.data.data;
    const listaClientesTratada = listaClientes.map((cliente) => {
        return {
            id: cliente.id,
            nome: cliente.attributes.nome,
            cpf: cliente.attributes.cpf
        }
    })
    return listaClientesTratada;
}

async function inserirCliente(cliente) {
    const data = {
        data: cliente
    }
    const response = await axios.post(BASE_URL_CLIENTE, data);
    return response.data;
}

async function verificarUsuario(nome, cpf) {
    const response = await axios.get(BASE_URL_CLIENTE, {
        params: {
            filters: {
                nome,
                cpf
            }
        }
    });
    return response.data.data;
}

async function buscarUsuarioPorId(id) {
    const response = await axios.get(`${BASE_URL_CLIENTE}/${id}`);
    return response.data;
}

async function editarPerfil(id, perfilAtualizado) {
    const data = {
        data: {
            perfilAtualizado
        }
    }
    const response = await axios.put(`${BASE_URL_CLIENTE}/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }}
    );
    return response.data;
}


export default {
    listarClientes,
    inserirCliente,
    verificarUsuario,
    buscarUsuarioPorId,
    editarPerfil
}
