import { useEffect, useState } from "react";
import clienteService from "../service/ClienteService";
import { useNavigate } from "react-router-dom";


export default function cadastroCliente() {

    const [listaClientes, setListaClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        clienteService.listarClientes()
            .then((clientes) => setListaClientes(clientes))
    }, []);

    const cadastraCliente = (evento) => {
        evento.preventDefault();
        clienteService.inserirCliente({
            nome: nome,
            cpf: cpf
        })
            .then((cliente) => {
                console.log("cliente: ", cliente);
                navigate('/');
            })
        setNome("")
        setCpf("")
    }

    return (
        <form onSubmit={cadastraCliente}>
            <h1>Cadastre-se</h1>
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" value={nome} onChange={(evento) => setNome(evento.target.value)} required/>
            <br />
            <br />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" name="cpf" id="cpf" value={cpf} onChange={(evento) => setCpf(evento.target.value)} required/>
            <br />
            <input type="submit" value="SALVAR"/>
        </form>

    )
}