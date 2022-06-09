import styles from '../styles/headlist.module.css'
import dynamic from "next/dynamic"

const Headlist = dynamic(() => import("../components/Headlist"), {ssr: false})


function headlist() {

  return (
    <div className={styles.container}>
      <Headlist />
    </div>
  )
}

export default headlist