import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"

const LandingBandWidth = dynamic(() => import("../components/LandingBandWidth"), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <LandingBandWidth />
    </div>
  )
}
