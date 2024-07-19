import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import veiculoService from "../service/VeiculoService";
import marcaService from "../service/MarcaService";

export default function cadastroMarca() {

    const [nome, setNome] = useState("");
    const [listaMarcas, setListaMarcas] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        marcaService.listarMarcas()
            .then((marcas) => setListaMarcas(marcas))
    }, [])

    const cadastraMarca = (evento) => {
        evento.preventDefault();
        marcaService.inserirMarca({
            nome: nome
        })
            .then((marca) => {
                console.log("MARCA: ", marca);
                navigate('/cadastro-modelo');
            })
    }

    return (
        <form onSubmit={cadastraMarca}>
            <h1>Cadastrar Marca</h1>
            <p>Se a marca estiver cadastrada, selecione-a e clique em PRÓXIMO:</p>
            <label htmlFor="marca">Marca:</label>
            <select id="marca" name="select">
                <option value="">Selecione...</option>
                {listaMarcas.map((marca) => 
                    <option key={marca.id} value={marca.id}>{marca.nome}</option>
                )}
            </select>
            <br />
            <Link to='/cadastro-modelo'>PRÓXIMO</Link>
            <br />
            <p>Se a marca não estiver cadastrada, cadastre abaixo:</p>
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" id="nome" value={nome} onChange={(evento) => setNome(evento.target.value)} />
            <br />
            <br />
            <input type="submit" value="SALVAR"/>
        </form>
    )
}