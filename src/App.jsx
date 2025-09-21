import { useState } from 'react'
import './index.css'
import './fanta.css'
import { Header } from './components/Header'
import { Sidenav } from './components/Sidenav'
import { PokeCard } from './components/PokeCard'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return(
    <>
    <Header />
    <Sidenav selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
    <PokeCard selectedPokemon={selectedPokemon} />

    </>
  )
}
 
export default App
