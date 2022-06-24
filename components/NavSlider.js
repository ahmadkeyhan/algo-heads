import styles from '../styles/NavSlider.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import * as CgIcons from 'react-icons/cg'
import { motion, motionValue, useViewportScroll } from "framer-motion"
import { darkColorPalette, lightColorPalette } from './colorPalette'

export default function NavSlider({colorCode}) {

  const [width, setWidth] = useState(360)
  const [height, setHeight] = useState(640)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  const router = useRouter()
  const routes = ['/','/headlist','/sholders','/roadmap']

  function NavDot({route}) {
    return(
      <div
        onClick={() => router.push(route)}
        className={styles.navLink}>
        <div style={{backgroundColor: darkColorPalette[colorCode]}} className={styles.navSlide}/>
      </div>
    )
  }

  return(
    <div>
        <div
          style={{borderColor: darkColorPalette[colorCode]}}
          className={styles.navSlider}>
          <motion.div style={{color: darkColorPalette[colorCode]}} className={styles.routeIcon}>
            {routes.indexOf(router.route.slice(0,9)) == 0 ? <MdIcons.MdHome />:
            routes.indexOf(router.route.slice(0,9)) == 1 ? <MdIcons.MdFace />:
            routes.indexOf(router.route.slice(0,9)) == 2 ? <CgIcons.CgTrophy />:
            <RiIcons.RiRouteFill />}
          </motion.div>
          <motion.div 
            style={{color: darkColorPalette[colorCode],borderColor: darkColorPalette[colorCode],backgroundColor: lightColorPalette[colorCode]}}
            animate={{top: `${routes.indexOf(router.route.slice(0,9))*1.5-0.1875}rem`}}
            transition={{duration: 0.2}}
            className={styles.routeCatcher} />
          <NavDot route={routes[0]} />
          <NavDot route={routes[1]} />
          <NavDot route={routes[2]} />
          <NavDot route={routes[3]} />
        </div>
    </div>
  )
}
