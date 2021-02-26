import { createContext, ReactNode, useEffect, useState } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesComplete: number;
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void;
    startNewChallenge: () => void
    resetChallenge: () => void
    completChallend: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengesContextData)


export function ChallengeProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrenteExperience] = useState(0)
    const [challengesComplete, setChallengesComplete] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(() => {
        Notification.requestPermission()
    }, [])



    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completChallend() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrenteExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesComplete(challengesComplete + 1)
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesComplete,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completChallend
            }}
        >
            {children}
        </ChallengeContext.Provider>
    )
}