import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completChallend } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceed() {
        completChallend()
        resetCountdown()
    }

    function handleChallegeFailed() {
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                        <strong> Novo desafio </strong>
                        <p> {activeChallenge.description} </p>
                    </main>

                    <footer>

                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallegeFailed}
                        >
                            Falhei
                        </button>

                        <button
                            type="button"
                            className={styles.challengeSucceedButton}
                            onClick={handleChallengeSucceed}
                        >
                            Completei
                        </button>
                    </footer>
                </div>

            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>
                            Finalize um ciclo para receber um desafio
                        </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level completando desafios
                        </p>
                    </div>
                )}

        </div>
    )
}