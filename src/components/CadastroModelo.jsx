import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import veiculoService from "../service/VeiculoService";



export default function cadastroModelo() {

    const [nome, setNome] = useState("");
    const [marcaId, setMarcaId] = useState();
    const [listaModelos, setListaModelos] = useState([]);
    const [listaMarcas, setListaMarcas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        veiculoService.listarModelos()
            .then((modelos) => setListaModelos(modelos))
    }, [])

    useEffect(()=> {
        veiculoService.listarMarcas()
            .then((marcas) => setListaMarcas(marcas))
    }, [])

    const cadastraModelo = (evento) => {
        evento.preventDefault();
        veiculoService.inserirModelo({
            nome: nome,
            marca: {
                id: marcaId
            }
        })
            .then((modelo) => {
                console.log("MODELO: ", modelo);
                navigate('/cadastro');
            })
    }

    return (
        <form onSubmit={cadastraModelo}>
            <h1>Cadastrar Modelo</h1>
            <p>Se o modelo estiver cadastrado, selecione-o e clique em PRÓXIMO:</p>
            <label htmlFor="modelo" onChange={(evento) => setModeloId(evento.target.value)}>Modelo:</label>
            <select id="modelo" name="select">
                <option value="">Selecione...</option>
                {listaModelos.map((modelo) => 
                    <option key={modelo.id} value={modelo.id}>{modelo.nome}</option>
                )}
            </select>
            <br />
            <Link to='/cadastro'>PRÓXIMO</Link>
            <br />
            <p>Se o modelo não estiver cadastrado, cadastre abaixo:</p>
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" value={nome} onChange={(evento) => setNome(evento.target.value)} />
            <br />
            <label htmlFor="marca" onChange={(evento) => setMarcaId(evento.target.value)}>Marca:</label>
            <select id="marca" name="select">
                <option value="">Selecione...</option>
                {listaMarcas.map((marca) => 
                    <option key={marca.id} value={marca.id}>{marca.nome}</option>
                )}
            </select>
            <br />
            <input type="submit" value="SALVAR"/>
        </form>

    )
}