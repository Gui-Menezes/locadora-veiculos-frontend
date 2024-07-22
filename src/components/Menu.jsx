import { spread } from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
    const id_cliente = sessionStorage.getItem('id_cliente');
    const nome_cliente = sessionStorage.getItem('nome_cliente');
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('id_cliente');
        sessionStorage.removeItem('nome_cliente');
        navigate('/')
    }

    const locacoes = () => {
        navigate('/minhas-locacoes')
    }

    const editarCadastro = () => {
        navigate(`/edit/${id_cliente}`)
    }
    
    return (
        <div className="w3-bar w3-black">
            <Link to='/' className="w3-bar-item w3-button">Home</Link>
            {nome_cliente==="admin" ? (
                <>
                    <Link to='/cadastro-marca' className="w3-bar-item w3-button">Cadastrar Veículo</Link>
                    <button onClick={locacoes} className="w3-bar-item w3-button">Minhas Locações</button>
                    <button className="w3-bar-item w3-button">Bem-vindo! {nome_cliente}</button>
                    <button onClick={handleLogout} className="w3-bar-item w3-button">Logout</button>
                </>
            ) : (
                id_cliente ? (
                    <>
                        <button onClick={locacoes} className="w3-bar-item w3-button">Minhas Locações</button>
                        <button onClick={editarCadastro} className="w3-bar-item w3-button">Bem-vindo! {nome_cliente}</button>
                        <button onClick={handleLogout} className="w3-bar-item w3-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to='/cadastro-cliente' className="w3-bar-item w3-button">Cadastre-se</Link>
                        <Link to='/login' className="w3-bar-item w3-button">LOGIN</Link>
                    </>
                )                
            )}
      </div>
    )
}