import { useState } from "react";
import clienteService from "../service/ClienteService";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async(evento) => {
        evento.preventDefault();
        const verificacaoUsuario = await clienteService.verificarUsuario(nome, cpf);
        if(verificacaoUsuario) {
            sessionStorage.setItem("id_cliente", verificacaoUsuario[0].id);
            sessionStorage.setItem("nome_cliente", verificacaoUsuario[0].attributes.nome);
            navigate('/')
        } else {
            setError('Nome ou CPF inválido!')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>LOGIN</h1>
            <label htmlFor="nome">Nome:</label>
            <input
                type="text"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
            />
            <br />
            <label htmlFor="cpf">CPF:</label>
            <input
                type="number"
                id="cpf"
                placeholder="CPF"
                value={cpf}
                onChange={(evento) => setCpf(evento.target.value)}
            />
            <br />
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
      </form>
    )
}