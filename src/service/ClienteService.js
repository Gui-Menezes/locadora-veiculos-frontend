import axios from "axios";

const BASE_URL_CLIENTE = 'http://localhost:1337/api/clientes';

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


export default {
    listarClientes,
    inserirCliente,
    verificarUsuario
}