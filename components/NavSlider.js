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
        <motion.div className={styles.navSlider}
          style={{
            backgroundColor: darkColorPalette[3],
            marginLeft: `${offset}vw`}}
          animate={routes.indexOf(router.route.slice(0,9)) !== 2 ? 
            {bottom: normalizedwidth === 100 ? '10vw' : '5.625vh'} :
            router.route === routes[2] ?
            {bottom: normalizedwidth === 100 ? '64vw' : '36vh'} :
            {bottom: normalizedwidth === 100 ? '112vw' : '63vh',
            left: normalizedwidth === 100 ? '16vw' : '9vh',
            rotate: '90deg'}}
          transition={{type: 'spring', mass: 0.5}}>
          <motion.div className={styles.routeIcon}
            style={{color: darkColorPalette[colorCodes[routes.indexOf(router.route.slice(0,9))]]}}>
            {routes.indexOf(router.route.slice(0,9)) == 0 ? <MdIcons.MdHome />:
            routes.indexOf(router.route.slice(0,9)) == 1 ? <MdIcons.MdFace />:
            routes.indexOf(router.route.slice(0,9)) == 2 && router.route == routes[2] ? <CgIcons.CgTrophy />:
            routes.indexOf(router.route.slice(0,9)) == 2 ? null :
            <RiIcons.RiRouteFill />}
          </motion.div>
          <div className={styles.navLinks}>
            <NavDot routeIndex={0} />
            <NavDot routeIndex={1} />
            <NavDot routeIndex={2} />
            <NavDot routeIndex={3} />
          </div>
          <div className={styles.navBearing}
            onClick={() => router.reload()}>
            <svg width="18" height="90" viewBox="0 0 18 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle cx='9' cy="9" r="7" 
                animate={{y: routes.indexOf(router.route.slice(0,9))*23 + 2 ,
                  fill: lightColorPalette[colorCodes[routes.indexOf(router.route.slice(0,9))]]}}
                transition={{duration: 0.2}} />
              <motion.circle cx='9' cy="9" r="5" fill={darkColorPalette[3]}
                animate={{y: routes.indexOf(router.route.slice(0,9))*23 + 2}}
                transition={{duration: 0.1}} />
            </svg>
          </div>
        </motion.div>
    </div>
  )
}
