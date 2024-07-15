import { useEffect, useState } from "react";
import veiculoService from "../service/VeiculoService";


export default function FormVeiculo() {

    const [anoFabricacao, setAnoFabricacao] = useState(0);
    const [chassi, setChassi] = useState(0);
    const [preco, setPreco] = useState(0);
    const [nomeModelo, setNomeModelo] = useState("")
    const [nomeMarca, setNomeMarca] = useState("");
    const [listaModelos, setListaModelos] = useState([]);
    const [listaMarcas, setListaMarcas] = useState([]);
    const [modeloId, setModeloId] = useState('');

    useEffect(()=> {
        veiculoService.listarMarcas()
            .then((marcas) => setListaMarcas(marcas))
    }, [])

    useEffect(()=> {
        veiculoService.listarModelos()
            .then((modelos) => setListaModelos(modelos))
    }, [])

    const cadastrarVeiculo = (evento) => {
        evento.preventDefault();
        veiculoService.inserirVeiculo({
            ano_fabricacao: anoFabricacao,
            chassi: chassi,
            preco: preco,
            modelo: {
                id: modeloId
            }
        })
            .then((veiculo) => {
                console.log("VEICULO: ", veiculo);
            })
        // veiculoService.inserirModelo({
        //     nome: nomeModelo
        // })
        // .then((modelo) => {
        //     console.log("MODELO: ", modelo);
        // })
        // veiculoService.inserirMarca({
        //     nome: nomeMarca
        // })
        //     .then((marca) => {
        //         console.log("MARCA: ", marca);
        //     })
        setAnoFabricacao(0);
        setChassi(0);
        setPreco(0);
        // setNomeModelo("");
        // setNomeMarca("");
    }

    return (
        <form onSubmit={cadastrarVeiculo}>
        <br />
        <label htmlFor="ano_fabricacao">Ano de Fabricação:</label>
        <input type="number" name="ano_fabricacao" id="ano_fabricacao" value={anoFabricacao} onChange={(evento) => setAnoFabricacao(evento.target.value)}/>
        <br />
        <label htmlFor="chassi">Chassi:</label>
        <input type="number" name="chassi" id="chassi" value={chassi} onChange={(evento) => setChassi(evento.target.value)}/>
        <br />
        <label htmlFor="preco">Preço:</label>
        <input type="number" name="preco" id="preco" value={preco} onChange={(evento) => setPreco(evento.target.value)}/>
        <br />
        <label htmlFor="marca" onChange={(evento) => setMarcaId(evento.target.value)}>Marca:</label>
        <select id="marca" name="select">
            <option value="">Selecione...</option>
            {listaMarcas.map((marca) => 
                <option key={marca.id} value={marca.id}>{marca.nome}</option>
            )}
        </select>
        <br />
        <label htmlFor="modelo">Modelo:</label>
        <select id="modelo" name="select" onChange={(evento) => setModeloId(evento.target.value)}>
            <option value="">Selecione...</option>
            {listaModelos.map((modelo) => 
                <option key={modelo.id} value={modelo.id}>{modelo.nome}</option>
            )}
        </select>
        <br />
        <input type="submit" value="SALVAR" />

    </form>

    )
}