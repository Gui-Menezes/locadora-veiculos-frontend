import { Route, Routes } from "react-router-dom";
import App from "./App";
import FormVeiculo from "./components/FormVeiculo";
import ListCardVeiculos from "./components/ListCardVeiculos";
import CadastroMarca from "./components/CadastroMarca";
import CadastroModelo from "./components/CadastroModelo";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<ListCardVeiculos />} />
                <Route path="/cadastro-marca" element={<CadastroMarca />} />
                <Route path="/cadastro-modelo" element={<CadastroModelo />} />
                <Route path="/cadastro" element={<FormVeiculo />} />
            </Route>
        </Routes>
    )
}