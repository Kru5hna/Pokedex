  import React, { useEffect, useState } from "react";
import { getPokedexNumber } from "../utils";

  export const PokeCard = (props) => {
    const { selectedPokemon } = props;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
      // if loading , exit logic
      if (loading || !localStorage) return;
      let cache = {};

      if (localStorage.getItem("pokedex")) {
        cache = JSON.parse(localStorage.getItem("pokedex"));
      }

      if (selectedPokemon in cache) {
        //read from cache
        setData(cache[selectedPokemon]);
        console.log("Found pokemon in cache");
        return;
      }

      // if not present in the cache then fetch the data
      async function fetchPokemon() {
        setLoading(true);
        try {
          const baseURL = "https://pokeapi.co/api/v2/";
          const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
          const finalURL = baseURL + suffix;

          const res = await fetch(finalURL);
          const pokemonData = await res.json();

          setData(pokemonData);
          console.log("->", pokemonData);

          cache[selectedPokemon] = pokemonData;
          localStorage.setItem("pokedex", JSON.stringify(cache));
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchPokemon();
    }, [selectedPokemon]);
    return <div></div>;
  };
