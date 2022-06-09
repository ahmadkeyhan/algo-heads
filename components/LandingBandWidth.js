import {useState, useEffect} from 'react'
import styles from '../styles/roadmap.module.css'
import Landing from './Landing'
import Roadmap from './Roadmap'
import Headlist from './Headlist'

function LandingBandWidth() {
    const [width, setWidth] = useState()
    useEffect(() => {
        setWidth(window.innerWidth)
    },[])

    if (width < 900) {
        return (
            <div className={styles.container}>
                <Landing />
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <Landing />
                <Roadmap />
                <Headlist />
            </div>
        )
    }
}

export default LandingBandWidth