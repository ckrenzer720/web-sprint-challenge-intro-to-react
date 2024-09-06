import React from 'react'

function Character(props) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const {person, homeworld} = props
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  return (
    <div>
      {/* Use the same markup with the same attributes as in the mock */}
    </div>
  )
}

export default Character
