import narrowStyles from '../styles/NavSlider.module.css'
import wideStyles from '../styles/NavSliderWide.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import * as CgIcons from 'react-icons/cg'
import { motion, motionValue, useViewportScroll } from "framer-motion"
import { darkColorPalette, lightColorPalette } from './colorPalette'

export default function NavSlider({colorCode}) {

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)
  const [offset, setOffset] = useState()

  useEffect(() => {
    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)
    if (window.visualViewport.height/window.visualViewport.width >= 16/9) {
      setNormalizedWidth(100)
      setOffset(0)
    } else {
      setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
      setOffset((100 - normalizedwidth)/2)
      setStyles(wideStyles)
    }
  })

  const router = useRouter()
  const routes = ['/','/headlist','/sholders','/roadmap']
  const colorCodes = [2,3,0,4]

  function NavDot({routeIndex}) {
    return(
      <div
        onClick={() => router.push(routes[routeIndex])}
        className={styles.navLink}>
        <div
          style={{backgroundColor: lightColorPalette[colorCodes[routeIndex]]}}
          className={styles.navSlide} />
      </div>
    )
  }

  return(
    <div>
        <div
          style={{marginLeft: `${offset}vw`,
            borderColor: darkColorPalette[3],
            backgroundColor: darkColorPalette[3]}}
          className={styles.navSlider}>
          <motion.div style={{color: darkColorPalette[colorCodes[routes.indexOf(router.route.slice(0,9))]]}} className={styles.routeIcon}>
            {routes.indexOf(router.route.slice(0,9)) == 0 ? <MdIcons.MdHome />:
            routes.indexOf(router.route.slice(0,9)) == 1 ? <MdIcons.MdFace />:
            routes.indexOf(router.route.slice(0,9)) == 2 ? <CgIcons.CgTrophy />:
            <RiIcons.RiRouteFill />}
          </motion.div>
          <motion.div 
            style={{color: darkColorPalette[colorCodes[routes.indexOf(router.route.slice(0,9))]],borderColor: darkColorPalette[3],backgroundColor: lightColorPalette[colorCodes[routes.indexOf(router.route.slice(0,9))]]}}
            animate={{top: `${routes.indexOf(router.route.slice(0,9))*1.5 - 0.0125}rem`}}
            transition={{duration: 0.2}}
            className={styles.routeCatcher} />
          <NavDot routeIndex={0} />
          <NavDot routeIndex={1} />
          <NavDot routeIndex={2} />
          <NavDot routeIndex={3} />
        </div>
    </div>
  )
}
