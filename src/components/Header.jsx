import React from 'react'

export default function Header (props) {

  const {handleToggleMenu} = props;
  return (
    <header>
      <button onClick={handleToggleMenu} className='open-nav-button'>
      <i className="fa-solid fa-bars"></i>
    </button>
    <h1 className='text-gradient'>Pokédex</h1>
    </header>
  )
}
// if you are invoking a function like getting the return value from it then 
// do it like this onClick = {() => {handleToggleMenu()}}

// passing as a reference -> onClick = {handleToggleMenu}