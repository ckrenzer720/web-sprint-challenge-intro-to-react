import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";

const urlPlanets = "http://localhost:9009/api/planets";
const urlPeople = "http://localhost:9009/api/people";

function App() {
  // Create state to hold the data from the API
  const [peopleData, setPeopleData] = useState([]); // State to hold people data
  const [planetsData, setPlanetsData] = useState([]); // State to hold planets data
  const [combinedData, setCombinedData] = useState([]); // State to hold combined data

  // Create an effect to fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from both endpoints concurrently
        const [peopleResponse, planetsResponse] = await Promise.all([
          fetch(urlPeople),
          fetch(urlPlanets),
        ]);

        // Ensure both responses are successful
        if (!peopleResponse.ok || !planetsResponse.ok) {
          throw new Error("Failed to fetch one or more endpoints");
        }

        // Convert responses to JSON
        const people = await peopleResponse.json();
        const planets = await planetsResponse.json();

        // Update the state with the fetched data
        setPeopleData(people);
        setPlanetsData(planets);

        // Combine people with their corresponding homeworlds
        const combined = combinePeopleWithHomeworlds(people, planets);
        setCombinedData(combined);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Function to match people with their correct homeworlds using ID
  function combinePeopleWithHomeworlds(people, planets) {
    // Create a map of planets by their ID for quick lookup
    const planetMap = planets.reduce((map, planet) => {
      map[planet.id] = planet;
      return map;
    }, {});

    // Map over people and assign the correct homeworld using the homeworld ID
    return people.map((person) => {
      // person.homeworld is the ID that needs to match with planet.id
      const homeworld = planetMap[person.homeworld] || null; // Find planet by ID
      return {
        ...person,
        homeworld,
      };
    });
  }

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>
        See the README of the project for instructions on completing this
        challenge
      </p>
      {
        /* ❗ Map over the data in state, rendering a Character at each iteration */
        <div>
          <Character />
        </div>
      }
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports) module.exports = App;
