import styles from '../styles/roadmap.module.css'
import dynamic from "next/dynamic"
const Roadmap = dynamic(() => import("../components/Roadmap"), {ssr: false})

function roadmap({}) {

    return(
        <div className={styles.container}>
            <Roadmap />
        </div>
    )

    }

export default roadmap