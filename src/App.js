import './App.css';
import StartScreen from './components/StartScreen';

import { useCallback, useEffect, useState } from 'react'
import  { wordsList } from './data/word'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stage = [
  {id:1, name: 'start'},
  {id:2, name: 'game'},
  {id:3, name: 'end'},
]

function App() {
  const [ gameStage, setGameStage] = useState(stage[0].name)
  const  [ words] = useState(wordsList) 

  const [ pickedword, setPickedWord ] = useState('')
  const [ pickedCategory, setPickedCategory ] = useState('')
  const [ letters, setLetters ] = useState([])
  const [ quessedLetters, setGuessedLetters ] = useState([])
  const [ wrongLetters, setWrongLetters ] = useState([])
  const [ guesses, setGuesses ] = useState(3)
  const [ score, setScore ] = useState(0)
  

  const pickWordPickCategory = useCallback(() => {
    const categories = Object.keys(words)

    // Pegando uma categoria do conjunto de palavras
    const category = categories[ Math.floor( Math.random() *  Object.keys(categories).length ) ]
    
    //Pegando uma palavra dentro da categoria
    const word = words[category][Math.floor( Math.random() * words[category].length )]

    return { category , word }

  }, [words])

  const startGame = useCallback(() => {
    clearLetterStates()
    //pick word and pick category
     const { category, word } = pickWordPickCategory();
     console.log(word)

     let wordLetters = word.split('')

     wordLetters = wordLetters.map((l) => l.toLowerCase())

     setPickedWord(word)
     setPickedCategory(category)
     setLetters(wordLetters)


    setGameStage(stage[1].name)

  }, [pickWordPickCategory])

  const gameOver = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    console.log(letter)

    if(quessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
        return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualWronLetters) => [
        ...actualWronLetters,
        normalizedLetter
      ])

      setGuesses((actualguess) => actualguess - 1)
    }

    console.log(quessedLetters)
    console.log(wrongLetters)
   // setGameStage(stage[2].name)
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // useEffect pode monitora algum dado
  useEffect( () => {
    
    if(guesses <= 0){
      // reset all stage
      clearLetterStates();
       setGameStage(stage[2].name)
    }

  }, [guesses]) //nos parênteses indicamos qual dado queremos monitora

  // Check win condition 
  useEffect( () => {
    // set permite apenas items únicos no array
    const uniqueLetters = [ ...new Set(letters)]

    // win condition
    if(quessedLetters.length === uniqueLetters.length){
      setScore((sco) =>  sco += 100)

      // restart game with new word
      startGame()
    }

  }, [quessedLetters, letters, startGame]) // dado monitorado

  const tryAgain = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stage[0].name)
  }

  return (
    <div className="App">
        { gameStage === 'start' && <StartScreen startGame={startGame} /> }
        { gameStage === 'game' && <Game 
                                    gameOver={gameOver} 
                                    pickedWord={pickedword} 
                                    pickedCategory={pickedCategory} 
                                    letters={letters} 
                                    quessedLetters={quessedLetters}
                                    wrongLetters={wrongLetters}
                                    guesses={guesses}
                                    score={score}
                                    
                                    />
         }
        { gameStage === 'end' && <GameOver tryAgain={tryAgain} score={score} /> }
    </div>
  );
}

export default App;
