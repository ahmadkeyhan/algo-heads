import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/landing.module.css'
import wideStyles from '../styles/landingWide.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import { motion, useAnimation } from "framer-motion"
import NavSlider from './NavSlider'
import { useRouter } from 'next/router'
import { maleHeads } from './MaleHeads'
import { femaleHeads } from './FemaleHeads'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, buyBannerPalette, linkArrowPalette, scrollArrowPalette } from './Assets'
import Link from 'next/link'
import MyAlgoConnect from '@randlabs/myalgo-connect'

 function Landing() {

    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false })
    const settings = {
      shouldSelectOneAccount: true,
      openManager: true
    }

    const [account, setAccount] = useState()

    const connectWallet = async () => {
      try {
        let fetchedAccount = await myAlgoConnect.connect(settings).then(fetchedAccount => {
          setAccount(fetchedAccount)
        })
      } catch (error) {
        console.log(error)
      }
    }


    var end = new Date('Fri Jun 17 2022 19:30:00')
    const router = useRouter()
  
    const control1 = useAnimation()
    const control2 = useAnimation()
    const control3 = useAnimation()
    const control4 = useAnimation()
    const control5 = useAnimation()
    const control6 = useAnimation()
    const control7 = useAnimation()
    const control8 = useAnimation()
    const control9 = useAnimation()
    const control10 = useAnimation()

    const [soldOut, setSoldOut] = useState(true)

    const [shuffleDays, setShuffleDays] = useState()
    const [shuffleHours, setShuffleHours] = useState()
    const [shuffleMinutes, setShuffleMinutes] = useState()
  
    const [colorCode, setColorCode] = useState(2)
    
    const [colorSliderOpen, setColorSliderOpen] = useState(false)
    const [tout, setTout] = useState(null)

    const [arrows, setArrows] = useState(arrowPalette[0])
    const [buyBanner, setBuyBanner] = useState(buyBannerPalette[6])
    const [linkArrows, setLinkArrows] = useState(linkArrowPalette[6])
    const [scrollArrows, setScrollArrows] = useState(scrollArrowPalette[0])
  
    const [male, setMale] = useState(true)
    const [heads, setHeads] = useState(maleHeads)
  
    const [width, setWidth] = useState(360)
    const [height, setHeight] = useState(640)
    const [normalizedwidth, setNormalizedWidth] = useState(100)
    const [styles, setStyles] = useState(narrowStyles)
   
    useEffect(() => {
      setShuffleDays(0)
      setShuffleHours(0)
      setShuffleMinutes(0)
  
      setInterval(() => {
        var now = new Date()
        var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
        if (nowUTC >= end) {
          setSoldOut(false)
        } else {
          setShuffleDays(Math.floor((end- nowUTC)/(3600000*24)))
          setShuffleHours(Math.floor((end - nowUTC)%(3600000*24)/3600000))
          setShuffleMinutes(Math.floor((end - nowUTC)%3600000/60000))
        }
      },1000)
  
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)

      if (window.innerHeight/window.innerWidth >= 16/9) {
        control1.start({
          left: ['27vw', '27vw', '27vw', '27vw',
                '60vw', '60vw', '60vw', '60vw',
                '27vw', '27vw', '4vw', '4vw',
                '4vw', '4vw', '4vw','4vw', '27vw'],
          top: ['84vw','84vw', '84vw','84vw',
                '84vw', '84vw', '3vw','3vw',
                '3vw', '3vw', '27vw','27vw',
                '60vw', '60vw', '60vw','60vw', '84vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375, 0.5,
              0.5625, 0.625,0.6875, 0.75,
              0.8125, 0.875,0.9375, 1]}
        })
        control2.start({
          left: ['4vw','4vw', '4vw', '4vw',
            '27vw','27vw', '27vw', '27vw',
            '60vw', '60vw', '60vw', '60vw',
            '27vw','27vw', '4vw', '4vw', '4vw'],
          top: ['60vw', '60vw','60vw', '60vw',
            '84vw', '84vw', '84vw', '84vw',
            '84vw', '84vw', '3vw', '3vw',
            '3vw', '3vw', '27vw', '27vw', '60vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control3.start({
          left: ['27vw','27vw', '4vw', '4vw',
          '4vw','4vw', '4vw', '4vw',
          '27vw','27vw', '27vw', '27vw',
          '60vw', '60vw', '60vw', '60vw', '27vw'],
          top: ['3vw','3vw', '27vw','27vw',
          '60vw', '60vw','60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw',
          '84vw', '84vw', '3vw', '3vw', '3vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control4.start({
          left: ['60vw','60vw', '60vw', '60vw',
          '27vw','27vw', '4vw', '4vw',
          '4vw','4vw', '4vw', '4vw',
          '27vw','27vw', '27vw', '27vw', '60vw'],
          top: ['84vw','84vw', '3vw', '3vw',
          '3vw','3vw', '27vw','27vw',
          '60vw', '60vw','60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw', '84vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control5.start({
          left: ['27vw','27vw', '4vw', '4vw',
            '4vw', '4vw', '84vw', '84vw',
            '84vw', '84vw', '84vw', '84vw',
            '60vw','60vw', '27vw', '27vw', '27vw'],
          top: ['84vw','84vw', '27vw', '27vw',
            '27vw', '27vw', '27vw', '27vw',
            '27vw', '27vw', '60vw', '60vw',
            '84vw', '84vw', '84vw', '84vw', '84vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control6.start({
          left: ['60vw','60vw', '27vw', '27vw',
          '27vw','27vw', '4vw', '4vw',
          '4vw', '4vw', '84vw', '84vw',
          '84vw', '84vw', '84vw', '84vw','60vw'],
          top: ['84vw', '84vw', '84vw', '84vw',
          '84vw','84vw', '27vw', '27vw',
          '27vw', '27vw', '27vw', '27vw',
          '27vw', '27vw', '60vw', '60vw', '84vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control7.start({
          left: ['84vw', '84vw', '84vw', '84vw',
          '60vw','60vw', '27vw', '27vw',
          '27vw','27vw', '4vw', '4vw',
          '4vw', '4vw', '84vw', '84vw', '84vw'],
          top: ['27vw', '27vw', '60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw',
          '84vw','84vw', '27vw', '27vw',
          '27vw', '27vw', '27vw', '27vw', '27vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
        control8.start({
          left: ['4vw', '4vw', '84vw', '84vw',
          '84vw', '84vw', '84vw', '84vw',
          '60vw','60vw', '27vw', '27vw',
          '27vw','27vw', '4vw', '4vw', '4vw'],
          top: ['27vw', '27vw', '27vw', '27vw',
          '27vw', '27vw', '60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw',
          '84vw','84vw', '27vw', '27vw', '27vw'],
          transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
            times: [0, 0.0625, 0.125, 0.1875,
              0.25,0.3125, 0.375,0.4375,
              0.5,0.5625, 0.625,0.6875,
              0.75,0.8125, 0.875,0.9375, 1]}
        })
      } else {
        setNormalizedWidth((window.innerHeight*900)/(16*window.innerWidth))
        setStyles(wideStyles)
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
      
      control9.start({
        rotate: [-5, -5, -5, -5,
          -185, -185, -185, -185,
          -365, -365, -365, -365,
          -545, -545, -545, -545, -725],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control10.start({
        rotate: [95, 95, 275, 275,
          275, 275, 455, 455,
          455, 455, 635, 635,
          635, 635, 815, 815, 815],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })  
      
      if (colorSliderOpen) {
        setTout(setTimeout(() => setColorSliderOpen(false),5000))
      } 
    }, [])
    
    useEffect(() => {
      clearTimeout(tout)
      setTout(setTimeout(() => setColorSliderOpen(false),5000))
    },[colorCode])
  
    useEffect(() => {
      setHeads(male ? maleHeads : femaleHeads)
    }, [male])
  
    function ColorSlide(x) {
      setColorCode(x)
      setArrows(arrowPalette[x])
      setLinkArrows(linkArrowPalette[6 - x])
      setScrollArrows(scrollArrowPalette[x])
      setBuyBanner(buyBannerPalette[6 - x])
    }

    return (
      <div className={styles.landing}
        style={{height: `${normalizedwidth*16/9}vw`,
        width: `${normalizedwidth}vw`}}>
        <motion.div className={styles.navSliderFrame}>
          <NavSlider colorCode={colorCode} />
        </motion.div>
        <div className={styles.wheelHolder}>
        <div className={styles.wheelOne}>
            <motion.div animate={control10} className={styles.arrowHolder}>
              <Image className={styles.counterArrows} src={arrowPalette[colorCode]} layout='fill' />
            </motion.div>
            <div className={styles.logoHolder}>
              <Image className={styles.logo} src='/logo.png' layout='fill' />
            </div>
            <motion.div 
              className={styles.headHolder}
              animate={control5}>
              <Image className={styles.head} src={heads[1]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control5}
              className={styles.headCard}>
              <p>{heads[1].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control6}>
              <Image className={styles.head} src={heads[3]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control6}
              className={styles.headCard}>
              <p>{heads[3].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control7}>
              <Image className={styles.head} src={heads[5]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control7}
              className={styles.headCard}>
              <p>{heads[5].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control8}>
              <Image className={styles.head} src={heads[7]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control8}
              className={styles.headCard}>
              <p>{heads[7].slice(1,12)}</p>
            </motion.div>
          </div>
          <div className={styles.wheelTwo}>
            <motion.div animate={control9} className={styles.arrowHolder}>
              <Image className={styles.arrows} src={arrowPalette[colorCode]} layout='fill' />
            </motion.div>
            <h2 style={{color: darkColorPalette[6-colorCode]}} className={styles.title}>
              Watch the  <span style={{marginLeft: male ? '0.5rem' : '0.1rem',color: lightColorPalette[6-colorCode]}}>{male ? 'male' : 'female '}</span> heads spin!
            </h2>
            <motion.div style={{color: darkColorPalette[6-colorCode]}} className={styles.subTitle}>
              <h2>on Algorand blockchain</h2>
              <motion.div className={styles.mintPrice}>
              <p>Mint price: 25</p>
              <motion.div className={styles.algoLogo}>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                    19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                    19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                    8.8453L18.0006 19.0109Z" fill={lightColorPalette[6-colorCode]} />
                </svg>
              </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className={styles.genderSlider}
              style={{borderColor: darkColorPalette[6-colorCode]}}>
              <div className={styles.genderBearing} onClick={() => setMale(!male)}>
                <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.00195 28.0015C8.44967 28.0015 8.00195 27.5538 8.00195 27.0015V20.0015L10.002 20.0015V27.0015C10.002 27.5538 9.55424 28.0015 9.00195 28.0015Z" fill={male ? lightColorPalette[6-colorCode] : darkColorPalette[6-colorCode]} opacity={male ? 0.5 : 1} />
                  <path d="M7.00195 26.0015C6.44967 26.0015 6.00195 25.5538 6.00195 25.0015C6.00195 24.4492 6.44967 24.0015 7.00195 24.0015H11.002C11.5542 24.0015 12.002 24.4492 12.002 25.0015C12.002 25.5538 11.5542 26.0015 11.002 26.0015H7.00195Z" fill={male ? lightColorPalette[6-colorCode] : darkColorPalette[6-colorCode]} opacity={male ? 0.5 : 1} />
                  <path d="M33.6068 2.39346C33.9973 2.78398 33.9973 3.41714 33.6068 3.80767L28.6571 8.75742L27.2429 7.3432L32.1926 2.39346C32.5831 2.00293 33.2163 2.00293 33.6068 2.39346Z" fill={!male ? lightColorPalette[6-colorCode] : darkColorPalette[6-colorCode]} opacity={!male ? 0.5 : 1} />
                  <path d="M33.6068 5.22188C33.9973 5.61241 33.9973 6.24557 33.6068 6.6361C33.2163 7.02662 32.5831 7.02662 32.1926 6.6361L29.3642 3.80767C28.9737 3.41715 28.9737 2.78398 29.3642 2.39346C29.7547 2.00293 30.3879 2.00293 30.7784 2.39346L33.6068 5.22188Z" fill={!male ? lightColorPalette[6-colorCode] : darkColorPalette[6-colorCode]} opacity={!male ? 0.5 : 1} />
                  <rect x="1" y="5" width="30" height="16" rx="8" stroke={darkColorPalette[6-colorCode]} strokeWidth="0.125rem"/>
                </svg>
              </div>
              <motion.div 
                animate={{left: !male ? '-0.125rem' : '0.75rem'}}
                style={{borderColor: darkColorPalette[6-colorCode],
                  backgroundColor: lightColorPalette[6-colorCode]}}
                className={styles.genderCatcher}
                onClick={() => setMale(!male)} />
            </motion.div>
            <motion.div className={styles.colorSlider}
              style={{borderColor: darkColorPalette[colorCode]}}
              animate={colorSliderOpen ? {height: '7.875rem'}: {height: 0, opacity:0}}>
              <motion.div
                animate={{borderColor: darkColorPalette[colorCode],
                  backgroundColor: lightColorPalette[colorCode],
                  top: colorSliderOpen? `${colorCode*1.125 - 0.125}rem` : '-0.125rem'}} 
                className={styles.colorCatcher} />
              <button 
                  style={{backgroundColor: lightColorPalette[0]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(0)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[1]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(1)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[2]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(2)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[3]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(3)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[4]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(4)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[5]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(5)}/>
              <button 
                  style={{backgroundColor: lightColorPalette[6]}}
                  className={styles.colorSlide} onClick={()=> ColorSlide(6)}/>
            </motion.div>
            <motion.div 
              animate={colorSliderOpen? {left: '26vw'} : null}
              className={styles.wheelButtons}>
              <button
                style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                className={styles.wheelButton} onClick={()=> setColorSliderOpen(true)}>
                <MdIcons.MdColorize
                  style={{color: darkColorPalette[colorCode]}}/>
              </button>
            </motion.div>
            <motion.div
              className={styles.headHolder}
              animate={control1}>
              <Image className={styles.head} src={heads[0]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control1}
              className={styles.headCard}>
              <p>{heads[0].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control2}>
              <Image className={styles.head} src={heads[2]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control2}
              className={styles.headCard}>
              <p>{heads[2].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control3}>
              <Image className={styles.head} src={heads[4]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control3}
              className={styles.headCard}>
              <p>{heads[4].slice(1,12)}</p>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control4}>
              <Image className={styles.head} src={heads[6]} layout='fill' />
            </motion.div>
            <motion.div
              style={{color: darkColorPalette[colorCode]}}
              animate={control4}
              className={styles.headCard}>
              <p>{heads[6].slice(1,12)}</p>
            </motion.div>
            <motion.div className={styles.social}>
              <Link href='https://discord.gg/NECZgDreUq'>
                <motion.button style={{backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}} className={styles.socialButton}>
                  <SiIcon.SiDiscord />
                </motion.button>
              </Link>
              <Link href='https://twitter.com/algoheads'>
                <motion.button style={{backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}} className={styles.socialButton}>
                  <SiIcon.SiTwitter />
                </motion.button>
              </Link>
              {!account ? 
              <motion.div className={styles.wallet}>
                <motion.button onClick={() => connectWallet()}
                  style={{backgroundColor: lightColorPalette[6-colorCode],
                  color: darkColorPalette[6-colorCode],
                  fontSize: '1.2rem'}}
                  className={styles.walletButton}>
                  <MdIcons.MdAccountBalanceWallet />
                </motion.button>
                <p style={{color: darkColorPalette[6-colorCode]}}>Connect</p>
              </motion.div> :
                <motion.div className={styles.wallet} onClick={() => router.push('/sholder')}>
                  <motion.button className={styles.walletButton}
                    style={{backgroundColor: lightColorPalette[6-colorCode],
                    color: darkColorPalette[6-colorCode],
                    fontSize: '1.2rem'}}>
                    <MdIcons.MdAccountCircle />
                  </motion.button> 
                  <p style={{color: darkColorPalette[6-colorCode]}}>{account[0].name.length > 8 ? account[0].name.slice(0,7)+'...' : account[0].name}</p>
                </motion.div>
              }
            </motion.div>
          </div>
          <div className={styles.wheelThree}>
            <motion.div
              className={styles.linkArrowHolder}>
              <Image src={linkArrowPalette[6 - colorCode]} layout='fill' />
            </motion.div>
            <div className={styles.bannerHolder}>
              <Image className={styles.buyBanner} src={buyBannerPalette[6-colorCode]} layout='fill' />
            </div>
            {soldOut ?
            <div
              style={{ borderColor: darkColorPalette[6 - colorCode],color: darkColorPalette[6 - colorCode],backgroundColor: lightColorPalette[6 - colorCode] }}
              className={styles.mainCountDown}>
              <p>
                Shuffle starts in <span style={{fontSize: '0.7rem'}}>{shuffleDays}d {shuffleHours}h {shuffleMinutes}m</span>
              </p>
            </div> :  
            <Link href={process.env.NEXT_PUBLIC_SHUFFLE_LINK}>          
              <button
                style={{ borderColor: darkColorPalette[6 - colorCode],color: darkColorPalette[6 - colorCode],backgroundColor: lightColorPalette[6 - colorCode] }}
                className={styles.mainButton}>
                Enter shuffle!
              </button>
            </Link>
            }
          </div>
          <div className={styles.wheelFour}>
              <motion.div
                className={styles.scrollArrowHolder}>
                <Image className={styles.counterScrollArrows} src={scrollArrowPalette[colorCode]} layout='fill' />
              </motion.div>
              <button
                style={{color: darkColorPalette[colorCode]}}
                className={styles.scrollButton}
                onClick={() => router.push('/headlist')}>
                <MdIcons.MdFace
                  style={{fontSize: '1rem', color: lightColorPalette[colorCode]}}/>
                  <p>Tap to see minted heads!</p>
              </button>
          </div>
        </div>
      </div>
      )
 }
 
 export default Landing