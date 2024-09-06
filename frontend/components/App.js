import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";

const urlPlanets = "http://localhost:9009/api/planets";
const urlPeople = "http://localhost:9009/api/people";

function App() {
  // Create state to hold the data from the API
  const [characters, setCharacters] = useState([]); // State to hold people data
  const [planets, setPlanets] = useState([]); // State to hold planets data
  const [formattedData, setFormattedData] = useState([]);
  // Create an effect to fetch data from the API

  // function peopleAndPlanets() {
  //   const result = people.map(person => {
  //     const foundPlanet = planets.find(planet => planet.id === person.homeworld)
  //     return {...person}
  //   })

  function formatData(characters, planets) {
    return characters.map((character) => {
      return {
        ...character,
        homeworld: planets.find((planet) => planet.id === character.homeworld),
      };
    });
  }

  useEffect(() => {
    const planetsData = axios.get(urlPlanets);
    const peopleData = axios.get(urlPeople);
    Promise.all([planetsData, peopleData])
      .then((res) => {
        setCharacters(res[1].data);
        setPlanets(res[0].data);
        return res;
      })
      .then((res) => {
        setFormattedData(formatData(res[1].data, res[0].data));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>
        See the README of the project for instructions on completing this
        challenge
      </p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {formattedData.map( character => {
        return <Character 
          key={character.id} 
          characterName={character.name} 
          planetName={character.homeworld.name}
        />
      })}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports) module.exports = App;
