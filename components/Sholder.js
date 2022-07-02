import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/sholder.module.css'
import wideStyles from '../styles/sholderWide.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'
import { motion, useAnimation } from "framer-motion"
import NavSlider from './NavSlider'
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, linkArrowPalette, scrollArrowPalette } from './Assets'
import Link from 'next/link'

function Sholder() {
  const router = useRouter()
  const { sholder } = router.query

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const [sholderRank, setSholderRank] = useState(-1)
  const [sholders, setSholders] = useState()
  const [isLoading, setLoading] = useState()

  const [sholderRanking, setSholderRanking] = useState([])
  const [colorCode, setColorCode] = useState(3)

  useEffect(() => {
    setLoading(true)
    fetch('/api/sholders')
      .then((res) => res.json())
      .then((data) => {
        data.message.sort((a,b) => b.heads.length - a.heads.length)
        setSholders(data.message)
        setSholderRanking(data.message)
        data.message.map((sh, index) => {
          if (sholder == sh.address) {
            setSholderRank(index)
            setColorCode(sh.heads[0].bgColorCode)
          }
        })
        setLoading(false)
      })
  },[])

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)

  const control1 = useAnimation()
  const control2 = useAnimation()
  const control3 = useAnimation()
  const control4 = useAnimation()
  const control5 = useAnimation()
  const control6 = useAnimation()
  const control7 = useAnimation()
  const control8 = useAnimation()

  const topIndex = ['3vw', '27vw', '60vw', '84vw', '84vw', '60vw', '27vw', '3vw']
  const leftIndex = ['27vw', '4vw', '4vw', '27vw', '60vw', '84vw', '84vw', '60vw']
  
  const [controlIndex, setControlIndex] = useState()
   
  useEffect(() => {
    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)

    if (window.visualViewport.height/window.visualViewport.width >= 16/9) {
      setNormalizedWidth(100)
  
      setControlIndex([
        {        
          left: ['27vw', '27vw', '4vw', '4vw',
            '4vw', '4vw', '27vw', '27vw',
            '60vw', '60vw', '84vw', '84vw',
            '84vw', '84vw', '60vw','60vw', '27vw'],
          top: ['3vw','3vw', '27vw','27vw',
            '60vw', '60vw', '84vw','84vw',
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '3vw','3vw', '3vw']
        },
        {        
          left: ['4vw', '4vw','4vw', '4vw',
            '27vw', '27vw','60vw', '60vw',
            '84vw', '84vw','84vw', '84vw',
            '60vw','60vw', '27vw', '27vw', '4vw'],
          top: ['27vw','27vw','60vw', '60vw',
            '84vw','84vw','84vw', '84vw',
            '60vw','60vw','27vw', '27vw',
            '3vw','3vw','3vw','3vw',  '27vw']
        },
        {        
          left: ['4vw', '4vw', '27vw', '27vw',
            '60vw', '60vw', '84vw', '84vw',
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '4vw', '4vw','4vw'],
          top: ['60vw', '60vw', '84vw','84vw',
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '3vw','3vw',
            '3vw','3vw', '27vw','27vw','60vw']
        },
        {        
          left: ['27vw', '27vw',
            '60vw', '60vw', '84vw', '84vw',
            '84vw', '84vw', '60vw','60vw','27vw', '27vw', '4vw', '4vw',
            '4vw', '4vw', '27vw'],
          top: ['84vw','84vw',
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '3vw','3vw','3vw','3vw', '27vw','27vw',
            '60vw', '60vw', '84vw']
        },
        {        
          left: [
            '60vw', '60vw', '84vw', '84vw',
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '4vw', '4vw',
            '4vw', '4vw', '27vw', '27vw','60vw'],
          top: [
            '84vw', '84vw', '60vw','60vw',
            '27vw', '27vw', '3vw','3vw','3vw','3vw', '27vw','27vw',
            '60vw', '60vw', '84vw','84vw', '84vw']
        },
        {        
          left: ['84vw', '84vw',
            '84vw', '84vw', '60vw','60vw','27vw', '27vw', '4vw', '4vw',
            '4vw', '4vw', '27vw', '27vw',
            '60vw', '60vw', '84vw'],
          top: ['60vw','60vw',
            '27vw', '27vw', '3vw','3vw','3vw','3vw', '27vw','27vw',
            '60vw', '60vw', '84vw','84vw',
            '84vw', '84vw', '3vw']
        },
        {        
          left: [
            '84vw', '84vw', '60vw','60vw','27vw', '27vw', '4vw', '4vw',
            '4vw', '4vw', '27vw', '27vw',
            '60vw', '60vw', '84vw', '84vw','84vw'],
          top: [
            '27vw', '27vw', '3vw','3vw','3vw','3vw', '27vw','27vw',
            '60vw', '60vw', '84vw','84vw',
            '84vw', '84vw', '60vw','60vw', '27vw']
        },
        {        
          left: ['60vw','60vw','27vw', '27vw', '4vw', '4vw',
          '4vw', '4vw', '27vw', '27vw',
          '60vw', '60vw', '84vw', '84vw',
          '84vw', '84vw', '60vw'],
          top: ['3vw','3vw','3vw','3vw', '27vw','27vw',
          '60vw', '60vw', '84vw','84vw',
          '84vw', '84vw', '60vw','60vw',
          '27vw', '27vw', '3vw']
        }])

    } else {
      setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
      setStyles(wideStyles)
      setControlIndex([
        {        
          left: ['15.19vh', '15.19vh', '2.25vh', '2.25vh',
            '2.25vh', '2.25vh', '15.19vh', '15.19vh',
            '33.75vh', '33.75vh', '47.25vh', '47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh', '15.19vh'],
          top: ['1.69vh','1.69vh', '15.19vh','15.19vh',
            '33.75vh', '33.75vh', '47.25vh','47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '1.69vh','1.69vh', '1.69vh']
        },
        {        
          left: ['2.25vh', '2.25vh','2.25vh', '2.25vh',
            '15.19vh', '15.19vh','33.75vh', '33.75vh',
            '47.25vh', '47.25vh','47.25vh', '47.25vh',
            '33.75vh','33.75vh', '15.19vh', '15.19vh', '2.25vh'],
          top: ['15.19vh','15.19vh','33.75vh', '33.75vh',
            '47.25vh','47.25vh','47.25vh', '47.25vh',
            '33.75vh','33.75vh','15.19vh', '15.19vh',
            '1.69vh','1.69vh','1.69vh','1.69vh',  '15.19vh']
        },
        {        
          left: ['2.25vh', '2.25vh', '15.19vh', '15.19vh',
            '33.75vh', '33.75vh', '47.25vh', '47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '2.25vh', '2.25vh','2.25vh'],
          top: ['33.75vh', '33.75vh', '47.25vh','47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '1.69vh','1.69vh',
            '1.69vh','1.69vh', '15.19vh','15.19vh','33.75vh']
        },
        {        
          left: ['15.19vh', '15.19vh',
            '33.75vh', '33.75vh', '47.25vh', '47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh','15.19vh', '15.19vh', '2.25vh', '2.25vh',
            '2.25vh', '2.25vh', '15.19vh'],
          top: ['47.25vh','47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '1.69vh','1.69vh','1.69vh','1.69vh', '15.19vh','15.19vh',
            '33.75vh', '33.75vh', '47.25vh']
        },
        {        
          left: [
            '33.75vh', '33.75vh', '47.25vh', '47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '2.25vh', '2.25vh',
            '2.25vh', '2.25vh', '15.19vh', '15.19vh','33.75vh'],
          top: [
            '47.25vh', '47.25vh', '33.75vh','33.75vh',
            '15.19vh', '15.19vh', '1.69vh','1.69vh','1.69vh','1.69vh', '15.19vh','15.19vh',
            '33.75vh', '33.75vh', '47.25vh','47.25vh', '47.25vh']
        },
        {        
          left: ['47.25vh', '47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh','15.19vh', '15.19vh', '2.25vh', '2.25vh',
            '2.25vh', '2.25vh', '15.19vh', '15.19vh',
            '33.75vh', '33.75vh', '47.25vh'],
          top: ['33.75vh','33.75vh',
            '15.19vh', '15.19vh', '1.69vh','1.69vh','1.69vh','1.69vh', '15.19vh','15.19vh',
            '33.75vh', '33.75vh', '47.25vh','47.25vh',
            '47.25vh', '47.25vh', '1.69vh']
        },
        {        
          left: [
            '47.25vh', '47.25vh', '33.75vh','33.75vh','15.19vh', '15.19vh', '2.25vh', '2.25vh',
            '2.25vh', '2.25vh', '15.19vh', '15.19vh',
            '33.75vh', '33.75vh', '47.25vh', '47.25vh','47.25vh'],
          top: [
            '15.19vh', '15.19vh', '1.69vh','1.69vh','1.69vh','1.69vh', '15.19vh','15.19vh',
            '33.75vh', '33.75vh', '47.25vh','47.25vh',
            '47.25vh', '47.25vh', '33.75vh','33.75vh', '15.19vh']
        },
        {        
          left: ['33.75vh','33.75vh','15.19vh', '15.19vh', '2.25vh', '2.25vh',
          '2.25vh', '2.25vh', '15.19vh', '15.19vh',
          '33.75vh', '33.75vh', '47.25vh', '47.25vh',
          '47.25vh', '47.25vh', '33.75vh'],
          top: ['1.69vh','1.69vh','1.69vh','1.69vh', '15.19vh','15.19vh',
          '33.75vh', '33.75vh', '47.25vh','47.25vh',
          '47.25vh', '47.25vh', '33.75vh','33.75vh',
          '15.19vh', '15.19vh', '1.69vh']
        }])

      control1.start({
        left: ['15.19vh', '15.19vh', '15.19vh', '15.19vh',
              '33.75vh', '33.75vh', '33.75vh', '33.75vh',
              '15.19vh', '15.19vh', '2.25vh', '2.25vh',
              '2.25vh', '2.25vh', '2.25vh','2.25vh', '15.19vh'],
        top: ['47.25vh','47.25vh', '47.25vh','47.25vh',
              '47.25vh', '47.25vh', '1.69vh','1.69vh',
              '1.69vh', '1.69vh', '15.19vh','15.19vh',
              '33.75vh', '33.75vh', '33.75vh','33.75vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375, 0.5,
            0.5625, 0.625,0.6875, 0.75,
            0.8125, 0.875,0.9375, 1]}
      })
      control2.start({
        left: ['2.25vh','2.25vh', '2.25vh', '2.25vh',
          '15.19vh','15.19vh', '15.19vh', '15.19vh',
          '33.75vh', '33.75vh', '33.75vh', '33.75vh',
          '15.19vh','15.19vh', '2.25vh', '2.25vh', '2.25vh'],
        top: ['33.75vh', '33.75vh','33.75vh', '33.75vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh',
          '47.25vh', '47.25vh', '1.69vh', '1.69vh',
          '1.69vh', '1.69vh', '15.19vh', '15.19vh', '33.75vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control3.start({
        left: ['15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh','2.25vh', '2.25vh', '2.25vh',
        '15.19vh','15.19vh', '15.19vh', '15.19vh',
        '33.75vh', '33.75vh', '33.75vh', '33.75vh', '15.19vh'],
        top: ['1.69vh','1.69vh', '15.19vh','15.19vh',
        '33.75vh', '33.75vh','33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '1.69vh', '1.69vh', '1.69vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control4.start({
        left: ['33.75vh','33.75vh', '33.75vh', '33.75vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh','2.25vh', '2.25vh', '2.25vh',
        '15.19vh','15.19vh', '15.19vh', '15.19vh', '33.75vh'],
        top: ['47.25vh','47.25vh', '1.69vh', '1.69vh',
        '1.69vh','1.69vh', '15.19vh','15.19vh',
        '33.75vh', '33.75vh','33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control5.start({
        left: ['15.19vh','15.19vh', '2.25vh', '2.25vh',
          '2.25vh', '2.25vh', '47.25vh', '47.25vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh',
          '33.75vh','33.75vh', '15.19vh', '15.19vh', '15.19vh'],
        top: ['47.25vh','47.25vh', '15.19vh', '15.19vh',
          '15.19vh', '15.19vh', '15.19vh', '15.19vh',
          '15.19vh', '15.19vh', '33.75vh', '33.75vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control6.start({
        left: ['33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh', '2.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh','33.75vh'],
        top: ['47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '33.75vh', '33.75vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control7.start({
        left: ['47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh', '2.25vh', '47.25vh', '47.25vh', '47.25vh'],
        top: ['15.19vh', '15.19vh', '33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '15.19vh', '15.19vh', '15.19vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control8.start({
        left: ['2.25vh', '2.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh', '2.25vh'],
        top: ['15.19vh', '15.19vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh', '15.19vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
    } 
  },[])

  

  function HeadHolder({head, control}) {
    if(head) {
      if(sholderRanking[sholderRank].heads.length > 4) {
        return (
          <motion.div>
            <motion.div className={styles.headHolder}
              animate={control}
              transition={{ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
                times: [0, 0.0625, 0.125, 0.1875,
                  0.25,0.3125, 0.375,0.4375, 0.5,
                  0.5625, 0.625,0.6875, 0.75,
                  0.8125, 0.875,0.9375, 1]}}>
              <Image className={styles.head} src={head.src} layout='fill' />
            </motion.div>
            <motion.div className={styles.headCard}
              style={{
                color:activeTheme === 'light' ?
                darkColorPalette[colorCode]: null}}
              animate={control}
              transition={{ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
                times: [0, 0.0625, 0.125, 0.1875,
                  0.25,0.3125, 0.375,0.4375, 0.5,
                  0.5625, 0.625,0.6875, 0.75,
                  0.8125, 0.875,0.9375, 1]}}>
              <p>{head.src.slice(1,12)}</p>
            </motion.div>
          </motion.div>
        )
      } else {
        return (
          <motion.div>
            <motion.div className={styles.headHolder}
              style={{top: control.top[0], left: control.left[0]}}>
              <Image className={styles.head} src={head.src} layout='fill' />
            </motion.div>
            <motion.div className={styles.headCard}
              style={{
                color:activeTheme === 'light' ? darkColorPalette[colorCode]: null,
                top: control.top[0],
                left: control.left[0]}}>
              <p>{head.src.slice(1,12)}</p>
            </motion.div>
          </motion.div>
        )
      }
    } else {
      if(sholderRanking[sholderRank].heads.length > 4) {
        return (
          <motion.div className={styles.placeHolder}
            animate={control}
            transition={{ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
              times: [0, 0.0625, 0.125, 0.1875,
                0.25,0.3125, 0.375,0.4375, 0.5,
                0.5625, 0.625,0.6875, 0.75,
                0.8125, 0.875,0.9375, 1]}}>
            <Image className={styles.head} src={activeTheme==='light' ? '/HappyPride!.png' : '/darkSphere.png'} layout='fill' />
          </motion.div>
        )
      } else {
        return (
          <motion.div className={styles.placeHolder}
            style={{top: control.top[0], left: control.left[0]}}>
            <Image className={styles.head} src={activeTheme==='light' ? '/HappyPride!.png' : '/darkSphere.png'} layout='fill' />
          </motion.div>
        )
      }
    } 
  }

  
  function SholderHolder({top, left, rank}) {
    return (
        <motion.div className={styles.sholderCard}
            style={{color: activeTheme==='light' ? darkColorPalette[sholderRanking[rank].heads[0].bgColorCode] : null,
            backgroundColor: lightColorPalette[sholderRanking[rank].heads[0].bgColorCode],
            top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.sholderHolder}>
                <Image src={sholderRanking[rank].heads[0].src} layout='fill' />
            </motion.div>
            <motion.div className={styles.sholderCol}>
                <p>Sholder:</p>
                <h1>{sholderRanking[rank].address.slice(0,8)+'...'}</h1>
            </motion.div>
            <motion.div className={styles.sholderCol}>
                <p>carrying:</p>
                <h1>{sholderRanking[rank].heads.length} <span>{sholderRanking[rank].heads.length>1 ? 'heads' : 'head'}</span></h1>
            </motion.div>
            <motion.div className={styles.rank}
                style={{borderColor: lightColorPalette[sholderRanking[rank].heads[0].bgColorCode],
                color: activeTheme==='light'? darkColorPalette[sholderRanking[rank].heads[0].bgColorCode] : lightColorPalette[sholderRanking[rank].heads[0].bgColorCode]}}>
                <p>{rank + 1}</p>
            </motion.div>
        </motion.div>
      )
  }

  if(sholders) {
    if(sholderRank !== -1) {
      return (
        <div className={styles.landing}
          style={{height: `${normalizedwidth*16/9}vw`,
          width: `${normalizedwidth}vw`}}>
          <motion.div className={styles.navSliderFrame}>
            <NavSlider colorCode={colorCode} />
          </motion.div>
          <div className={styles.wheelHolder}>
            <div className={styles.wheelOne}>
              <motion.div className={styles.quoteArrowHolder}>
                <Image className={styles.quoteArrows} src={activeTheme === 'light' ? linkArrowPalette[colorCode] : linkArrowPalette[7]} layout='fill' />
                <motion.div className={styles.quote}>
                <p style={{color: lightColorPalette[colorCode]}}>{sholderRanking[sholderRank].heads.length > 4 ? 'Spin sholder!' :
                  `Carry ${5 - sholderRanking[sholderRank].heads.length} more ${sholderRanking[sholderRank].heads.length == 4 ? 'head': 'heads'} to see them spin!`}</p>
    
                </motion.div>
              </motion.div>
              <SholderHolder top={44} left={0} rank={sholderRank} />
            </div>
            <div className={styles.wheelTwo}>
              <motion.div className={styles.arrowHolder}>
                <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
              </motion.div>
              {sholderRanking[sholderRank].heads.map((head, index) => {
                return (
                  <HeadHolder control={controlIndex[index]} head={head} key={index} />
                )
              })}
              {controlIndex.map((control, index) => {
                return (
                  <HeadHolder head={null} control={control} key={index} />
                )
              })}
              
            </div>
            <div className={styles.wheelThree}>
            <motion.div onClick={() => router.push('/sholders')} className={styles.announceArrowHolder}>
                <Image className={styles.announceArrows} src={activeTheme === 'light' ? linkArrowPalette[colorCode] : linkArrowPalette[7]} layout='fill' />
                <motion.div className={styles.announce}>
                <p>AHS (Algo Head Spin)</p>
                <h2>coming soon...</h2>
                </motion.div>
              </motion.div>
                <motion.div className={styles.headSpinHolder}>
                  <Image className={styles.headSpin} src='/headSpinDemo.gif' layout='fill' />
                </motion.div>
            </div>
          </div>
        </div>
        )
    } else {
      router.push('/sholders')
    }
    
  } else {
    return (
      <div className={styles.landing}
        style={{height: `${normalizedwidth*16/9}vw`,
        width: `${normalizedwidth}vw`}}>
        <motion.div className={styles.navSliderFrame}>
          <NavSlider colorCode={colorCode} />
        </motion.div>
        <div className={styles.wheelHolder}>
          <div className={styles.wheelOne}>
            <motion.div className={styles.quoteArrowHolder}>
              <Image className={styles.quoteArrows} src={activeTheme === 'light' ? linkArrowPalette[colorCode] : linkArrowPalette[7]} layout='fill' />
            </motion.div>
          </div>
          <div className={styles.wheelTwo}>
            <motion.div className={styles.arrowHolder}>
              <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
            </motion.div>
          </div>
          <div className={styles.wheelThree}>
              <motion.div className={styles.headSpinHolder}>
                <Image className={styles.headSpin} src='/headSpinDemo.gif' layout='fill' />
              </motion.div>
          </div>
        </div>
      </div>
      )
  }

}

export default Sholder