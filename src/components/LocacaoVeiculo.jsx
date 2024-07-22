import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import marcaService from "../service/MarcaService";
import modeloService from "../service/ModeloService";
import locacaoService from "../service/LocacaoService";


export default function locacaoVeiculo() {

    const id_cliente = sessionStorage.getItem("id_cliente");
    const { id } = useParams();
    const [dataAluguel, setDataAluguel] = useState();
    const [dataDevolucao, setDataDevolucao] = useState();
    const navigate = useNavigate();


    const cadastrarLocacao = (evento) => {
        evento.preventDefault();
        locacaoService.inserirLocacao({
            data_aluguel: dataAluguel,
            data_devolucao: dataDevolucao,
            cliente: {
                id: id_cliente
            },
            veiculo: {
                id: id
            }
        })
        setTimeout(() => {
            navigate('/minhas-locacoes');
        }, 1000);
    }

    return (
        <form onSubmit={cadastrarLocacao}>
            <br />
            <h1>Escolha a data que deseja alugar seu veículo: </h1>
            <label htmlFor="data_aluguel">Data Aluguel:</label>
            <input type="date" name="data_aluguel" id="data_aluguel" value={dataAluguel} onChange={(evento) => setDataAluguel(evento.target.value)} />
            <br />
            <br />
            <input type="submit" value="SALVAR" />
        </form>
    )
}