import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

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
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesComplete: number,
}

export const ChallengeContext = createContext({} as ChallengesContextData)


export function ChallengeProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level)
    const [currentExperience, setCurrenteExperience] = useState(rest.currentExperience)
    const [challengesComplete, setChallengesComplete] = useState(rest.challengesComplete)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesComplete', String(challengesComplete))
    }, [level, currentExperience, challengesComplete])



    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
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

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
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
                completChallend,
                closeLevelUpModal
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}