import styles from '../styles/landing.module.css'
import dynamic from "next/dynamic"

const Landing = dynamic(() => import("../components/Landing"), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <Landing />
    </div>
  )
}
