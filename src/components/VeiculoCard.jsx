import { Link, useNavigate } from "react-router-dom";


export default function VeiculoCard({veiculo}) {
    const navigate = useNavigate();

    const id_cliente = sessionStorage.getItem("id_cliente");

    const locarVeiculo = () => {
        navigate(`/locacao-veiculo/${veiculo.id}`);
    }

    const login = () => {
        navigate(`/login`);
    }
    
    return (
        <div className="w3-col l4 m6 s12 w3-container w3-padding-16">
            <div className="w3-card">
                <div className="w3-container w3-center">
                    <img src="cobalt.jpg" style={{width: "100%"}}/>
                    {/* <img src={veiculo.imagem} style={{width: "100%"}}/> */}
                    <h1>{veiculo.modelo}</h1>
                    <h5>{veiculo.marca}</h5>
                    <h5>{veiculo.ano_fabricacao}</h5>
                    <h3 className="w3-black">{veiculo.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3>
                    {id_cliente ? (
                        <button onClick={locarVeiculo}>LOCAR</button>
                    ) : (
                        <button onClick={login}>LOCAR</button>
                    )}
                </div>
            </div>
        </div>

    )
}