import styles from '../../styles/head.module.css'
import dynamic from "next/dynamic"

const Head = dynamic(() => import("../../components/Head"), {ssr: false})

function head() {
  return (
    <div className={styles.container}>
        <Head />
    </div>
  )
}

export default head