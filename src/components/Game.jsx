import { useState, useRef } from 'react'
import styles from './Game.module.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)
        setLetter('')
        // Focar novamente no input após o envio
        letterInputRef.current.focus()
    }

    return (
        <div className={styles.game}>
            <p className={styles.points}>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className={styles.tip}>Dica sobre a palavra: <span>{pickedCategory}</span></h3>
            <p className={styles.info}>Você ainda tem {guesses} tentativa(s)!</p>
            <div className={styles.wordContainer}>
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className={styles.letter}>{letter}</span>
                    ) : (
                        <span key={i} className={styles.blankSquare}></span>
                    )
                ))}
            </div>
            <div className={styles.letterContainer}>
                <p>Tente adivinhar a palavra!</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name='letter' 
                        maxLength='1'
                        required 
                        value={letter} 
                        onChange={(e) => setLetter(e.target.value)}
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className={styles.wrongLettersContainer}>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game