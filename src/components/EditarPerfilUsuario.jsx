import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteService from "../service/ClienteService";

export default function editarPerfilUsuario() {

    const id_cliente = sessionStorage.getItem("id_cliente")
    // const { id } = useParams();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        clienteService.buscarUsuarioPorId(id_cliente)
            .then((usuario) => {
                setNome(usuario.data.attributes.nome)
                setCpf(usuario.data.attributes.cpf)
            })
    }, [id_cliente])

    const editarPerfil = (evento, id_cliente) => {
        evento.preventoDefault();

        const perfilAtualizado = {
            data: {
                attributes: {
                    nome: nome,
                    cpf: cpf

                }
            }
        }

        clienteService.editarPerfil(id_cliente, perfilAtualizado)
            .then((usuario) => {
                navigate(`/edit/${id_cliente}`)
            })
    }

    const voltar = () => {
        navigate(-1);
    }


    return (
        <form onSubmit= {editarPerfil}>
            <h1>Perfil:</h1>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={nome} 
                onChange={(ev) => setNome(ev.target.value)} />
            <br />
            <label htmlFor="cpf">CPF:</label>
            <input type="number" id="cpf" name="cpf" value={cpf} 
                onChange={(ev) => setCpf(ev.target.value)} />
            <br />
            <input type="button" value="Voltar" onClick={voltar} />
            <input type="submit" value="Salvar"/>
        </form>
    )
}