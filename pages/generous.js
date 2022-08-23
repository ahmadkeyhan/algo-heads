import styles from '../styles/landing.module.css'
import dynamic from "next/dynamic"

const Generous = dynamic(() => import("../components/Generous"), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <Generous />
    </div>
  )
}
