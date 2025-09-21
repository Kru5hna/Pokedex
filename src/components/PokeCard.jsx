import React, { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";

export default function PokeCard(props) {
  const { selectedPokemon } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

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

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>
      <img
        className="default-img"
        src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'}
        alt={`${name}-large-img`}
     />
    </div>
  );
}
