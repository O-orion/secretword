import React from 'react'
import './GameOver.css'

const GameOver = ({ tryAgain, score }) => {
  return (
    <div>
      <h1>Fim do Jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={tryAgain}>Tente de novo e de novo</button>
    </div>
  )
}

export default GameOver