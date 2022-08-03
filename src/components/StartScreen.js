import React from 'react'
import './StartScreen.css'

const StartScreen = ({startGame}) => {


  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão pra começar a jogar</p>
        <button onClick={startGame}> Começar o jogo</button>
    </div>
  )
}

export default StartScreen