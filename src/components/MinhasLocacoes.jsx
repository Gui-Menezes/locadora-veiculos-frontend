import { useEffect, useState } from "react";
import locacaoService from "../service/LocacaoService";

export default function minhasLocacoes() {
    const id_cliente = sessionStorage.getItem('id_cliente');
    const nome_cliente = sessionStorage.getItem('nome_cliente');

    const [listaLocacoes, setListaLocacoes] = useState([]);

    const [dataAluguel, setDataAluguel] = useState();
    const [dataDevolucao, setDataDevolucao] = useState();

    useEffect(() => {
        locacaoService.listarLocacoesPeloIdCliente(id_cliente)
            .then((locacoes) => {
                setListaLocacoes(locacoes)
            }
        )
    }, []);

    const editarLocacao = (evento) => {
        evento.preventDefault();
        const data = new Date()
        
        const dataFormatada = data.toISOString().slice(0, 10);
        listaLocacoes.map((locacao) => {
            locacaoService.devolverVeiculo(locacao.id, dataFormatada);
            window.location.reload();
        })
    }

    return (
        listaLocacoes.length <= 0 ? (
            <h1>Não há veículos locados!</h1>
        ) :
        listaLocacoes.map((locacao) => (
        <div key={locacao.id} className="w3-col l4 m6 s12 w3-container w3-padding-16">
        <div className="w3-card">
            <div className="w3-container w3-center">
                <img src="cobalt.jpg" style={{width: "100%"}}/>
                <h1>{locacao.attributes.veiculo.data.attributes.modelo.data.attributes.nome}</h1>
                <h4><strong>Data Aluguel: </strong></h4>
                <h5>{locacao.attributes.data_aluguel}</h5>
                <h4><strong>Data Devolução: </strong></h4>
                <h5>{locacao.attributes.data_devolucao || "__/__/__"}</h5>
                <h3 className="w3-black">{locacao.attributes.veiculo.data.attributes.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3>
                <button onClick={editarLocacao}>DEVOLVER</button>
            </div>
        </div>
        </div>
        ))
    )
}