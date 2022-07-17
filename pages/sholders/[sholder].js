import styles from '../../styles/sholder.module.css'
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