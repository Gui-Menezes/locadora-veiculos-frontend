import { useEffect, useState } from "react";
import locacaoService from "../service/LocacaoService";
import { useNavigate } from "react-router-dom";

export default function minhasLocacoes() {
    const id_cliente = sessionStorage.getItem('id_cliente');
    const nome_cliente = sessionStorage.getItem('nome_cliente');

    const [listaLocacoes, setListaLocacoes] = useState([]);

    const [dataAluguel, setDataAluguel] = useState();
    const navigate = useNavigate();

    const carregarLocacoes = () => {
        locacaoService.listarLocacoesPeloIdCliente(id_cliente)
            .then((locacoes) => {
                setListaLocacoes(locacoes);
            });
    };

    useEffect(() => {
        carregarLocacoes();
    }, [id_cliente]);

    const handleClickDevolver = (id_locacao) => {
        editarDevolucao(null, id_locacao);
    }

    const handleClickExcluir = (id_locacao) => {
        excluirLocacao(null, id_locacao);
    }

    const editarDevolucao = (evento, id_locacao) => {
        if(evento) evento.preventDefault();
        const data = new Date()
        const dataFormatada = data.toISOString().slice(0, 10);
        locacaoService.devolverVeiculo(id_locacao, dataFormatada)
            .then((locacao) => {
                carregarLocacoes();
            })
    }

    const excluirLocacao = (evento, id_locacao) => {
        if(evento) evento.preventDefault();
        confirm("Deseja excluir essa locação?");
        locacaoService.excluirLocacao(id_locacao)
            .then((locacao) => {
                carregarLocacoes();
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
                <input type="date" name="data_aluguel" value={locacao.attributes.data_aluguel} onChange={(evento) => setDataAluguel(evento.target.value)} disabled />
                {/* <h5>{locacao.attributes.data_aluguel}</h5> */}
                <h4><strong>Data Devolução: </strong></h4>
                <input type="date" name="data_devolucao" value={locacao.attributes.data_devolucao} onChange={(evento) => setDataDevolucao(evento.target.value)} disabled />
                <h3 className="w3-black">{locacao.attributes.veiculo.data.attributes.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3>
                {locacao.attributes.data_devolucao ? (
                    <button onClick={() => handleClickExcluir(locacao.id)}>EXCLUIR</button>
                ) : (
                    <button onClick={() => handleClickDevolver(locacao.id)}>DEVOLVER</button>    
                )}
            </div>
        </div>
        </div>
        ))
    )
}
