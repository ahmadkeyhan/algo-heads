import styles from '../../styles/sholders.module.css'
import dynamic from "next/dynamic"

const Sholders = dynamic(() => import("../../components/Sholders"), {ssr: false})

function sholders() {
  return (
    <div className={styles.container}>
        <Sholders />
    </div>
  )
}

export default sholders