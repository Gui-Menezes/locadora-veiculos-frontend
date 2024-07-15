import { useEffect, useState } from "react";
import veiculoService from "../service/VeiculoService";
import VeiculoCard from "./VeiculoCard";


export default function ListCardVeiculos() { 
    
    const [listaVeiculos, setListaVeiculos] = useState([]);

    useEffect(() => {
        veiculoService.listaVeiculos()
            .then((veiculos) => setListaVeiculos(veiculos))
    }, [])

    return (
        listaVeiculos.map(veiculo => 
            <VeiculoCard key={veiculo.id} veiculo={veiculo} />
        )
    )
}