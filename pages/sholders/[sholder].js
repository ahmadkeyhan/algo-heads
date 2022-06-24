import styles from '../../styles/sholders.module.css'
import dynamic from "next/dynamic"

const Sholder = dynamic(() => import("../../components/Sholder"), {ssr: false})

function sholder() {
  return (
    <div className={styles.container}>
        <Sholder />
    </div>
  )
}

export default sholder