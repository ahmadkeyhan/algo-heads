import styles from '../styles/landing.module.css'
import NavSlider from './NavSlider'
import { useState } from 'react'

const Layout = ({ children }) => {
    

    return (
        <div>     
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout
