import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"

const Landing = dynamic(() => import("../components/Landing"), {ssr: false})

export default function Home() {
  return (
    <div className={styles.container}>
      <Landing />
    </div>
  )
}
