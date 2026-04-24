// CSS
import './App.css'

// React
import { useState, useCallback, useEffect } from 'react'

// Data
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

// Estagios do jogo
const stages = [
  { id: 0, name: 'start' },
  { id: 1, name: 'game' },
  { id: 2, name: 'end' }
]

function App() {
  const guessesQty = 3

  const [gameStage, setGameStage] = useState(stages[0].name)            // Estado para controlar o estágio do jogo
  const [words] = useState(wordsList)                                   // Estado para armazenar a lista de palavras
  
  const [pickedWord, setPickedWord] = useState('')                      // Estado para armazenar a palavra escolhida
  const [pickedCategory, setPickedCategory] = useState('')              // Estado para armazenar a categoria escolhida
  const [letters, setLetters] = useState([])                            // Estado para armazenar as letras da palavra escolhida
  
  const [guessedLetters, setGuessedLetters] = useState([])              // Estado para armazenar as letras adivinhadas corretamente
  const [wrongLetters, setWrongLetters] = useState([])                  // Estado para armazenar as letras adivinhadas incorretamente
  const [guesses, setGuesses] = useState(guessesQty)                             // Estado para armazenar o número de tentativas restantes
  const [score, setScore] = useState(0) 

  // Escolhendo uma palavra e categoria aleatória
  const pickWordAndCategory = useCallback(() => {
    // Escolhendo uma categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log('Categoria escolhida:', category)

    // Escolhendo uma palavra aleatória da categoria escolhida
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log('Palavra escolhida:', word)

    return { word, category }
  }, [words])
  
  // Função para iniciar o jogo
  const startGame = useCallback(() => {
    // Limpar os estados
    clearStates()

    // Escolhendo uma palavra e categoria aleatória
    const { word, category } = pickWordAndCategory()

    // Criando um array de letras da palavra escolhida
    let wordLetters = word.split('')
    wordLetters = wordLetters.map(l => l.toLowerCase())
    console.log('Letras da palavra:', wordLetters)

    // Definindo os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    console.log('Jogo iniciado')
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // Função para verificar a letra
  const verifyLetter = (letter) => {
    console.log('Verificando letra: ', letter)
    const normalizedLetter = letter.toLowerCase()

    // Verificar se a letra já foi adivinhada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    // Verificar se a letra está na palavra
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((guessedLetters) => [...guessedLetters, normalizedLetter])
    } else {
      setWrongLetters((wrongLetters) =>[...wrongLetters, normalizedLetter])
      setGuesses((guesses) => guesses - 1)
    }

  }

  // Função para limpar os estados do jogo
  const clearStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Monitora o estado de guesses para verificar se o jogo acabou
  useEffect(() => {
    if (guesses <= 0) {
      clearStates()
      // Mudar para a tela de game over
      setGameStage(stages[2].name)
    }
  }, [guesses])
  
  // Monitora o estado de guessedLetters para verificar se o jogador venceu
  useEffect(() => {
    // Criar um array de letras únicas da palavra escolhida
    const uniqueLetters = [...new Set(letters)]

    // Verificar se o número de letras adivinhadas é igual ao número de letras únicas
    if (guessedLetters.length === uniqueLetters.length) {
      // Adicionar pontos
      setScore((score) => score += 100)

      // Reiniciar o jogo com uma nova palavra
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  // Função para reiniciar o jogo
  const restartGame = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  const renderStage = () => {
    switch (gameStage) {
      case 'start':
        return <StartScreen startGame={startGame} />
      case 'game':
        return <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters} 
          guessedLetters={guessedLetters} 
          wrongLetters={wrongLetters} 
          guesses={guesses} 
          score={score}
        />
      case 'end':
        return <GameOver  restartGame={restartGame} score={score}/>
      default:
        return null
    }
  }

  return (
    <>
      <div className="App">
        {renderStage()}
      </div>
    </>
  )
}

export default App
