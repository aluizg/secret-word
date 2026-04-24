import styles from './GameOver.module.css'

function GameOver({ restartGame, score }) {
    return (
        <div className={styles.gameOver}>
            <h1>Fim de jogo!</h1>
            <h2>A sua pontuação foi: <span>{score}</span></h2>
            <p>Obrigado por jogar!</p>
            <button onClick={restartGame}>Reiniciar o jogo</button>
        </div>
    )
}

export default GameOver