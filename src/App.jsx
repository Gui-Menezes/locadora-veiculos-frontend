import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCardVeiculos from './components/ListCardVeiculos'
import FormVeiculo from './components/FormVeiculo'
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


function App() {

  return (
    <>
      <div className="w3-bar w3-black">
        <Link to='/' className="w3-bar-item w3-button">Home</Link>
        <Link to='/cadastro-marca' className="w3-bar-item w3-button">Cadastrar Veículo</Link>
        <Link to='/cadastro-cliente' className="w3-bar-item w3-button">Cadastrar Cliente</Link>
        <a href="#" className="w3-bar-item w3-button">Link 3</a>
      </div>
        <Outlet></Outlet>
    </>
  )
}

export default App
