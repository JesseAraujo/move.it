import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengeProvider } from '../contexts/ChallengeContext';

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesComplete: number,
}

export default function Home(props: HomeProps) {
  return (

    <ChallengeProvider

      level={props.level}
      currentExperience={props.currentExperience}
      challengesComplete={props.challengesComplete}
    >
      <div className={styles.container}>

        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>

      </div>
    </ChallengeProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesComplete } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesComplete: Number(challengesComplete),
    }
  }
}
