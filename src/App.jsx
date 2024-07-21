import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCardVeiculos from './components/ListCardVeiculos'
import FormVeiculo from './components/FormVeiculo'
import { Outlet } from "react-router-dom";
import Menu from './components/Menu'


function App() {

  return (
    <>
        <Menu></Menu>
        <Outlet></Outlet>
    </>
  )
}

export default App
