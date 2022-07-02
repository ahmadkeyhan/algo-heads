import styles from '../styles/layout.module.css'
import NavSlider from './NavSlider'
import { useState } from 'react'

const Layout = ({ children }) => {
    

    return (
        <div> 
            <NavSlider />    
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout
