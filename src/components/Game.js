import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({ 
  gameOver, 
  pickedWord, 
  pickedCategory, 
  letters, 
  quessedLetters, 
  wrongLetters, 
  guesses, 
  score }) => {

    const [letter, setLetter] = useState("");
    //o hook useRef armazena uma referência para algum elemento dom, utilizamod o parâmetro ref no elemento que queremos
    // a referência.
    const letterInputRef = useRef(null)

    const handleSubmit =(e) => {
      e.preventDefault();

      gameOver(letter)
      setLetter("")

      letterInputRef.current.focus();
    }


  return (
    <div className='game'>
      <p className='points'>  
        <span>Pontuação: {score}</span>
      </p>

      <h1>Advinhe a palavra</h1>
      <h3 className='tip'>
          Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem: {guesses} tentativas </p>
      <div className="wordContainer">
        {
          letters.map((letter, i) => (
             quessedLetters.includes(letter) ? (
               <span key={i} className='letter'>{letter}</span>

             ) : (
               <span key={i} className="blankSquare"></span>

             )
          ))
        }
      </div>
      
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra: </p>
        <form  onSubmit={handleSubmit}>
          <input ref={letterInputRef} type="text" name='letter' maxLength="1" required value={ letter } onChange={ (e) => setLetter(e.target.value)}/>
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas: </p>
        {
          wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))
        }
      </div>

       { /* <!-- <button onClick={ gameOver }>Desistir</button  */}

    </div>
  )
}

export default Game