import React, { useState } from "react";

function Character({ characterName, planetName }) {
  // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const [showPlanet, setShowPlanet] = useState(false);
  function togglePlanet() {
    setShowPlanet(!showPlanet);
  }

  return (
    <div className="character-card" onClick={togglePlanet}>
      {/* Use the same markup with the same attributes as in the mock */}
      <h3 className="character-name">{characterName}</h3>
      {showPlanet ? <p>
        Planet: <span className="character-planet">{planetName}</span>
      </p> : !showPlanet}
    </div>
  );
}

export default Character;

/*
 * i haven't even touched this yet, so i would love to maybe have a rough guide on where to start
 * my first though --> i feel like i need to build to html component here on line 9 and then initialize <Character /> and pass all the props there to make it the same as the mock app
 */
