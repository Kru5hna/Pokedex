import { useState } from "react";
import "./index.css";
import "./fanta.css";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import PokeCard from "./components/PokeCard";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(true); // some weird reason in the process i have reversed the logic 

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu);
  }
  function handleCloseMenu() {
    setShowSideMenu(true);
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <Sidenav
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        handleCloseMenu={handleCloseMenu}
        showSideMenu={showSideMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
